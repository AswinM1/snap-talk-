import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"; // MongoDB
import bcrypt from "bcryptjs"; // For password hashing
import cors from "cors"; // Optional, for CORS if needed
import Groq from "groq-sdk"; // Import Groq SDK

dotenv.config();

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
}).catch(err => {
  console.log("MongoDB connection error:", err);
});

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// User Schema for MongoDB
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// User Model
const User = mongoose.model("User", userSchema);

// Signup Route
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error signing up user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Successful login
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Main Route for Processing Groq
const groq = new Groq({
  apiKey: process.env.KEY, // Replace with your Groq API key from .env
});

app.post("/message", async (req, res) => {
  try {
    const { data } = req.body;
    const text = data;

    if (!text) {
      return res.status(400).json({ error: "No text found" });
    }

    // Log the incoming input for debugging
    console.log("text", req.body.data);

    // Prepare the prompt content with user-provided data
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You act as a snap talk analysing agent which provides a score out of 100 and improvements and corrects grammatical errors and provides it to the users for the text provided as input."
        },
        {
          role: "user",
          content: text,
        }
      ],
      model: "llama3-8b-8192",
    });

    console.log(response); // Log the response for debugging

    // Extract the message content from the Groq API response
    const resultContent = response?.choices?.[0]?.message?.content 
    // Assuming you want to send back the result
    const responseData = {
      reply: resultContent,
    };

    // Log usage info if needed
    console.log("Usage Data:", response.usage);

    // Send the processed result back to the client
    res.status(200).json(responseData);

  } catch (error) {
    console.error("Error occurred:", error.message, error.stack);
    res.status(500).json({ error: "An error occurred while processing the request." });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
