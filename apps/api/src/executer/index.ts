import { WorkflowModel } from "@repo/backend-core/db";
import { Response } from "express";
import { findOrderofExecutionBFS, findToolsForAINode } from "./helpers";
import { Tool } from "@repo/definitions/types";

export async function excuteWorkflow(id: string, res: Response) {
	const workflow = await WorkflowModel.findById(id);
	if (!workflow) return;
	console.log(workflow);
	const nodes = workflow.nodes;
	const connections = workflow.connections;
	if (!nodes || !connections) return;
	const order_execution = findOrderofExecutionBFS(nodes, connections);
	let response: any[] = [];
	order_execution.forEach((node) => {
		switch (node.type) {
			case "trigger":
				break;
			case "gmail":
				console.log(node.data.node_.message, node.data.node_.credetial);
				response.push(gmailExecuter(node.data.node_.message, node.data.node_.credetial));
				break;
			case "ai":
				console.log(node.data.node_);
				const tools = findToolsForAINode(node.id, nodes, connections);
				response.push(aiExecuter(node.data.node_, tools));
				break;
			case "telegram":
				console.log(node.data.node_.message, node.data.node_.credetial);
				response.push(telExecuter(node.data.node_.message, node.data.node_.credetial));
				break;
			default:
				break;
		}
	});
	res.json({ response });
}




function gmailExecuter(message: string, credential: string) {
	return { message: `Sending email with message: ${message} using credential: ${credential}` };
}
function telExecuter(message: string, credential: string) {
	return { message: `Sending telegram message with message: ${message} using credential: ${credential}` };
}

function aiExecuter(
	node: {
		message: string;
		credetial: string;
	},
	tools: Tool[]
) {
	return {
		message: `AI processing message: ${node.message} using credential: ${node.credetial} with tools: ${(tools)}}`,
	};
}
