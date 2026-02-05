import { Router } from "express";
import prisma from "../config/prisma";

const userRouter = Router();

userRouter.post("/users/sign-up", async (req, res) => {
	const user = await prisma.user.create({
		data: req.body,
	});
	res.json(user);
})

export default userRouter;