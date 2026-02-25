import { generateAlResponse  } from "../services/ai.service";
import type { Request, Response } from "express";
import { client } from "../utils/aiClient";
import prisma from "../config/prisma";
import { transformMessage } from "../utils/transform";


export const  askAI = async (req: Request, res: Response) => {
	try {
		const { prompt } = req.body;
		const aiRes = await generateAlResponse(prompt);
		res.status(200).json({reply: aiRes});
	} catch (err: any) {
		console.error(`controller err: ${err}`);
		res.status(500).json({message: "Internal server error"})
	}
}


export const chatMessages = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
     const userId = req.userId as string;
     const messages = [
       {
         role: "system",
         content: "Your name is Ambrose. You are a friendly and professional financial assistant. Help users analyze, predict, budget, and make optimized savings. Always identify as Ambrose if asked.",
       },
       {
         role: "user",
         content: message,
       },
     ];
     const {systemInstruction, chatMessages} = await transformMessage(messages);

     await prisma.chatMessage.create({
       data: {
         userId,
         role: "user",
         content: message,
       }
     });
     const aiRes = await client.models.generateContent({
       model: "gemini-2.5-flash",
       contents: chatMessages,
       config: {
         systemInstruction,
         temperature: 0.7
       }
     });;
     const aiReply = aiRes.text;

     await prisma.chatMessage.create({
       data: {
         userId,
         role: "assistant",
         content: aiReply || "No AI response"
       }
     });

     res.status(201).json({reply: aiReply})
  } catch (err: any) {
    console.error("Controller Error [details] -->\t:", err);
    res.status(500).json({message: "Internal Server Error: AI chat gailed"});
  }
}


export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.userId as string;

    const chats = await prisma.chatMessage.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" }
    });

    res.status(200).json({chats});
  } catch (err: any) {
    console.error("Controller Error: [details] -->\t");
    res.status(500).json({message: "Internal Server Error: Failed to fetch chat history"});
  }
}
