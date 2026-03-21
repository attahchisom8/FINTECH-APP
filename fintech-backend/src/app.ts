import type { Application, Request, Response } from "express";
import express from "express";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import aiRouter from "./routes/ai.routes"
import transactionRouter from "./routes/transaction.routes"
import walletRouter from "./routes/wallet.routes";
import insightRouter from "./routes/insights.routes";
import forecastRouter from "./routes/forecast.routes";
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
app.use("/api/ai", transactionRouter);
app.use("/api/wallet", walletRouter);
app.use("/api/insights", insightRouter);
app.use("/api/forecast", forecastRouter);

export default	app;
