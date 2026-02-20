import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  result: any;
}

const ResultDisplay: React.FC<Props> = ({ result }) => {
  if (!result) return null;

  const risk = result?.risk_assessment?.risk_label || "Unknown";

  const RISK_STYLES: Record<string, string> = {
    Safe: "bg-green-600 text-white",
    "Adjust Dosage": "bg-yellow-500 text-black",
    Toxic: "bg-red-600 text-white",
    Ineffective: "bg-red-600 text-white",
    "Decreased Efficacy": "bg-red-600 text-white",
    "Low Risk": "bg-green-500 text-white",
  };

  const getRiskStyle = (risk: string) => RISK_STYLES[risk] || "bg-gray-400 text-white";

  const getRiskIcon = (risk: string) => {
    if (risk === "Safe" || risk === "Low Risk") return "🟢";
    if (risk === "Adjust Dosage") return "🟡";
    if (
      risk === "Toxic" ||
      risk === "Ineffective" ||
      risk === "Decreased Efficacy"
    )
      return "🔴";
    return "⚪";
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `analysis_${result.patient_id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="max-w-5xl mx-auto mt-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Analysis Result</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Risk Label */}
        <div className={`px-4 py-3 rounded font-semibold text-center ${getRiskStyle(risk)}`}>
          {getRiskIcon(risk)} Risk: {risk}
        </div>

        {/* Clinical Recommendation */}
        <div>
          <h3 className="font-semibold mb-2">Recommendation</h3>
          <p>
            {result?.clinical_recommendation?.recommendation ||
              "No recommendation available."}
          </p>
          {result?.clinical_recommendation?.cpic_guideline_reference && (
            <p className="text-sm text-gray-500 mt-1">
              Reference: {result.clinical_recommendation.cpic_guideline_reference}
            </p>
          )}
        </div>

        {/* Pharmacogenomic Profile */}
        <div>
          <h3 className="font-semibold mb-2">Pharmacogenomic Profile</h3>
          <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-sm">
            {JSON.stringify(result.pharmacogenomic_profile, null, 2)}
          </pre>
        </div>

        {/* LLM Explanation */}
        {result?.llm_generated_explanation && (
          <div>
            <h3 className="font-semibold mb-2">LLM Explanation</h3>
            <p className="mb-1"><strong>Summary:</strong> {result.llm_generated_explanation.summary}</p>
            <p><strong>Mechanism:</strong> {result.llm_generated_explanation.mechanism}</p>
          </div>
        )}

        {/* Copy & Download JSON Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() =>
              navigator.clipboard.writeText(JSON.stringify(result, null, 2))
            }
          >
            Copy JSON
          </Button>
          <Button onClick={downloadJSON} variant="secondary">
            Download JSON
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultDisplay;