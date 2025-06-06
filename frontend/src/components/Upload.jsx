import React from "react";

const UploadSection = ({
  audioFile,
  handleFileChange,
  handleDrop,
  handleDragOver,
  handleDragLeave,
  handleUpload,
  isUploading,
}) => {
  return (
<div 
style={{  
  background:"radial-gradient(circle at bottom left,blue 20%,#121212 40%)"
}}
className="  bg-[#121212] bg-opacity-60 backdrop-blur-lg border-gray-600  border shadow-2xl p-8 text-center rounded-xl w-full max-w-xl">
      <p className="text-neutral-300 text-xl mb-4 font-bold"></p>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className="relative mb-6 p-10 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300"
      >
        <div className="flex flex-col items-center gap-4">
          <svg className="h-10 w-10 text-violet-600" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-lg text-gray-300">
            {audioFile ? `Selected: ${audioFile.name}` : "Drag & drop or click to upload"}
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
        className={`px-6 py-3 rounded-3xl font-medium transition-all duration-300 ${
         
           "bg-blue-600 cursor-pointer"
        }`}
      >
        {isUploading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin mr-3 h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0..." />
            </svg>
            Uploading...
          </span>
        ) : "Upload & Transcribe"}
      </button>
    </div>
  );
};

export default UploadSection;
