import { memo } from "react";
import { Button } from "@/components/ui/button";
import { BaseNode, BaseNodeContent, BaseNodeFooter, BaseNodeHeader, BaseNodeHeaderTitle } from "@/components/base-node";
import type { BasicNode } from "../config/node-types";
import { Handle, Position, type NodeProps, useReactFlow } from "@xyflow/react";
import { GmailIcon } from "@/icons/gmail";
import { TelagramIcon } from "@/icons/telegram";
import { TriggerIcon } from "@/icons/trigger";

// typ

export const BaseNodE = memo(({ data, id }: NodeProps<BasicNode>) => {
	const { setNodes } = useReactFlow();
	if (data.type === "TRIGGER") {
		return (
			<BaseNode className="w-96 bg-gradient-to-br from-primary/5 to-accent/10 border-primary/20">
				<Handle position={Position.Right} type="source" className="bg-primary border-primary/50" />

				<BaseNodeHeader className="border-b border-primary/20 bg-gradient-to-r from-primary/10 to-accent/5">
					{/* Trigger Node Header */}

					<BaseNodeHeaderTitle>
						<div className="flex justify-between items-center">
							<div className="flex gap-3 items-center">
								<div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
									<TriggerIcon className="size-5 text-primary" />
								</div>
								<div>
									<div className="font-semibold text-primary">Trigger Node</div>
									<div className="text-xs text-muted-foreground">Workflow Entry Point</div>
								</div>
							</div>

							<div>
								<Button 
									onClick={() => setNodes((nds) => nds.filter((n) => n.id !== id))} 
									variant={"outline"} 
									size="sm"
									className="text-destructive hover:text-destructive hover:bg-destructive/10"
								>
									×
								</Button>
							</div>
						</div>
					</BaseNodeHeaderTitle>
				</BaseNodeHeader>
				<BaseNodeFooter className="bg-card/50">
					<span className="flex justify-center gap-2">
						<Button variant="outline" className="nodrag w-full text-primary border-primary/30 hover:bg-primary/10">
							Copy
						</Button>
						<Button variant={"default"} className="nodrag w-full bg-primary hover:bg-primary/90">
							Run
						</Button>
					</span>
				</BaseNodeFooter>
			</BaseNode>
		);
	} else if (data.type == "ACTION") {
		const getActionMetadata = () => {
			switch (data.Action) {
				case "GMAIL":
					return {
						title: "Gmail Action",
						description: "Send emails and manage Gmail",
						color: "from-red-500/10 to-red-600/5",
						borderColor: "border-red-500/20",
						iconBg: "bg-red-500/10",
						iconBorder: "border-red-500/20",
						textColor: "text-red-600",
						buttonColor: "border-red-500/30 hover:bg-red-500/10 text-red-600"
					};
				case "TELEGRAM":
					return {
						title: "Telegram Action",
						description: "Send messages via Telegram",
						color: "from-blue-500/10 to-blue-600/5",
						borderColor: "border-blue-500/20",
						iconBg: "bg-blue-500/10",
						iconBorder: "border-blue-500/20",
						textColor: "text-blue-600",
						buttonColor: "border-blue-500/30 hover:bg-blue-500/10 text-blue-600"
					};
				default:
					return {
						title: "Action Node",
						description: "Perform workflow actions",
						color: "from-secondary/10 to-accent/5",
						borderColor: "border-secondary/20",
						iconBg: "bg-secondary/10",
						iconBorder: "border-secondary/20",
						textColor: "text-secondary-foreground",
						buttonColor: "border-secondary/30 hover:bg-secondary/10"
					};
			}
		};

		const metadata = getActionMetadata();

		return (
			<BaseNode className={`w-96 bg-gradient-to-br ${metadata.color} ${metadata.borderColor}`}>
				<Handle position={Position.Right} type="source" className="bg-chart-2 border-chart-2/50" />
				<Handle position={Position.Left} type="target" className="bg-chart-1 border-chart-1/50" />
				<Handle position={Position.Bottom} type="source" className="bg-chart-3 border-chart-3/50" />
				<Handle position={Position.Top} type="target" className="bg-chart-4 border-chart-4/50" />
				
				<BaseNodeHeader className={`border-b ${metadata.borderColor} bg-gradient-to-r ${metadata.color}`}>
					{/* Action Node Header */}

					<div className="flex justify-between items-center w-full">
						<div className="flex gap-3 items-center">
							<div className={`p-2 rounded-lg ${metadata.iconBg} border ${metadata.iconBorder}`}>
								{data.Action === "GMAIL" && <GmailIcon className="size-5" />}
								{data.Action === "TELEGRAM" && <TelagramIcon className="size-5" />}
								{!data.Action || data.Action === "SOURCE" && <div className="size-5 rounded bg-secondary/50" />}
							</div>
							<div>
								<BaseNodeHeaderTitle className={`font-semibold ${metadata.textColor}`}>
									{metadata.title}
								</BaseNodeHeaderTitle>
								<div className="text-xs text-muted-foreground">
									{metadata.description}
								</div>
							</div>
						</div>

						<div>
							<Button 
								onClick={() => setNodes((nds) => nds.filter((n) => n.id !== id))} 
								variant={"outline"}
								size="sm"
								className="text-destructive hover:text-destructive hover:bg-destructive/10"
							>
								×
							</Button>
						</div>
					</div>
				</BaseNodeHeader>
				<BaseNodeContent className="bg-card/30">
					<div className="text-sm text-muted-foreground">
						{data.desc || "Configure this action to perform specific tasks in your workflow."}
					</div>
				</BaseNodeContent>
				<BaseNodeFooter className="bg-card/50">
					<Button 
						variant="outline" 
						className={`nodrag w-full ${metadata.buttonColor}`}
					>
						Configure Action
					</Button>
				</BaseNodeFooter>
			</BaseNode>
		);
	}
});
