import type { authRequest } from "../middleware/auth.middleware";
import type { Response } from "express";
import prisma from "../config/prisma";

export const addMoney = async (
		req: authRequest,
		res: Response
	) => {
	try {
		const { amount } = req.body;
		const userId = req.userId as string;
		const wallet = await prisma.wallet.findFirst({
			where: { userId },
		});
		if (!wallet)
			return res.status(400).json({message: "No wallet found!"});
		const [updatedWallet] = await prisma.$transaction([
			prisma.wallet.update({
				where: { id: wallet.id },
				data: {
					balance: wallet.balance + Number(amount,)
				}
			}),
			prisma.transaction.create({
				data: {
					userId,
					amount: Number(amount),
					description: "Wallet Funding",
					category: "Funding",
				}
			}),
		]);
		res.status(201).json(updatedWallet);
	} catch (err: any) {
		console.error("Controller Error: [details] -->\t", err);
		res.status(500).json({message: "Internal Server Error"});
	}
}
