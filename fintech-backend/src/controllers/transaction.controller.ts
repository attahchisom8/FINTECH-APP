import { categorizeTransaction } from "../services/aiTransaction.service";
import type { Response } from "express";
import type { authRequest } from "../middleware/auth.middleware";
import prisma from "../config/prisma";
import { detectFraud } from "../services/fraudAlert.service";
import { io } from "../server";

export const createCategory = async (req: authRequest, res: Response) => {
	try {
		const { amount, description } = req.body;
		const userId = req.userId as string;
		const category = await categorizeTransaction(description) as string;
		const transaction = await prisma.transaction.create({
			data: {
				userId,
				amount,
				description,
				category,
			}
		});
		const detectedFraud = await detectFraud({
			...transaction,
			location: "Nigeria",
			currency: "NGN",
			accountAge: "2 years",
		});
		io.emit("fraud-alert", detectedFraud);

		res.status(201).json(transaction);
	} catch (err: any) {
		console.error("Conyrollet Error: [details] -->\t", err)
		res.status(500).json({message: "Internal Server Error"});
	}
}
