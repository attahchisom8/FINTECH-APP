import { GoogleGenAI } from "@google/genai";
import { toUpperCase } from "zod";


export const client = new GoogleGenAI({
	apiKey: process.env.GOOGLE_GEMINI_KEY as string,
});


type Contents = {
  role: string,
  parts: { text: string }[]
}


export const aiEngine = async ({
    model = "gemini-2.5-flash",
    systemInstruction = "",
    contents = [],
    temperature = 0.1,
} : {
      model?: string,
      systemInstruction?: string,
      contents?: Contents[],
      temperature?: number
    }) => {
    try {
      const aiRes = await client.models.generateContent({

        model,
        contents,
        config: {
        systemInstruction,
        temperature,
      }
    });
    return aiRes;
  } catch (err: any) {
    if (
      err.message?.includes("429") ||
      err.status === 429 ||
      err.message?.toUpperCase().includes("QUOTA")
    ) {
      console.log("Rate limit error, Returning fallback response...");

      // Mimic genai response
      return {
        text: JSON.stringify({
        "risk": "High",
        "reason": "preventing server retry, defaulting to high risk for safety"
        }),
        fallback: true
      }
    }
    
    console.error(err);
    return {
        text: JSON.stringify({
        "risk": "Low",
        "reason": "System Error occured during analysis",
        })
      }
    }
}
