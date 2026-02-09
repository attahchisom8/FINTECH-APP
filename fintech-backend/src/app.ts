import type { Application, Request, Response } from "express";
import express from "express";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes"

const app: Application = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("fintech aPP running\n");
})

app.use("/api", userRouter);
// app.use("/api", authRouter);

export default	app;