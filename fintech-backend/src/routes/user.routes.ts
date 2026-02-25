import { Router } from "express";
import prisma from "../config/prisma";
import { authMiddleWare } from "../middleware/auth.middleware";
import { profile, setToOldUser } from "../controllers/user.controller";

const userRouter = Router();

/** userRouter.post("/test/users", async (req, res) => {
	const user = await prisma.user.create({
		data: req.body,
	});
	res.json(user);
}); */

userRouter.get("/profile", authMiddleWare, profile);
userRouter.post("/profile/set-old", authMiddleWare, setToOldUser);

export default userRouter;
