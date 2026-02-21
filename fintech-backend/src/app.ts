import type { Application, Request, Response } from "express";
import express from "express";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import aiRouter from "./routes/ai.routes" 
import cors from "cors";

const app: Application = express();

app.use(
	cors({
		origin: "http://localhost:3000", // netjs base url
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true // if u want to sd cookies
	})
)
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("fintech aPP running\n");
})

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/ai", aiRouter);

export default	app;
