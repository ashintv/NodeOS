import {
	addEdge,
	Background,
	BackgroundVariant,
	Controls,
	MiniMap,
	ReactFlow,
	useEdgesState,
	useNodesState,
	type Connection,
	type Edge,
	type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect } from "react";
import { useGraphs } from "@/hooks/useFetchGraph";
import { BASE_URL } from "@/config";
import axios from "axios";
import { useCurrentGraphStateStore } from "@/store/state-store";
import { TriggerNode } from "./nodes/trigger/trigger-node";
import { GmailNode } from "./nodes/action/gmail";
import { TelegramNode } from "./nodes/action/telagram";

export const nodesTypes = {
	trigger: TriggerNode,
	gmail: GmailNode,
	telegram: TelegramNode,
};

export function GraphChart() {
	const { initialEdges, initialNodes, isLoaded } = useGraphs();
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	useEffect(() => {
		if (isLoaded && initialNodes.length > 0) {
			setNodes(initialNodes);
		}
		if (isLoaded && initialEdges.length > 0) {
			setEdges(initialEdges);
		}
	}, [isLoaded, initialNodes, setNodes, setEdges, initialEdges]);

	const id = useCurrentGraphStateStore((state) => state.CurrentId);
	const title = useCurrentGraphStateStore((state) => state.CurrentTitle);
	const onConnect = useCallback((connection: Connection) => {
		const edge = {
			...connection,
			animated: true,
			source: connection.source ?? "",
			target: connection.target ?? "",
			sourceHandle: connection.sourceHandle ?? null,
			targetHandle: connection.targetHandle ?? null,
		};
		setEdges((prevEdges) => addEdge(edge, prevEdges));
	}, []);

	useEffect(() => {
		async function UpdateData(nodes: Node[], edges: Edge[], title: string) {
			if (!isLoaded) return;
			try {
				await axios.put(
					`${BASE_URL}/workflow/${id}`,
					{
						title,
						enabled: true,
						nodes: nodes,
						connections: edges,
					},
					{
						headers: {
							token: localStorage.getItem("token"),
						},
					}
				);
			} catch (e) {
				console.log(e);
			}
		}
		const handler = setTimeout(() => {
			UpdateData(nodes, edges, title);
		}, 800);

		return () => {
			clearTimeout(handler);
		};
	}, [title, nodes, edges]);

	return (
		<div style={{ width: "100%", height: "100%" }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				nodeTypes={nodesTypes}
				fitView
				attributionPosition="bottom-left">
				<Background variant={BackgroundVariant.Dots} gap={20} size={1} color="var(--workflow-background-dots)" />
				<Controls className="bg-card border border-border rounded-lg shadow-sm" />
				<MiniMap
					className="bg-card border border-border rounded-lg shadow-sm"
					nodeColor="var(--workflow-node)"
					maskColor="var(--workflow-minimap-mask)"
				/>
			</ReactFlow>
		</div>
	);
}
