import { generateAlResponse  } from "../services/ai.service";
import type { Request, Response } from "express";


export const  askAI = async (req: Request, res: Response) => {
	try {
		const { prompt } = req.body;
		const aiRes = await generateAlResponse(prompt);
		res.status(200).json({response: aiRes});
	} catch (err: any) {
		console.error(`controller err: ${err}`);
		res.status(500).json({message: "Internal server error"})
	}
}

