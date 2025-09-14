import { CredentialModel } from "@repo/backend-core/db";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import TOOLS_MAP from "./ai-agent-tools.ts/index.js";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { AINode } from "@repo/definitions/types";

/**
 * create and run a agent with the specified model and tools
 * @param node
 */
async function useToolCal(node: AINode) {
	// finf credential from db
	// const api  =  await CredentialModel.findById(node.credential)
	const apiKey = "AIzaSyDMe6hC35_3rBvYwApbxzoDpvbtg9SGfEo";
	const tools: any = [];

	// loop through the tools and add them to the tools array
	// only add tools that are in the TOOLS_MAP
	// if tool is not in the TOOLS_MAP, ignore it

	const tools_names = Object.keys(node.tools);
	tools_names.forEach((tool) => {
		if (TOOLS_MAP[tool as keyof typeof TOOLS_MAP]) {
			tools.push(TOOLS_MAP[tool as keyof typeof TOOLS_MAP]);
		}
	});

	// genrate system prompt from node.prompt
	const systemPrompt = `
				* . you are an helpfull agent that help users to do some work by answering them
				* . you can use any tools provided to you to answer the users question,
				* . here some metadata you can use to answer user quest -
							${Object.values(node.tools)
								.map((tool) => {
									if ("desc" in tool) {
										return `=> . ${tool.desc}`;
									}
								})
								.join("\n")}
	`;
	const model = new ChatGoogleGenerativeAI({
		apiKey,
		temperature: node.temperature || 0,
		model: "gemini-2.5-flash",
	});

	const agent = createReactAgent({
		llm: model,
		tools: tools,
	});

	const resp = await agent.invoke({
		messages: [
			{
				role: "system",
				content: systemPrompt,
			},
			{ role: "user", content: node.prompt },
		],
	});
	console.log(resp);
}

useToolCal({
	credential: "",
	tools: {
		callApi: [{ url: "https://jsonplaceholder.typicode.com/posts", desc: "get all post from jsonplaceholder" }],
	},
	prompt: "get me all post with title numberd", // decribe the job of ai
	temperature: 0, // temperature for ai model
});
