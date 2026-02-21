/**
 * transformMessage - The purpose of this function is to transform ooenai criteria
 * of writijg Al completions to google criteria of generatibe Al
 * @messages: An array of objects containing only two keys, content and role
 *
 * Note: openai
 * "system" -> goohle "systemInstruction"
 * "assistant" maps to goohle "model"
 * "user" maps" to google "user"
 *
 * Return: a separate string of system Messsage and array containing
 * objects with role either user or assistant
 */

export const transformMessage = async (
	messages: {role: string, content: string}[]
) => {
	const systemMessageObj = messages.find((m) => m.role === "system");
	const systemInstruction = systemMessageObj?.content || "";

	const chatMessages = messages.filter((m) => m.role !== "system")
	.map((m) => {
		return {
			role: m.role === "assistant" ? "model" : "user",
			parts: [ {text: m.content}, ],
		};
	});

	return { systemInstruction, chatMessages };
}

/* const messages = [
	{
		role: "user",
		content: "What is my financial tips",
	}
]

console.log(JSON.stringify(transformMessage(messages), null, 2)); */
