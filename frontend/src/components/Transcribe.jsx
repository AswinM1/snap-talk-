import React from "react";

const TranscriptionResult = ({ result, handleAnalyse, isAnalyzing }) => {
  if (!result) return null;

  return (
    <div className="mt-8 text-left border  p-6 rounded-xl shadow-inner w-full max-w-xl">
      <h3 className="text-xl font-semibold mb-3 text-blue-400">Transcription</h3>
      <div className="bg-gray-800 rounded-lg p-4 text-gray-200 text-lg">
        {result}
      </div>
      <button
        onClick={handleAnalyse}
        disabled={isAnalyzing}
        className="px-6 py-3 rounded-lg font-medium mt-4 transition-all duration-300 bg-violet-500 hover:bg-violet-600"
      >
        {isAnalyzing ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin mr-3 h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0..." />
            </svg>
            Analyzing...
          </span>
        ) : "Analyze Now"}
      </button>
    </div>
  );
};

export default TranscriptionResult;
