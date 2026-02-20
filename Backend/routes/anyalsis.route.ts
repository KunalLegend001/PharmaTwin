import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { generateGeminiResponse } from "../utils/helpers/generateGeminiResponse.js";

const router = Router();

// Multer config: memory storage, 20 MB max
const upload = multer({
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
  storage: multer.memoryStorage(),
});

router.post(
  "/analyze",
  upload.single("vcf"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { drugs } = req.body;
      const file = req.file;

      if (!file) return res.status(400).json({ error: "VCF file is required" });
      if (!drugs) return res.status(400).json({ error: "Drug name is required" });

      // --- Step 1: Parse VCF ---
      const vcfText = file.buffer.toString("utf-8");
      const lines = vcfText.split("\n");
      const headerIndex = lines.findIndex((line) => line.startsWith("#CHROM"));
      if (headerIndex === -1) throw new Error("Invalid VCF: missing header");

      const variantLines = lines.slice(headerIndex + 1);

      const detectedVariants = variantLines
        .filter((line) => line.trim() !== "")
        .map((line) => {
          const cols = line.split(/\s+/);
          const infoColumn = cols[7] ?? "";
          const sampleColumn = cols[9] ?? "Unknown";

          const infoParts = infoColumn.split(";");
          const infoMap: Record<string, string> = {};
          infoParts.forEach((part) => {
            const [key, value] = part.split("=");
            if (key && value) infoMap[key] = value;
          });

          return {
            rsid: infoMap["RS"] ?? cols[2] ?? "Unknown",
            gene: infoMap["GENE"] ?? "Unknown",
            star: infoMap["STAR"] ?? "Unknown",
            genotype: sampleColumn,
          };
        });

      // --- Step 2: Generate AI prompt ---
      const aiPrompt = `
You are a clinical pharmacogenomics AI.
Patient has the following variants: ${detectedVariants
  .map(
    (v) =>
      `${v.rsid} (${v.gene}): genotype=${v.genotype}, star=${v.star}`
  )
  .join("; ")}.
Drug of interest: ${drugs}.

Generate a valid JSON object ONLY, containing:
1. risk_assessment (risk_label, confidence_score, severity)
2. pharmacogenomic_profile (primary_gene, diplotype, phenotype, detected_variants)
3. clinical_recommendation (recommendation, cpic_guideline_reference)
4. llm_generated_explanation (summary, mechanism)

IMPORTANT:
- risk_label must be **one of the following exactly**:
  "Safe", "Low Risk", "Adjust Dosage", "High Risk", "Toxic", "Ineffective", "Decreased Efficacy"
- confidence_score: "High", "Medium", or "Low"
- severity: "Low", "Moderate", "High"

Do NOT include any explanation or text outside the JSON.
Make sure the JSON is strictly parsable.
`;

      // --- Step 3: Call Gemini AI ---
      const aiResponse = await generateGeminiResponse(aiPrompt);

      // --- Step 4: Safe JSON parsing ---
      let aiData: any;
      try {
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/); // extract first JSON object
        if (!jsonMatch) throw new Error("No JSON found in AI response");
        aiData = JSON.parse(jsonMatch[0]);
      } catch (err) {
        console.error("Failed to parse AI JSON:", aiResponse);
        return res.status(500).json({ error: "AI returned invalid JSON" });
      }

      // --- Step 5: Construct response with safe defaults ---
      const response = {
        patient_id: uuidv4(),
        drug: drugs,
        timestamp: new Date().toISOString(),
        quality_metrics: {
          vcf_parsing_success: true,
          variants_identified: detectedVariants.length,
        },
        risk_assessment: aiData?.risk_assessment ?? { risk_label: "Unknown", confidence_score: 0, severity: "unknown" },
        pharmacogenomic_profile: aiData?.pharmacogenomic_profile ?? { detected_variants: detectedVariants },
        clinical_recommendation: aiData?.clinical_recommendation ?? {},
        llm_generated_explanation: aiData?.llm_generated_explanation ?? {},
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

export { router };
