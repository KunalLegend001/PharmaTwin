import { createUserContent, GoogleGenAI } from "@google/genai";

  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is not defined in environment variables.");
}

export const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

export const generateGeminiResponse = async (
  prompt: string
): Promise<string> => {
  try {
    const contents = createUserContent([prompt]);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    return response.text ?? "No response received.";
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate content from Gemini.");
  }
};