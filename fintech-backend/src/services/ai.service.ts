import { transformMessage } from "../utils/transform";
import { client } from "../utils/aiClient";
import { aiEngine } from "../utils/aiClient"

export const generateAlResponse = async (prompt: string) => {
	const messages = [
		{
			role: "user",
			content: prompt,
		},
	];

	try {

		const { chatMessages } = await transformMessage(messages);

		const res = await client.models.generateContent({
			model: "gemini-2.5-flash",
			contents: chatMessages,
		});

		return res.text;
	} catch (err: any) {
		if (err.status === 429) {
			console.error("limit exceded you are on free tier or retricyed region");
			
		} else {
			console.error("Al servet error: [details] -->\t", err);
		}
		throw new Error("Failed to generate Al response");
	}
}


export const generateAiInsight = async (data: Record<string, any>) => {
  const prompt = `These are the users financial summary; Analyze the following data:
Total Ezpenses: ${ data.totalExpenses }
Health Score: ${data.healthScore}/100

Top Spending: ${data.topCategory}

Predicted Spending: ${data.predictedNextMonth}

If the prediction is higher than their income (${data.monthlyIncome}), be firm but helpful. If the health score is high, be encouraging. Provide 3 bullet points: 1 Observation, 1 Warning (if any), and 1 Action Step.`;

  const messages = [
    {
      role: "system",
      content: "You are Ambrose, a witty,  proffessional financail assistant, give this user financial tips and advice based on his data",
    },
    {
      role: "used",
      content: prompt,
    }
  ]
  try {
  const {systemInstruction, chatMessages} =   await transformMessage(messages);

    const aiAnalysis = await aiEngine({
      model: "gemini-2.5-flash",
      contents: chatMessages,
      temperature: 0.5,
      systemInstruction,
    })
    .then((res) => res.text);

    return aiAnalysis;
  } catch (err: any) {
    console.error("Service Error: [details] -->\t");
    throw new Error(err);
  }
}
