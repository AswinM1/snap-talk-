import React from "react";

const AnalysisResult = ({ analyse }) => {
  if (!analyse) return null;

  return (
    <div className="text-left bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-inner">
      <h3 className="text-xl font-semibold mb-3 text-green-400">Analysis Results</h3>
      <div className="bg-gray-800 rounded-lg p-4 overflow-auto max-h-[80vh] text-gray-200">
        <pre className="whitespace-pre-wrap">
          {typeof analyse === 'object' ? JSON.stringify(analyse, null, 2) : analyse}
        </pre>
      </div>
    </div>
  );
};

export default AnalysisResult;
