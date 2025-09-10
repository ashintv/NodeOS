import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Play, Square, Settings, Save, Download, Upload } from "lucide-react";
import { WorkflowCanvas } from "./workflow-canvas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Node, Edge } from "@xyflow/react";

interface WorkflowBuilderProps {
	title?: string;
	description?: string;
	className?: string;
}

export function WorkflowBuilder({
	title = "Workflow Builder",
	description = "Design and execute your automation workflows",
	className,
}: WorkflowBuilderProps) {
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	const [isRunning, setIsRunning] = useState(false);
	const [workflowStatus, setWorkflowStatus] = useState<"idle" | "running" | "success" | "error">("idle");

	const handleNodesChange = useCallback((newNodes: Node[]) => {
		setNodes(newNodes);
	}, []);

	const handleEdgesChange = useCallback((newEdges: Edge[]) => {
		setEdges(newEdges);
	}, []);

	// const handleAddNode = useCallback(() => {
	// 	// This callback can be used to show a node picker or perform other actions
	// 	console.log("Node added to workflow");
	// }, []);

	const toggleWorkflow = useCallback(() => {
		setIsRunning(!isRunning);
		if (!isRunning) {
			setWorkflowStatus("running");
			// Simulate workflow execution
			setTimeout(() => {
				setWorkflowStatus("success");
				setIsRunning(false);
			}, 3000);
		} else {
			setWorkflowStatus("idle");
		}
	}, [isRunning]);

	const saveWorkflow = useCallback(() => {
		const workflowData = {
			nodes,
			edges,
			timestamp: new Date().toISOString(),
		};
		console.log("Saving workflow:", workflowData);
		// Here you would typically save to your backend
	}, [nodes, edges]);

	const exportWorkflow = useCallback(() => {
		const workflowData = {
			nodes,
			edges,
			metadata: {
				title,
				description,
				createdAt: new Date().toISOString(),
			},
		};

		const dataStr = JSON.stringify(workflowData, null, 2);
		const dataBlob = new Blob([dataStr], { type: "application/json" });
		const url = URL.createObjectURL(dataBlob);

		const link = document.createElement("a");
		link.href = url;
		link.download = `workflow-${Date.now()}.json`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	}, [nodes, edges, title, description]);

	const importWorkflow = useCallback(() => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".json";
		input.onchange = (event) => {
			const file = (event.target as HTMLInputElement).files?.[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = (e) => {
					try {
						const workflowData = JSON.parse(e.target?.result as string);
						if (workflowData.nodes && workflowData.edges) {
							setNodes(workflowData.nodes);
							setEdges(workflowData.edges);
						}
					} catch (error) {
						console.error("Error importing workflow:", error);
					}
				};
				reader.readAsText(file);
			}
		};
		document.body.appendChild(input);
		input.click();
		document.body.removeChild(input);
	}, []);

	const getStatusColor = () => {
		switch (workflowStatus) {
			case "running":
				return "bg-blue-500";
			case "success":
				return "bg-green-500";
			case "error":
				return "bg-red-500";
			default:
				return "bg-gray-400";
		}
	};

	const getStatusText = () => {
		switch (workflowStatus) {
			case "running":
				return "Running";
			case "success":
				return "Success";
			case "error":
				return "Error";
			default:
				return "Idle";
		}
	};

	return (
		<div className={`h-full flex flex-col bg-background ${className || ""}`}>
			{/* Header */}
			<Card className="rounded-none border-x-0 border-t-0">
				<CardHeader className="pb-3">
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<CardTitle className="text-xl font-bold">{title}</CardTitle>
							<p className="text-sm text-muted-foreground">{description}</p>
						</div>
						<div className="flex items-center space-x-2">
							<Button onClick={importWorkflow} size="sm" variant="outline" className="gap-2">
								<Upload className="h-4 w-4" />
								Import
							</Button>
							<Button onClick={exportWorkflow} size="sm" variant="outline" className="gap-2">
								<Download className="h-4 w-4" />
								Export
							</Button>
							<Button onClick={saveWorkflow} size="sm" variant="outline" className="gap-2">
								<Save className="h-4 w-4" />
								Save
							</Button>
							<Separator orientation="vertical" className="h-6" />
							<Button
								onClick={toggleWorkflow}
								size="sm"
								variant={isRunning ? "destructive" : "default"}
								className="gap-2">
								{isRunning ? (
									<>
										<Square className="h-4 w-4" />
										Stop
									</>
								) : (
									<>
										<Play className="h-4 w-4" />
										Run
									</>
								)}
							</Button>
							<Button size="sm" variant="ghost">
								<Settings className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</CardHeader>
			</Card>

			{/* Workflow Canvas */}
			<div className="flex-1 relative overflow-hidden">
				<WorkflowCanvas onNodesChange={handleNodesChange} onEdgesChange={handleEdgesChange} className="h-full" />
			</div>

			{/* Status Bar */}
			<Card className="rounded-none border-x-0 border-b-0">
				<CardContent className="py-3">
					<div className="flex items-center justify-between text-sm">
						<div className="flex items-center space-x-4 text-muted-foreground">
							<span>
								Nodes: <Badge variant="secondary">{nodes.length}</Badge>
							</span>
							<span>
								Connections: <Badge variant="secondary">{edges.length}</Badge>
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<div
								className={`w-2 h-2 rounded-full ${getStatusColor()} ${workflowStatus === "running" ? "animate-pulse" : ""}`}
							/>
							<span className="text-muted-foreground">{getStatusText()}</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
