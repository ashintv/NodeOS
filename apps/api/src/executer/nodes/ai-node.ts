import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { tool } from "@langchain/core/tools";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Noderesponse } from "@repo/definitions/types";
import { config } from "dotenv";
import { Tool } from "@repo/definitions/types";
import axios from "axios";

config();
/**
 * excute an ai agent give prompt and array of tool to it
 * @param prompt
 * @param user_tools
 */
export async function aiExecuter(prompt: string, user_tools: Tool[], id: string): Promise<Noderesponse> {
	try {
		console.log(`Making an ai request with ${JSON.stringify(prompt)}`);
		const apiKey = process.env.GEMINI_KEY;
		const tools: any[] = [];
		user_tools.forEach((t) => {
			tools.push(tool(getToolfunction(t), getToolschema(t)));
		});

		console.log("tools created");
		const model = new ChatGoogleGenerativeAI({
			apiKey,
			temperature: 0.5,
			model: "gemini-2.5-flash",
		});

		console.log("model created");
		if (tools.length > 0) {
			const agent = createReactAgent({
				llm: model,
				tools: tools,
			});
			console.log("agent call");
			const resp = await agent.invoke({
				messages: [{ role: "user", content: prompt }],
			});
			const aiResponse = resp.messages[resp.messages.length - 1]?.content;
			console.log(aiResponse);
			return {
				status: "succes",
				node: id,
				message: "Agent Call Successfull",
				data: aiResponse,
			};
		}else{
			console.log("model call")
			const resp =await model.invoke(prompt);
			console.log(resp)
			return {
				status: "succes",
				node: id,
				message: "Agent Call Successfull",
				data: resp,
			};
		}
	} catch (e) {
		console.log("error", e);
		return {
			status: "succes",
			node: id,
			message: "Agent Call successfull",
			data: "",
		};
	}
}

export function getToolfunction(data: Tool): any {
	if (data.type == "callApi") {
		return async function () {
			try {
				const res = await axios.get(data.url!);
				return res.data;
			} catch (error) {
				return {
					message: "Error",
					error,
				};
			}
		};
	}
}

export function getToolschema(t: Tool): any {
	if (t.type == "callApi") {
		return {
			name: t.name,
			descriptio: t.desc,
		};
	}
}
