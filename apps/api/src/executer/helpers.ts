import { Tool } from "@repo/definitions/types";

/**
 * find order of execution of nodes
 * @param nodes
 * @param edges
 * @returns
 */
export function findOrderofExecutionBFS(nodes: any[], edges: any[]) {
	const nodeMap = new Map(nodes.map((n) => [n.id, n]));
	const graph: Record<string, string[]> = {};

	edges.forEach((e) => {
		if (!graph[e.source]) graph[e.source] = [];
		graph[e.source]?.push(e.target);
	});

	const trigger = nodes.find((n) => n.type === "trigger");
	if (!trigger) throw new Error("No trigger node found");

	const visited = new Set<string>();
	const queue: string[] = [trigger.id];
	const order: any[] = [];

	while (queue.length > 0) {
		const nodeId = queue.shift()!;
		if (visited.has(nodeId)) continue;
		visited.add(nodeId);

		const node = nodeMap.get(nodeId);
		if (!node) continue;

		order.push(node);

		const children = graph[nodeId] || [];

		for (const cid of children) {
			const child = nodeMap.get(cid);
			console.log(child);
			if (node.type === "ai" && child?.type === "callApi") {
				order.push({ ...child });
				visited.add(cid); // mark as processed, since not queued
			} else if (child && !visited.has(cid)) {
				queue.push(cid);
			}
		}
	}

	return order;
}

/**
 * Find all tools that are connected to the AI node.
 * @param aiNode The AI node to find tools for.
 * @param nodes All nodes in the workflow.
 * @param connections All connections between nodes.
 * @returns An array of tools connected to the AI node.
 */
export function findToolsForAINode(id: string, nodes: any[], connections: any[]): Tool[] {
	const tools: Tool[] = [];

	const incomingConnections = connections.filter((conn) => conn.source === id);

	incomingConnections.forEach((conn) => {
		const targetNodeId = conn.target;

		const targetNode = nodes.find((node) => node.id === targetNodeId);

		if (targetNode) {
			tools.push(targetNode.data);
		}
	});

	return tools;
}
