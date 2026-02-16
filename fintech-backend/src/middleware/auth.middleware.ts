import type  { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface authRequest extends Request {
	userId?: string;
}

export const authMiddleWare = (
	req: authRequest,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;
	const token = authHeader?.split(" ")[1];
	if (!token)
		return (res.status(401).json({message: "Unauthoried - No token"}));

	try {
		const decoded = jwt.verify(token, process.env.JWT_KEY!) as {userId: string};
		req.userId = decoded.userId;
		next();
	} catch (err: any) {
		console.error(`error: ${err.message}`);

		if (err.name == 'JsonWebToken' || err.name == 'TokenExpiredError')
			return (res.status(401).json({message: "invalid or expired token"}));

		res.status(500).json({message: "Internal server error"});
	}
}