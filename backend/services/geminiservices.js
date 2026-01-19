import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const genrativeContent = async (prompt) => {
  if (!prompt) throw new Error("Prompt missing");

  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",   // ✅ CHANGE HERE
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
};
