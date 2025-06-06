import React, { useState, useCallback } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import UploadSection from "./Upload";
import TranscriptionResult from "./Transcribe";
import AnalysisResult from "./Analysis";
import '../../cover.png'
import { motion } from 'motion/react'

const Home = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [result, setResult] = useState("");
  const [analyse, setAnalyse] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const[hide,setHide]=useState(false)

  const handleFileChange = (e) => setAudioFile(e.target.files[0]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("audio")) setAudioFile(file);
    else alert("Please drop a valid audio file");
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleUpload = async () => {
    if (!audioFile) return alert("Please upload an audio file");

    const formData = new FormData();
    formData.append("audio", audioFile);

    try {
      setIsUploading(true);
      const response = await axios.post("http://localhost:3000/message", formData);
      setResult(response?.data?.reply || "No transcription received");
    } catch (error) {
      console.error(error);
      alert("Upload failed: " + (error.response?.data?.error || error.message));
    } finally {
      setIsUploading(false);
    }
  };

  const handleAnalyse = async () => {
    if (!result) return alert("Upload and transcribe audio first");

    try {
      setIsAnalyzing(true);
      const response = await axios.post("http://localhost:3000/analyse", { data: result });
      setAnalyse(response.data);
    } catch (error) {
      console.error(error);
      alert("Analysis failed: " + (error.response?.data?.error || error.message));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex  text-white">
      <div >
     
        <Sidebar />
      

      </div>
      {!result && <div className="flex-1 flex flex-col items-center justify-start p-8 gap-6">
        <UploadSection
          audioFile={audioFile}
          handleFileChange={handleFileChange}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleUpload={handleUpload}
          isUploading={isUploading}
        />
        <TranscriptionResult
          result={result}
          handleAnalyse={handleAnalyse}
          isAnalyzing={isAnalyzing}
        />
      </div>
}
     {audioFile && 
      <motion.div
      initial={{
        opacity:0,
        filter:"blur(4px)"

      }}
      animate={{
        opacity:1,
        filter:"blur(0px)"
        
      }}
      
      className="w-1/2 p-6 border-l border-neutral-800 overflow-y-auto">
        <AnalysisResult analyse={analyse} />
        <p className="align-middle justify-center m-auto text-center">your resut will appear here</p>
      </motion.div>
      }
    </div>
  );
};

export default Home;
