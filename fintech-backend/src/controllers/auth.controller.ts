import type { Request, Response } from "express";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import prisma from "../config/prisma";

export const signUp = async (req: Request, res: Response) => {
	try {
		const {
			firstName,
			middleName,
			lastName,
			email,
			password
		} = req.body;

		const existingUser = await prisma.user.findUnique({
			where: {email}
		});
		if (existingUser)
			return (res.status(400).json({message: "user already exists"}));

		const hashedPassword = await hashPassword(password);
		const user = await prisma.user.create({
			data: {
				firstName,
				middleName,
				lastName,
				email,
				password: hashedPassword,
				wallets: {
					create: {balance: 0}
				}
			}
		});
	
		const token = await generateToken(user.id);
		res.status(200).json({
			token,
			user: {
				firstName,
				middleName,
				lastName
			}
		});

	} catch(err: any) {
		console.log(`error: ${err}`);
		res.status(500).json({message: "Internal server error"});
	}
}

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await prisma.user.findUnique({
			where: {email}
		});
		if (!user)
			return (res.status(400).json({message: "invalid user"}));

		const isUser = await comparePassword(password, user.password);
		if (!isUser)
			return (res.status(400).json({message: "invalid password"}));

		const token = await generateToken(user.id);
		res.status(200).json({
			token,
			user: {
				firstName: user.firstName,
				middleName: user.middleName,
				lastName: user.lastName,
				email
			}
		})
	} catch (err: any) {
		console.log(`error: ${err}`);
		res.status(500).json({message: "Internal server error"})
	}
}
