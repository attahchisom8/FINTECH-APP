import type { Transaction } from "../generated/prisma/client";
import { transformMessage } from "../utils/transform";
import { aiEngine } from "../utils/aiClient";

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
    risk: "low | medium | high",
    reason: "short reason why its a fraud",
  }
  `;
  const messages = [
    {
      role: "system",
      content: "You are ambrose, A proffesional fraud dwtector",
    },
    {
      role: "assistant",
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
    const fraudJson = rawText.replace(/```json|```/gi, "").trim();
    return JSON.parse(fraudJson);
  } catch (err: any) {
    console.error('Service error: [details] -->\t', err);
    throw new Error(err);
  }
}
