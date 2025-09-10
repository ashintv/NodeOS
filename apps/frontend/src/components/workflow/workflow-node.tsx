import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Mail, Database, Webhook, Settings, Play, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkflowNodeData {
	label: string;
	type: "trigger" | "action" | "condition";
	description?: string;
	status?: "idle" | "running" | "success" | "error";
	icon?: string;
}

const getNodeIcon = (type: string, label: string) => {
	const iconProps = { className: "h-4 w-4" };

	if (label.toLowerCase().includes("webhook")) return <Webhook {...iconProps} />;
	if (label.toLowerCase().includes("email") || label.toLowerCase().includes("mail")) return <Mail {...iconProps} />;
	if (label.toLowerCase().includes("database") || label.toLowerCase().includes("data"))
		return <Database {...iconProps} />;

	switch (type) {
		case "trigger":
			return <Zap {...iconProps} />;
		case "action":
			return <Play {...iconProps} />;
		case "condition":
			return <Settings {...iconProps} />;
		default:
			return <Settings {...iconProps} />;
	}
};

const getNodeColor = (type: string, status?: string) => {
	if (status === "running") return "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20";
	if (status === "success") return "border-green-500 bg-green-50/50 dark:bg-green-950/20";
	if (status === "error") return "border-red-500 bg-red-50/50 dark:bg-red-950/20";

	switch (type) {
		case "trigger":
			return "border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-700";
		case "action":
			return "border-blue-300 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-700";
		case "condition":
			return "border-purple-300 bg-purple-50/50 dark:bg-purple-950/20 dark:border-purple-700";
		default:
			return "border-gray-300 bg-gray-50/50 dark:bg-gray-950/20 dark:border-gray-700";
	}
};

const getStatusIndicator = (status?: string) => {
	switch (status) {
		case "running":
			return <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />;
		case "success":
			return <div className="h-2 w-2 rounded-full bg-green-500" />;
		case "error":
			return <div className="h-2 w-2 rounded-full bg-red-500" />;
		default:
			return <div className="h-2 w-2 rounded-full bg-gray-400" />;
	}
};

export const WorkflowNode = memo(({ data, selected }: NodeProps) => {
	const nodeData = data as unknown as WorkflowNodeData;
	const nodeColor = getNodeColor(nodeData.type, nodeData.status);
	const icon = getNodeIcon(nodeData.type, nodeData.label);
	const statusIndicator = getStatusIndicator(nodeData.status);

	return (
		<div className="group">
			{/* Input Handle */}
			<Handle
				type="target"
				position={Position.Left}
				className="!w-3 !h-3 !border-2 !border-background !bg-primary"
				style={{ left: -6 }}
			/>

			{/* Node Content */}
			<Card
				className={cn(
					"min-w-[200px] max-w-[280px] transition-all duration-200",
					"hover:shadow-lg hover:scale-[1.02]",
					selected && "ring-2 ring-primary ring-offset-2 ring-offset-background",
					nodeColor
				)}>
				<CardHeader className="pb-2">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							{icon}
							<div className="flex flex-col gap-1">
								<h4 className="text-sm font-semibold leading-none">{nodeData.label}</h4>
								<Badge variant={nodeData.type === "trigger" ? "default" : "secondary"} className="text-xs w-fit">
									{nodeData.type}
								</Badge>
							</div>
						</div>
						<div className="flex items-center gap-1">
							{statusIndicator}
							<Button
								variant="ghost"
								size="sm"
								className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
								<MoreHorizontal className="h-3 w-3" />
							</Button>
						</div>
					</div>
				</CardHeader>

				{nodeData.description && (
					<CardContent className="pt-0">
						<p className="text-xs text-muted-foreground leading-relaxed">{nodeData.description}</p>
					</CardContent>
				)}
			</Card>

			{/* Output Handle */}
			<Handle
				type="source"
				position={Position.Right}
				className="!w-3 !h-3 !border-2 !border-background !bg-primary"
				style={{ right: -6 }}
			/>
		</div>
	);
});

WorkflowNode.displayName = "WorkflowNode";
