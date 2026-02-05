import type { Application, Request, Response } from "express";
import express from "express";
import userRouter from "./routes/user.routes";

const app: Application = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("fintech aPP running\n");
})

app.use("/api", userRouter);

export default	app;