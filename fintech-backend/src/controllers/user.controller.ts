
import type  { Response } from "express";
import type { authRequest } from "../middleware/auth.middleware";
import prisma from "../config/prisma";

export const profile = async (req: authRequest, res: Response) => {
	try {
		const user = await prisma.user.findUnique({
			where: {id: req.userId as string}
		});
		res.status(200).json(user);
	} catch (err: any) {
		console.log(`error: ${err}`);
		res.status(500).json({message: "Internal seerver error"});
	}
}