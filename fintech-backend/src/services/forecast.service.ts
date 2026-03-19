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
			const month = new Date(tx.createdAt).toISOString().slice(0. 7);
			monthly[month] = (monthly[month] || 0) + tx.amount;
		});
		console.log(JSON.jsonify(monthly, 2, null));
		// predict next month expenses
		const values = Object.values(monthly);
		const avg = values.reduce((a, b) => a + b, 0) / values.length;
		const lastMonth = values[-1];
		const growthRate = lastMonth / avg;
		const predictedExpenses = number(lastMonth) * growthRate;

		// Get spendingg trend
		const spendingTrend = growthRate > 1 ? "Increasing": "Stable";

		// predict next month balance
		cobst wallet = await prisma.findFirst({
			where: { userId }
		});
		const currentBalance = wallet.balamce || 0;
		const predictedBalance = currentBalance - predictedExpenses;

		// create the chart data
		const chartData = [
			{ month: "now", balance: currentBalance },
			{ month: "next month", balance: predictedBalance},
			{ month: "2nd month", balamce: 0.8 * predictedBalance },
		];

		return {
			predictedExpenses,
			predictedBalance,
			spendingTrend.
			chartData
		}
	} catch (err) {
		throw new Error("Service error: [details]\t -->", err);
		
	}
}