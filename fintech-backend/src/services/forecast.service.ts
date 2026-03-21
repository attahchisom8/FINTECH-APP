import prisma from "../config/prisma";

export const generateForecast = async (userId: string) => {
	try {
		const transactions = await prisma.transaction.findMany({
			where: { userId }
		});
		if (!transactions.length)
			return null;

		const monthly: Record<string, number> = {};
		transactions.forEach((tx) => {
			const month = new Date(tx.createdAt).toISOString().slice(0, 7);
			monthly[month] = (monthly[month] || 0) + tx.amount;
		});
		console.log(JSON.stringify(monthly, null, 2));

		// predict next month expenses
		const values = Object.values(monthly);
		const avg = values.reduce((a, b) => a + b, 0) / values.length;
		const lastMonth = values[values.length - 1] || 0;
		const growthRate = Number(lastMonth) / (avg || 1);
		const predictedExpenses = avg * growthRate;

		// Get spendingg trend
		const spendingTrend = growthRate > 1 ? "Increasing": "Stable";

		// predict next month balance
		const wallet = await prisma.wallet.findFirst({
			where: { userId }
		});
		if (!wallet)
			return null;

		const currentBalance = wallet.balance || 0;
		const predictedBalance = currentBalance - predictedExpenses;

		// create the chart data
		const chartData = [
			{ month: "now", balance: currentBalance },
			{ month: "next month", balance: predictedBalance},
			{ month: "2nd month", balance: 0.8 * predictedBalance },
		];

		return {
			predictedExpenses,
			predictedBalance,
			spendingTrend,
			chartData,
		}
	} catch (err: any) {
		throw new Error("Service error: [details]\t -->", err);
		
	}
}