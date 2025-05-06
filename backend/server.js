import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import axios from "axios";
import { AssemblyAI } from "assemblyai";
import Groq from "groq-sdk/index.mjs";

dotenv.config();

const app = express();


const upload = multer({ dest: "uploads/" });

app.use(cors({ origin: "*" }));
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Define user schema and model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

// Signup route
const client = new AssemblyAI({
  apiKey: process.env.KEY,
});
const groq=new Groq({
  apiKey:process.env.GROQ
})
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Username and password are required" });

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error signing up user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Username and password are required" });

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ error: "Invalid credentials" });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/message", upload.single("audio"), async (req, res) => {
  try {
    const filePath = req.file?.path;
    if (!filePath) return res.status(400).json({ error: "No file uploaded" });

    const fileData = fs.readFileSync(filePath);

    const transcript = await client .transcripts.transcribe({
      audio:fileData
    });

    // Clean up temp file
    fs.unlinkSync(filePath);

    res.status(200).json({ reply: transcript.text });
  } catch (err) {
    console.error("Error processing audio:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});
app.post("/analyse", async(req, res) => {
  try {
    const data = req.body.data;
    console.log("Incoming /analyse request with body:", req.body);
    
    const groqResponse = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant that provides grammar analysis, sentiment analysis, and improvement suggestions for a given text. Provide your analysis in plain text format with clear sections.",
        },
        {
          role: "user",
          content: data,
        },
      ],
      // Remove JSON format requirement
    });

    // Log the response to check the structure
    console.log("Groq Response:", groqResponse);
  
    // The response structure is different than what you're expecting
    // Groq SDK returns the response directly, not nested in data.choices
    if (groqResponse.choices && groqResponse.choices.length > 0) {
      // Simply return the text content without parsing as JSON
      const analysisResults = groqResponse.choices[0].message.content;
      res.status(200).send(analysisResults);
    } else {
      throw new Error("No choices returned from the API");
    }
  } catch (error) {
    console.error("Error in /analyse endpoint:", error);
    res.status(500).send("An error occurred during analysis: " + error.message);
  }
});
// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
