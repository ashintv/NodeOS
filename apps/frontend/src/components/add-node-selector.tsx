import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Zap, Mail, MessageCircle } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useReactFlow } from "@xyflow/react";

// Define available node types with their metadata
const nodeTypes = [
	{
		type: "trigger",
		category: "Triggers",
		label: "Webhook Trigger",
		description: "Start workflow with HTTP request",
		icon: Zap,
		data: {
			description: "Webhook trigger node",
			node_: {
				credential: "",
			},
		},
	},
	{
		type: "gmail",
		category: "Actions",
		label: "Gmail",
		description: "Send email via Gmail",
		icon: Mail,
		data: {
			Action: "GMAIL",
			description: "Send email using Gmail",
			node_: {
				credential: "",
				message: "",
			},
		},
	},
	{
		type: "telegram",
		category: "Actions",
		label: "Telegram",
		description: "Send message via Telegram bot",
		icon: MessageCircle,
		data: {
			Action: "TELEGRAM",
			description: "Send message using Telegram bot",
			node_: {
				credential: "",
				message: "",
			},
		},
	},
	{
		type: "ai",
		category: "Actions",
		label: "AI Agent",
		description: "AI agent with tool use capabilities",
		icon: Zap,
		data: {
			Action: "AI",
			description: "AI agent node",
			node_: {
				credential: "",
				message: "",
				tools: {},
			},
		},		
	}
];

export function AddNodeSelector() {
	const [isOpen, setIsOpen] = useState(false);
	const { addNodes, getViewport } = useReactFlow();

	const handleAddNode = (nodeConfig: (typeof nodeTypes)[number]) => {
		// Generate unique ID for the new node
		const nodeId = `${nodeConfig.type}_${Date.now()}`;

		// Get current viewport to place node in visible area
		const viewport = getViewport();
		const centerX = -viewport.x + window.innerWidth / 2 / viewport.zoom;
		const centerY = -viewport.y + window.innerHeight / 2 / viewport.zoom;

		// Create the new node
		const newNode = {
			id: nodeId,
			type: nodeConfig.type,
			position: {
				x: centerX + Math.random() * 100 - 50, // Add some random offset
				y: centerY + Math.random() * 100 - 50,
			},
			data: nodeConfig.data,
		};

		// Add the node to the flow
		addNodes([newNode]);
		setIsOpen(false);
	};

	// Group nodes by category
	const triggerNodes = nodeTypes.filter((node) => node.category === "Triggers");
	const actionNodes = nodeTypes.filter((node) => node.category === "Actions");

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
					<Plus className="h-4 w-4 mr-1" />
					Add Node
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-64">
				{/* Trigger Nodes Section */}
				<DropdownMenuLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
					Triggers
				</DropdownMenuLabel>
				{triggerNodes.map((node) => {
					const IconComponent = node.icon;
					return (
						<DropdownMenuItem key={node.type} className="cursor-pointer p-3" onClick={() => handleAddNode(node)}>
							<div className="flex items-center gap-3">
								<div className="flex-shrink-0">
									<IconComponent className="h-5 w-5 text-muted-foreground" />
								</div>
								<div className="flex-1 min-w-0">
									<div className="font-medium text-sm">{node.label}</div>
									<div className="text-xs text-muted-foreground truncate">{node.description}</div>
								</div>
							</div>
						</DropdownMenuItem>
					);
				})}

				<DropdownMenuSeparator />

				{/* Action Nodes Section */}
				<DropdownMenuLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
					Actions
				</DropdownMenuLabel>
				{actionNodes.map((node) => {
					const IconComponent = node.icon;
					return (
						<DropdownMenuItem key={node.type} className="cursor-pointer p-3" onClick={() => handleAddNode(node)}>
							<div className="flex items-center gap-3">
								<div className="flex-shrink-0">
									<IconComponent className="h-5 w-5 text-muted-foreground" />
								</div>
								<div className="flex-1 min-w-0">
									<div className="font-medium text-sm">{node.label}</div>
									<div className="text-xs text-muted-foreground truncate">{node.description}</div>
								</div>
							</div>
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
