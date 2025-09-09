import { useCallback, useState } from "react";
import ReactFlow, {
	addEdge,
	useNodesState,
	useEdgesState,
	Controls,
	Background,
	BackgroundVariant,
	MiniMap,
} from "reactflow";
import type { Node, Edge, Connection, NodeTypes } from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";
import { Plus, Play, Square, Settings } from "lucide-react";

// Custom node component
function CustomNode({ data }: { data: { label: string; type: string } }) {
	return (
		<div className="bg-card/95 backdrop-blur-sm border border-border shadow-sm rounded-lg p-3 min-w-[150px] hover:shadow-md transition-shadow">
			<div className="flex items-center space-x-2">
				<div
					className={`w-3 h-3 rounded-full ${
						data.type === "trigger"
							? "bg-emerald-500 dark:bg-emerald-400"
							: data.type === "action"
								? "bg-blue-500 dark:bg-blue-400"
								: "bg-purple-500 dark:bg-purple-400"
					}`}
				/>
				<span className="text-card-foreground text-sm font-medium">{data.label}</span>
			</div>
			<div className="text-muted-foreground text-xs mt-1 capitalize">{data.type}</div>
		</div>
	);
}

const nodeTypes: NodeTypes = {
	custom: CustomNode,
};

const initialNodes: Node[] = [
	{
		id: "1",
		type: "custom",
		position: { x: 100, y: 100 },
		data: { label: "Webhook Trigger", type: "trigger" },
	},
	{
		id: "2",
		type: "custom",
		position: { x: 300, y: 200 },
		data: { label: "Process Data", type: "action" },
	},
	{
		id: "3",
		type: "custom",
		position: { x: 500, y: 100 },
		data: { label: "Send Email", type: "action" },
	},
];

const initialEdges: Edge[] = [
	{
		id: "e1-2",
		source: "1",
		target: "2",
		style: { stroke: "var(--workflow-edge)", strokeWidth: 2 },
		animated: true,
	},
	{
		id: "e2-3",
		source: "2",
		target: "3",
		style: { stroke: "var(--workflow-edge)", strokeWidth: 2 },
		animated: true,
	},
];

export function WorkflowChart() {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const [isRunning, setIsRunning] = useState(false);

	const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

	const addNewNode = () => {
		const newNode: Node = {
			id: `${nodes.length + 1}`,
			type: "custom",
			position: { x: Math.random() * 400, y: Math.random() * 300 },
			data: { label: "New Action", type: "action" },
		};
		setNodes((nds) => [...nds, newNode]);
	};

	const toggleWorkflow = () => {
		setIsRunning(!isRunning);
	};

	return (
		<div className="h-full flex flex-col bg-transparent">
			{/* Header */}
			<div className="p-4 border-b border-border">
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-xl font-bold text-foreground">Workflow Builder</h2>
						<p className="text-muted-foreground text-sm">Design and execute your automation workflows</p>
					</div>
					<div className="flex items-center space-x-2">
						<Button
							onClick={addNewNode}
							size="sm"
							className="bg-secondary border border-border text-secondary-foreground hover:bg-secondary/80">
							<Plus className="h-4 w-4 mr-1" />
							Add Node
						</Button>
						<Button
							onClick={toggleWorkflow}
							size="sm"
							className={`border border-border text-foreground hover:bg-secondary ${
								isRunning ? "bg-red-600/20" : "bg-green-600/20"
							}`}>
							{isRunning ? (
								<>
									<Square className="h-4 w-4 mr-1" />
									Stop
								</>
							) : (
								<>
									<Play className="h-4 w-4 mr-1" />
									Run
								</>
							)}
						</Button>
						<Button size="sm" variant="ghost" className="text-foreground hover:bg-secondary">
							<Settings className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>

			{/* Workflow Canvas */}
			<div className="flex-1 relative overflow-hidden">
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					nodeTypes={nodeTypes}
					className="bg-transparent"
					attributionPosition="bottom-left"
					fitView>
					<Background variant={BackgroundVariant.Dots} gap={20} size={1} color="var(--workflow-background-dots)" />
					<Controls className="bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-sm" />
					<MiniMap
						className="bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-sm"
						nodeColor="var(--workflow-node)"
						maskColor="var(--workflow-minimap-mask)"
					/>
				</ReactFlow>
			</div>

			{/* Status Bar */}
			<div className="p-3 border-t border-border bg-muted/50 backdrop-blur-sm">
				<div className="flex items-center justify-between text-sm">
					<div className="flex items-center space-x-4 text-muted-foreground">
						<span>Nodes: {nodes.length}</span>
						<span>Connections: {edges.length}</span>
					</div>
					<div className="flex items-center space-x-2">
						<div
							className={`w-2 h-2 rounded-full ${isRunning ? "bg-emerald-500" : "bg-muted-foreground"} animate-pulse`}
						/>
						<span className="text-muted-foreground">{isRunning ? "Running" : "Stopped"}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
