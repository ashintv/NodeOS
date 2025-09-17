import { CredentialModel } from "@repo/backend-core/db";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { tool } from "@langchain/core/tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { INodeData, Tool } from "@repo/definitions/types";
import { getToolfunction, getToolschema } from "./utils/ai-node-helpers";

/**
 * excute an ai agent give prompt and array of tool to it
 * @param prompt 
 * @param user_tools 
 */
async function executeAgent(prompt: string, user_tools: Tool[]) {
	const apiKey = "AIzaSyDMe6hC35_3rBvYwApbxzoDpvbtg9SGfEo";
	const tools: any[] = [];
	user_tools.forEach((t) => {
		tools.push(tool(getToolfunction(t), getToolschema(t)));
	});
	const model = new ChatGoogleGenerativeAI({
		apiKey,
		temperature: 0.5,
		model: "gemini-2.5-flash",
	});

	const agent = createReactAgent({
		llm: model,
		tools: tools,
	});

	const resp = await agent.invoke({
		messages: [{ role: "user", content: prompt }],
	});
	console.log(resp);
}

executeAgent("what is the price of solana", [
	{
		name: "solanaPriceGet",
		type: "callApi",
		url: "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd",
		desc: "this tool will get you current solana price",
	},
]);
