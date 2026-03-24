import { GoogleGenAI } from "@google/genai";

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
      temperature: number
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
    throw new Error(err)
  }
}
