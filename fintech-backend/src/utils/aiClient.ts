import { GoogleGenAI } from "@google/genai";

export const client = new GoogleGenAI({
	apiKey: process.env.GOOGLE_GEMINI_KEY as string,
})
