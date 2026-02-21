import { transformMessage } from "../utils/transform";
import { client } from "../utils/aiClient";


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
