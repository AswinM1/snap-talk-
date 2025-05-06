import React, { useState, useCallback } from "react";
import axios from "axios";

const Home = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [result, setResult] = useState("");
  const [analyse, setAnalyse] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("audio")) {
      setAudioFile(droppedFile);
    } else {
      alert("Please drop a valid audio file");
    }
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleAnalyse = async () => {
    if (!result) {
      alert("Please upload an audio file and get the transcription first!");
      return;
    }

    try {
      setIsAnalyzing(true);
      const resp = await axios.post("http://localhost:3000/analyse", {
        data: result,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      setAnalyse(resp.data);
    } catch (error) {
      console.error("Error analyzing text:", error);
      alert("Analysis failed: " + (error.response?.data?.error || error.message));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUpload = async () => {
    if (!audioFile) {
      alert("Please upload an audio file");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioFile);

    try {
      setIsUploading(true);
      const response = await axios.post("http://localhost:3000/message", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response?.data?.reply || "No transcription received");
    } catch (error) {
      console.error("Error uploading audio:", error);
      alert("Upload failed: " + (error.response?.data?.error || error.message));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8 flex items-center justify-center font-sans">
      <div className="w-full max-w-4xl">
        <div className="bg-[#12121] bg-opacity-60 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-8 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
            Audio Analyzer
          </h1>
          
          <div className="mb-8">
            <p className="text-gray-300 text-lg mb-4">
              Upload your audio file to transcribe and analyze it
            </p>
            
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative mb-6 p-10 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
                dragOver 
                  ? "border-purple-500 bg-gray-700 bg-opacity-50" 
                  : "border-gray-600 hover:border-gray-500 hover:bg-gray-800 hover:bg-opacity-30"
              }`}
            >
              <div className="flex flex-col items-center justify-center gap-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-12 w-12 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                  />
                </svg>
                <p className="text-lg text-gray-300">
                  {audioFile ? `Selected: ${audioFile.name}` : "Drag & drop an audio file here or click to browse"}
                </p>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={handleUpload}
              disabled={isUploading || !audioFile}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                isUploading || !audioFile
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:shadow-lg hover:from-purple-600 hover:to-blue-700"
              }`}
            >
              {isUploading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </div>
              ) : "Upload & Transcribe"}
            </button>
          </div>

          {result && (
            <div className="mt-8 text-left bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-inner">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Transcription</h3>
              <div className="bg-gray-800 rounded-lg p-4 text-gray-200 text-lg">
                {result}
              </div>
              
              <button
                onClick={handleAnalyse}
                disabled={isAnalyzing}
                className={`px-6 py-3 rounded-lg font-medium mt-4 transition-all duration-300 ${
                  isAnalyzing
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:shadow-lg hover:from-green-600 hover:to-teal-600"
                }`}
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </div>
                ) : "Analyze Now"}
              </button>
            </div>
          )}

          {analyse && (
            <div className="mt-8 text-left bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-inner">
              <h3 className="text-xl font-semibold mb-3 text-green-400">Analysis Results</h3>
              <div className="bg-gray-800 rounded-lg p-4 overflow-auto max-h-96 text-gray-200">
                <pre className="whitespace-pre-wrap">{typeof analyse === 'object' ? JSON.stringify(analyse, null, 2) : analyse}</pre>
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center mt-6 text-gray-500 text-sm">
          © 2025 Audio Analyzer - Transcribe and analyze your audio files
        </div>
      </div>
    </div>
  );
};

export default Home;