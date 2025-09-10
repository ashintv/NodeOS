import { Zap } from "lucide-react";
import { NodeCard } from "./node-card";
import { SectionHeader } from "./section-header";
import type { NodeTypes, NodeAction } from "../nodes/config/node-types";

interface NodeTemplate {
	id: string;
	name: string;
	description: string;
	category: "trigger" | "action" | "condition" | "data";
	type: NodeTypes;
	action: NodeAction;
	icon: React.ReactNode;
	tags: string[];
	popular?: boolean;
}

interface PopularNodesSectionProps {
	popularNodes: NodeTemplate[];
	onNodeClick: (node: NodeTemplate) => void;
}

export function PopularNodesSection({ popularNodes, onNodeClick }: PopularNodesSectionProps) {
	if (popularNodes.length === 0) return null;

	return (
		<div className="space-y-4">
			<SectionHeader
				title="Popular Nodes"
				icon={<Zap className="w-5 h-5 text-yellow-500" />}
				subtitle="Most commonly used nodes"
			/>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3 max-h-60 sm:max-h-80 overflow-y-auto scrollbar-thin">
				{popularNodes.map((node) => (
					<NodeCard key={node.id} node={node} onClick={onNodeClick} variant="compact" />
				))}
			</div>
		</div>
	);
}
