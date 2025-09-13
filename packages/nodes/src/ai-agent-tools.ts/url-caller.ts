import axios from "axios";
import { z } from "zod";
import { tool } from "@langchain/core/tools";

// const url = "https://jsonplaceholder.typicode.com/posts";
/**
 * A api call tool wich send a get request a the specified url
 * @param url
 */
const callApi = async ({ url }: { url: string }): Promise<any> => {
	try {
		const response = await axios.get(url);
		return JSON.stringify(response.data);
	} catch (error) {
		return { errors: `${url} unable to get ` };
	}
};

export const callApiTool = tool(callApi as any, {
	name: "callApi",
	description: "send a get request to the specified url and return the data",
	schema: {
		type: "object",
		properties: {
			url: { type: "string", description: "the url to send the get request to" },
		},
		required: ["url"],
	}
});
