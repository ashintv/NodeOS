
// deprecated file legacy code moved migrated to engine for node execution
import { WorkflowModel } from "@repo/backend-core/db";
import { Response } from "express";
import { findOrderofExecutionBFS, findToolsForAINode } from "./helpers";
import { gmailExecuter } from "./nodes/gmail-node";
import { aiExecuter } from "./nodes/ai-node";
import { telegramExecuter } from "./nodes/telegram-node";
import { Noderesponse } from "@repo/definitions/types";

export async function excuteWorkflow(id: string, res: Response) {
	const workflow = await WorkflowModel.findById(id);
	if (!workflow) return;
	const nodes = workflow.nodes;
	const connections = workflow.connections;
	if (!nodes || !connections) return;
	const order_execution = findOrderofExecutionBFS(nodes, connections);
	let response: any[] = [];
	for (const node of order_execution) {
		console.log("node" , node.id);
		let r: Noderesponse;
		switch (node.type) {
			case "trigger":
				break;
			case "gmail":
				r = await gmailExecuter(node.data.node_.message, ["ashintv2003@gmail.com"], node.id, node.data.node_.credetial);
				response.push(r);
				res.write(JSON.stringify({ data: "asndl" }) + "\n");
				break;
			case "ai":
				const tools = findToolsForAINode(node.id, nodes, connections);
				r = await aiExecuter(node.data.message, tools, node.id);
				console.log("response from ai ",r)
				res.write(JSON.stringify({ ...r.data }) + "\n");
				response.push(r);
				break;
			case "telegram":
				r = await telegramExecuter(node.data.node_.message, node.data.node_.credetial, node.id);
				res.write(JSON.stringify({ data: r.data }) + "\n");
				response.push(r);
				break;
			default:
				break;
		}
	}

	res.end();
}
