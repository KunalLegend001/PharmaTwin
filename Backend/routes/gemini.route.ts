import express from "express";
import { generateGeminiResponse } from "../utils/helpers/generateGeminiResponse.js";

export const router = express.Router();

router.post("/Pharmachatbot", async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        message: "Message is required and must be a string.",
      });
    }

    // Use backticks for template literal
    const pharmaPrompt = `You are a professional pharmacy assistant chatbot. Provide medically accurate, safe, and clear information. If unsure, advise consulting a licensed healthcare professional. User question: ${message}`;

    const aiResponse = await generateGeminiResponse(pharmaPrompt);

    res.status(200).json({
      success: true,
      reply: aiResponse,
    });
  } catch (error) {
    next(error);
  }
});