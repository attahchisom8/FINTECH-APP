import type { Transaction } from "../generated/prisma/client";
import { transformMessage } from "../utils/transform";
import { aiEngine } from "../utils/aiClient";
import { z } from "zod";

// we use zod so Al doesnt return Nonsense,  i.e illegal json

const fraudSchema = z.object({
  risk: z.enum(["Low", "Medium", "High"]),
  reason: z.string(),
});

export const detectFraud = async (
  transaction: Transaction & {
    currency: string,
    location: string,
    accountAge: string
  }
) => {
  if (!transaction)
    throw new Error("No transactions obj for fraud detection");

    const prompt = `
  Analyze this data for any suspicious transaction
    Details
  Amount: ${transaction.amount}, Category: ${transaction.category},
  Description: ${ transaction.description }, Currency: ${ transaction.currency },
  Account Age: ${transaction.accountAge}, Location: ${transaction.location},
  Time of transaction: ${ transaction.createdAt }

  Return JSON
  {
    risk: "Low | Medium | High",
    reason: "short reason why it's a fraud",
  }
  `;
  const messages = [
    {
      role: "system",
      content: "You are ambrose, A proffesional fraud dwtector",
    },
    {
      role: "user",
      content: prompt
    }
  ];
  try {
    const { systemInstruction, chatMessages } = await transformMessage(messages);
    const fraudRes = await aiEngine({
      systemInstruction,
      contents: chatMessages,
    });
    const rawText = fraudRes.text;
    const fraudJson = rawText?.replace(/```json|```/gi, "").trim() || "{}";
    const parsedJson =  JSON.parse(fraudJson);
    console.log("parsedJson: ", parsedJson);

    return fraudSchema.parse(parsedJson);
  } catch (err: any) {
    console.error('Service error: [details] -->\t', err);
    throw new Error(err);
  }
}
