import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import jsPDF from "jspdf";
import axios from "axios";

const Home = () => {
  const [transcript, setTranscript] = useState("");
  const [textToCopy, setTextToCopy] = useState("");
  const [isCopied, setCopied] = useClipboard(textToCopy, { successDuration: 1000 });
  const [result, setResult] = useState("");

  const {
    transcript: speechTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setTranscript(speechTranscript);
  }, [speechTranscript]);

  const handleSomething = async () => {
    try {
      const response = await axios.post("http://localhost:3000/message", {
        data: transcript, // Ensure 'data' holds the text you want to analyze
      });

      // Check if response contains the expected structure
      const emailText = response?.data?.reply?.choices?.[0]?.message?.content || "No response received";
      setResult(emailText);
    } catch (error) {
      console.error("Error during API call:", error);
      alert("An error occurred: " + (error.response?.data?.error || error.message));
    }
  };

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setTextToCopy(transcript);
  };

  const exportTranscriptToPDF = () => {
    if (!transcript) {
      alert("No transcript available to export.");
      return;
    }

    const doc = new jsPDF();
    doc.text("Speech Transcript", 10, 10);
    doc.text(transcript, 10, 20);
    doc.save("transcript.pdf");
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <div className="min-h-screen text-black p-6 bg-purple-700 flex items-center justify-center text-center">
      <div className="max-w-3xl mx-auto p-6 bg-neutral-200 rounded-xl shadow-lg text-black">
        <p className="font-sans text-xl py-3 font-black tracking-tighter">Start speaking to analyze</p>
        <div className="space-y-6">
          <div className="flex gap-3">
            <div className="mt-4 p-4 bg-[#121212] rounded-lg border border-gray-600 w-[50%] h-60 flex flex-col">
              <textarea
                className="flex-grow bg-[#121212] text-white border-none resize-none p-2 focus:outline-none"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Your text will be displayed here"
              />
            </div>
            <div className="mt-4 p-4 bg-[#121212] rounded-lg border w-[50%] h-60 flex flex-col">
              <p>{result}</p>
            </div>
          </div>

          <div className="flex space-x-4 justify-center">
            <button
              onClick={startListening}
              className="px-4 py-auto bg-black hover:bg-gray-700 rounded-lg text-lg text-white"
            >
              Start Listening
            </button>
            <button
              onClick={stopListening}
              className="px-4 py-auto bg-black hover:bg-gray-700 rounded-lg text-lg text-white"
            >
              Stop Listening
            </button>
            <button
              onClick={handleSomething}
              className="px-4 py-auto bg-black hover:bg-gray-700 rounded-lg text-lg text-white"
            >
              {transcript ? "Analyse" : "no text"}
            </button>
            <button
              onClick={exportTranscriptToPDF}
              className="px-3 py-3 bg-black hover:bg-gray-700 rounded-lg text-lg text-white"
            >
              Export to PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
