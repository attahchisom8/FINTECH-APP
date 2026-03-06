import { generateHealthScore } from "../utils/healthScore";
import { generateAiInsight } from "../services/ai.service";
import { getUserAnalytics } from "../services/analytics.service";
import type { authRequest } from "../middleware/auth.middleware";
import type { Response } from "express";
import { predictNextMonth } from "../utils/prediction"

export const  getInsights = async (
  req: authRequest,
  res: Response
) => {
  try {
    const userId = req.userId as string;
    const analytics = await getUserAnalytics(userId);
    const monthlyExpenses = analytics.transactions.map((tran) => tran.amount);
    const prediction = await predictNextMonth(monthlyExpenses);
    const healthScore = await generateHealthScore(70000, analytics.totalExpenes, 55000, analytics.totalExpenes);
    const aiInsight = await generateAiInsight({
      totalExpenses: analytics.totalExpenes,
      topCategory: analytics.topCategory,
      healthScore,
      predictedNextMonth: prediction,
      monthlyIncome: analytics.totalExpenes * 1.5,
    });

    res.status(200).json({
      aiInsight: aiInsight,
      healthScore,
      prediction,
      topCategory: analytics.topCategory
    })
  } catch (err: any) {
    console.error("Controller Error: [details]: -->\t", err);
    res.status(500).json({ message: "Internal Server Error: Failed to get Al insight" });
  }
}
