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
    
    res.status(201).json({ category });

    if (detectedFraud.risk === "High")
      io.to(userId).emit("fraud-alert", {
        transactionId: transaction.id,
        ...detectedFraud
      });

	} catch (err: any) {
		console.error("Conyrollet Error: [details] -->\t", err)
		res.status(500).json({message: "Internal Server Error"});
	}
}
