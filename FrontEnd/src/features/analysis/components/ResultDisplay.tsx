import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  result: any;
}

const ResultDisplay: React.FC<Props> = ({ result }) => {
  if (!result) return null;

  const risk = result?.risk_assessment?.risk_label || "Unknown";

  // Centralized risk color mapping
  const RISK_STYLES: Record<string, string> = {
    Safe: "bg-green-600 text-white",
    "Adjust Dosage": "bg-yellow-500 text-black",
    Toxic: "bg-red-600 text-white",
    Ineffective: "bg-red-600 text-white",
    "Decreased Efficacy": "bg-red-600 text-white",
  };

  const getRiskStyle = (risk: string) => {
    return RISK_STYLES[risk] || "bg-gray-400 text-white";
  };

  const getRiskIcon = (risk: string) => {
    if (risk === "Safe") return "🟢";
    if (risk === "Adjust Dosage") return "🟡";
    if (
      risk === "Toxic" ||
      risk === "Ineffective" ||
      risk === "Decreased Efficacy"
    )
      return "🔴";
    return "⚪";
  };

  return (
    <Card className="max-w-4xl mx-auto mt-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Analysis Result
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Color-Coded Risk Label */}
        <div
          className={`px-4 py-3 rounded font-semibold text-center ${getRiskStyle(
            risk
          )}`}
        >
          {getRiskIcon(risk)} Risk: {risk}
        </div>

        {/* Recommendation Section */}
        <div>
          <h3 className="font-semibold mb-2">Recommendation</h3>
          <p>
            {result?.clinical_recommendation?.recommendation ||
              "No recommendation available."}
          </p>
        </div>

        {/* Copy JSON Button */}
        <Button
          onClick={() =>
            navigator.clipboard.writeText(JSON.stringify(result, null, 2))
          }
        >
          Copy JSON
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResultDisplay;
