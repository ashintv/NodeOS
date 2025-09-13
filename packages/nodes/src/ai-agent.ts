import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import TOOLS_MAP from "./ai-agent-tools.ts";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { callApiTool } from "./ai-agent-tools.ts/url-caller.js";

async function useToolCal(apiKey: string, query: string) {
	const model = new ChatGoogleGenerativeAI({
		apiKey: "AIzaSyDMe6hC35_3rBvYwApbxzoDpvbtg9SGfEo",
		temperature: 0,
		model: "gemini-2.5-flash",
	});
	const tools = [];
	tools.push(callApiTool);
	const agent = createReactAgent({
		llm: model,
		tools: tools,
	});
	const resp = await agent.invoke({
		messages: [
			{
				role: "system",
				content: `You are a helpful assistant that helps people find information. you can use the following 
                    all post url = https://jsonplaceholder.typicode.com/posts to get the data,
                    single post url = https://jsonplaceholder.typicode.com/posts/1
                    make sure to use the tool to get the data and then answer the question.
                `,
			},
			{ role: "user", content: "get me all post with titles and ids" },
		],
	});
	console.log(resp);
}

useToolCal("x,", "t");
