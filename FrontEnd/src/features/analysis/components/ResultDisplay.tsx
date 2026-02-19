import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  result: any;
}

const ResultDisplay: React.FC<Props> = ({ result }) => {
  const [openProfile, setOpenProfile] = useState(true);
  const [openRecommendation, setOpenRecommendation] = useState(true);
  const [openExplanation, setOpenExplanation] = useState(true);

  if (!result) return null;

  const getColor = (risk: string) => {
    if (risk === "Safe") return "bg-green-500";
    if (risk === "Adjust Dosage") return "bg-orange-500";
    if (risk === "Toxic" || risk === "Ineffective" || risk === "Decreased Efficacy")
      return "bg-red-500";
    return "bg-gray-400";
  };

  const riskLabel = result.risk_assessment?.risk_label || "Unknown";

  const detectedVariants = result.pharmacogenomic_profile?.detected_variants || [];

  return (
    <Card className="max-w-4xl mx-auto mt-8 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Analysis Result</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Risk Badge */}
        <div
          className={`text-white font-semibold px-4 py-2 rounded ${getColor(
            riskLabel
          )}`}
        >
          Risk Assessment: {riskLabel}
        </div>

        {/* Pharmacogenomic Profile */}
        <div className="border border-gray-300 rounded">
          <button
            className="w-full flex justify-between items-center px-4 py-2 font-semibold bg-gray-100 hover:bg-gray-200"
            onClick={() => setOpenProfile(!openProfile)}
          >
            Pharmacogenomic Profile
            {openProfile ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {openProfile && (
            <div className="p-4 overflow-x-auto">
              {detectedVariants.length > 0 ? (
                <table className="w-full text-left border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 border">Gene</th>
                      <th className="p-2 border">RSID</th>
                      <th className="p-2 border">Genotype</th>
                      <th className="p-2 border">Star</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detectedVariants.map((v: any, idx: number) => (
                      <tr key={idx} className="even:bg-gray-50">
                        <td className="p-2 border">{v.gene || "Not Detected"}</td>
                        <td className="p-2 border">{v.rsid || "N/A"}</td>
                        <td className="p-2 border">{v.genotype || "Not Detected"}</td>
                        <td className="p-2 border">{v.star || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500">No variants detected.</p>
              )}
            </div>
          )}
        </div>

        {/* Clinical Recommendation */}
        <div className="border border-gray-300 rounded">
          <button
            className="w-full flex justify-between items-center px-4 py-2 font-semibold bg-gray-100 hover:bg-gray-200"
            onClick={() => setOpenRecommendation(!openRecommendation)}
          >
            Clinical Recommendation
            {openRecommendation ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {openRecommendation && (
            <div className="p-4 space-y-2">
              <p>
                {result.clinical_recommendation?.recommendation ||
                  "No recommendation available."}
              </p>
              {result.clinical_recommendation?.cpic_guideline_reference && (
                <p className="text-gray-500 text-sm">
                  CPIC Guideline:{" "}
                  {result.clinical_recommendation.cpic_guideline_reference}
                </p>
              )}
            </div>
          )}
        </div>

        {/* AI Explanation */}
        {result.llm_generated_explanation && (
          <div className="border border-gray-300 rounded">
            <button
              className="w-full flex justify-between items-center px-4 py-2 font-semibold bg-gray-100 hover:bg-gray-200"
              onClick={() => setOpenExplanation(!openExplanation)}
            >
              AI Explanation
              {openExplanation ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {openExplanation && (
              <div className="p-4">
                <p>
                  {result.llm_generated_explanation.summary ||
                    "No explanation available."}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Copy JSON Button */}
        <Button
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(result, null, 2));
            alert("Copied to clipboard!");
          }}
        >
          Copy Full JSON
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResultDisplay;
