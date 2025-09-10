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
import { useCallback } from "react";
import { BaseNodE } from "./nodes/triger-nodes/basic";

export const nodesTypes = {
	basic: BaseNodE,
};

const initialNodes: Node[] = [
	{
		id: "1",
		type: "basic",
		position: { x: 100, y: 100 },
		data: { type: "TRIGGER", Action: "GMAIL", description: "Trigger when a new email arrives" },
	},
	{
		id: "2",
		type: "basic",
		position: { x: 300, y: 200 },
		data: { type: "ACTION", Action: "GMAIL", description: "Process the incoming email" },
	},
	{
		id: "3",
		type: "basic",
		position: { x: 500, y: 100 },
		data: { type: "ACTION", Action: "TELEGRAM", description: "Send the processed email" },
	},
];

const initialEdges: Edge[] = [
	{
		id: "e1-2",
		source: "1",
		target: "2",
		animated: true,
	},
	{
		id: "e2-3",
		source: "2",
		target: "3",
		animated: true,
	},
];

export function GraphChart() {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	const onConnect = useCallback((connection: Connection) => {
		const edge = {
			...connection,
			animated: true,
			source: connection.source ?? "", // ensure string
			target: connection.target ?? "", // ensure string
			sourceHandle: connection.sourceHandle ?? null,
			targetHandle: connection.targetHandle ?? null,
		};
		setEdges((prevEdges) => addEdge(edge, prevEdges));
	}, []);

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
