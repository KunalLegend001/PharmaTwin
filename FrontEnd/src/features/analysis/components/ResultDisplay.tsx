import React from "react";

interface Props {
  result: any;
}

const ResultDisplay: React.FC<Props> = ({ result }) => {
  if (!result) return null;

  const getColor = (risk: string) => {
    if (risk === "Safe") return "green";
    if (risk === "Adjust Dosage") return "orange";
    if (risk === "Toxic" || risk === "Ineffective") return "red";
    return "gray";
  };

  return (
    <div>
      <h2>Results</h2>

      <div
        style={{
          padding: "10px",
          backgroundColor: getColor(result.risk_assessment.risk_label),
          color: "white",
        }}
      >
        Risk: {result.risk_assessment.risk_label}
      </div>

      <pre>{JSON.stringify(result, null, 2)}</pre>

      <button
        onClick={() => {
          navigator.clipboard.writeText(JSON.stringify(result, null, 2));
          alert("Copied to clipboard!");
        }}
      >
        Copy JSON
      </button>
    </div>
  );
};

export default ResultDisplay;
