import { categorizeTransaction } from "../services/aiTransaction.service";
import type { Request, Response } from "express";
import prisma from "../config/prisma";

export const createCategory = async (req: Request, res: Response) => {
	try {
		const { amount, description } = req.body;
		const userId = req.userId;
		const category = await categorizeTransaction(description) as string;
		const transaction = await prisma.transaction.create({
			data: {
				userId,
				amount,
				description,
				category,
			}
		});
		res.status(201).json({ transaction });
	} catch (err: any) {
		console.error("Conyrollet Error: [details] -->\t", err)
		res.status(500).json({message: "Internal Server Error"});
	}
}
