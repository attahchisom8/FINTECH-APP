import { transformMessage } from "../utils/transform";
import { client } from "../utils/aiClient";


export const categorizeTransaction = async (description: string) => {
	const messages = [
		{
			role: "system",
			content: "You categorize financial transactions into one word category like Education, Housing, Bill, Transportation, Health, Entertainment, Food, Shipping and Others"
		},
		{
			role: "user",
			content: `Categorize this transaction ${description}`
		}
	];

	try {
		const { systemInstruction, chatMessages } = await transformMessage(messages);
		const category = await client.models.generateContent({
			model: "gemini-2.5-flash",
			contents: chatMessages,
			config: {
				systemInstruction,
				temperature: 0.1,
			},
		});

		return category.text;
	} catch (err: any) {
		if (err.status === 429)
			console.error("Quota limits exceeded or you are on a retricted area");
		else
			console.error("service error: [details] -->\t", err);
	}
}

