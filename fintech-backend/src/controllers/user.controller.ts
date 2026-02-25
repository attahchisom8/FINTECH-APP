
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

export const setToOldUser = async (req: authRequest, res: Response) => {
	try {
		const { isNewUser } = req.body;
    const user = await prisma.user.findUnique({
      where: { id: req.userId as string},
    });
    if (!user)
      return res.status(400).json({message: "Failed to fatch user"});
    const updatedUser = await prisma.user.update({
      where: {id: user.id},
      data: { isNewUser },
    });
    res.status(201).json(updatedUser)
  } catch (err: any) {
    console.error("Controller Error: [details] -->\t", err);
    res.status(5000).json({message: "Inywrnal srver Error: Failed to update user"});
  }
}
