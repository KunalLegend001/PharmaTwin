import React, { useEffect, useState } from "react";
import UploadForm from "./components/UploadForm";
import ResultDisplay from "./components/ResultDisplay";

const Analysis: React.FC = () => {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("selected_result");
    if (stored) {
      try {
        setResult(JSON.parse(stored));
      } catch (e) {
        console.error("Invalid stored result");
      }
    }
  }, []);

  const handleNewResult = (data: any) => {
    setResult(data);
    localStorage.removeItem("selected_result"); // Clear old selected history
  };

  return (
    <>
      <UploadForm onResult={handleNewResult} />
      <ResultDisplay result={result} />
    </>
  );
};

export default Analysis;
