import { useCallback } from "react";
import {
	ReactFlow,
	addEdge,
	useNodesState,
	useEdgesState,
	Controls,
	Background,
	BackgroundVariant,
	MiniMap,
	type Node,
	type Edge,
	type Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Node types configuration

// Initial workflow data
const initialNodes: Node[] = [
	{
		id: "1",
		type: "workflow",
		position: { x: 100, y: 100 },
		data: { label: "Webhook Trigger", type: "trigger", description: "Listens for incoming webhooks" },
	},
	{
		id: "2",
		type: "workflow",
		position: { x: 350, y: 200 },
		data: { label: "Process Data", type: "action", description: "Transform and validate data" },
	},
	{
		id: "3",
		type: "workflow",
		position: { x: 600, y: 100 },
		data: { label: "Send Email", type: "action", description: "Send notification email" },
	},
];

const initialEdges: Edge[] = [
	{
		id: "e1-2",
		source: "1",
		target: "2",
		style: { stroke: "hsl(var(--primary))", strokeWidth: 2 },
		animated: true,
	},
	{
		id: "e2-3",
		source: "2",
		target: "3",
		style: { stroke: "hsl(var(--primary))", strokeWidth: 2 },
		animated: true,
	},
];

interface WorkflowCanvasProps {
	onNodesChange?: (nodes: Node[]) => void;
	onEdgesChange?: (edges: Edge[]) => void;
	className?: string;
}

export function WorkflowCanvas({
	onNodesChange: onNodesChangeProp,
	onEdgesChange: onEdgesChangeProp,
	className,
}: WorkflowCanvasProps) {
	const [nodes, , onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	const onConnect = useCallback(
		(params: Connection) => {
			const newEdges = addEdge(
				{
					...params,
					style: { stroke: "hsl(var(--primary))", strokeWidth: 2 },
					animated: true,
				},
				edges
			);
			setEdges(newEdges);
			onEdgesChangeProp?.(newEdges);
		},
		[edges, setEdges, onEdgesChangeProp]
	);

	const handleNodesChange = useCallback(
		(changes: any) => {
			onNodesChange(changes);
			onNodesChangeProp?.(nodes);
		},
		[onNodesChange, onNodesChangeProp, nodes]
	);

	const handleEdgesChange = useCallback(
		(changes: any) => {
			onEdgesChange(changes);
			onEdgesChangeProp?.(edges);
		},
		[onEdgesChange, onEdgesChangeProp, edges]
	);

	return (
		<div className={`h-full w-full ${className || ""}`}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={handleNodesChange}
				onEdgesChange={handleEdgesChange}
				onConnect={onConnect}
				className="bg-transparent"
				attributionPosition="bottom-left"
				fitView
				fitViewOptions={{
					padding: 0.2,
					includeHiddenNodes: false,
				}}
				minZoom={0.2}
				maxZoom={2}
				defaultViewport={{ x: 0, y: 0, zoom: 1 }}>
				<Background variant={BackgroundVariant.Dots} gap={20} size={1} color="hsl(var(--muted-foreground) / 0.3)" />
				<Controls
					className="bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-sm"
					showZoom={true}
					showFitView={true}
					showInteractive={true}
				/>
				<MiniMap
					className="bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-sm"
					nodeColor="hsl(var(--primary))"
					maskColor="hsl(var(--background) / 0.8)"
					nodeStrokeWidth={2}
					pannable
					zoomable
					position="bottom-right"
				/>
			</ReactFlow>
		</div>
	);
}
