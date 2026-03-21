import prisma from "../config/prisma";
import type { Response } from "express";
import type { authRequest } from "../middleware/auth.middleware";
import { generateForecast } from "../services/forecast.service";

export const getForecast = async (req: authRequest, res: Response) => {
	const ONE_DAY = 24 * 60 * 60 * 1000; // 1000 - miisecond

	try {
		const fuserId = req.userId as string;
		const existingForecast = await prisma.forecast.findFirst({
			where: { userId: fuserId },
			orderBy: { createdAt: "desc" },
		});
		if (existingForecast &&
			(Date.now() - new Date(existingForecast.createdAt).getTime()) < ONE_DAY)
		{
			return res.status(200).json({
				forecast: {
					predictedExpenses: existingForecast.predictedExpenses,
					predictedBalance: existingForecast.predictedBalance,
					spendingTrend: existingForecast.spendingTrend,
					chartData: existingForecast.chartData,
				}
			});
		}

		const forecast = await generateForecast(fuserId);
		const saved_forecast = await prisma.forecast.create({
			data: {
				userId: fuserId,
				predictedBalance: forecast?.predictedBalance ?? 0,
				predictedExpenses: forecast?.predictedExpenses ?? 0,
				spendingTrend: forecast?.spendingTrend ?? "",
				chartData: forecast?.chartData ?? [],
			}
		});
		const {id, userId, ...send_forecast} = saved_forecast;
		res.status(200).json({forecast: send_forecast});
	} catch (err: any) {
		console.error("Controller error: [details] -->\t", err);
		res.status(500).json({message: "Internal server error: Failed to get forecast"});
	}
}