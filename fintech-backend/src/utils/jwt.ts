import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_KEY as string;

export const generateToken = async (userId: string) => {
	return (
		jwt.sign(
			{userId},
			JWT_SECRET_KEY,
			{expiresIn: "7d"}
		)
	);
}

await console.log(`jwt key: ${generateToken("some password")}`);