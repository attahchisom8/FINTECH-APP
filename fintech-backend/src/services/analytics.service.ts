import prisma from "../config/prisma";


export const getUserAnalytics = async (userId: string) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId }
    });
    const totalExpenes = transactions.reduce((sum, t) => sum + t.amount, 0);
    const totalTopCategory = transactions.reduce((acc: Record<string, number>, t) => {
      acc[t.category!] = (acc[t.category!] || 0) + t.amount;

      return acc;
    }, {});

    const topCategory = Object.entries(totalTopCategory)
    .sort((a, b) => b[1] - a[1])[0]?.[0];

    return {
      totalExpenes,
      topCategory,
      transactions,
    }
  } catch (err: any) {
    console.error("Service Error: [details] -->\t", err);
    throw new Error(err);
  }
}
