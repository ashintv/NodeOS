import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
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

interface Category {
	id: string;
	name: string;
	icon: React.ReactNode;
}

interface NodesListProps {
	nodes: NodeTemplate[];
	selectedCategory: string;
	categories: Category[];
	onNodeClick: (node: NodeTemplate) => void;
}

export function NodesList({ nodes, selectedCategory, categories, onNodeClick }: NodesListProps) {
	const categoryName =
		selectedCategory === "all" ? "All Nodes" : categories.find((c) => c.id === selectedCategory)?.name || "Nodes";

	return (
		<div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4">
			{/* Section Header */}
			<div className="sticky top-0 bg-background py-1 sm:py-2 border-b border-border z-10">
				<SectionHeader title={categoryName} className="pb-1 sm:pb-2">
					<Badge variant="outline" className="text-xs">
						{nodes.length} node{nodes.length !== 1 ? "s" : ""}
					</Badge>
				</SectionHeader>
			</div>

			{/* Nodes Grid */}
			{nodes.length > 0 ? (
				<div className="grid grid-cols-1 gap-2 sm:gap-3 pb-3 sm:pb-4">
					{nodes.map((node) => (
						<NodeCard key={node.id} node={node} onClick={onNodeClick} variant="detailed" />
					))}
				</div>
			) : (
				<EmptyState />
			)}
		</div>
	);
}

function EmptyState() {
	return (
		<div className="text-center py-8 sm:py-12 px-4">
			<FileText className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
			<h3 className="text-base sm:text-lg font-medium text-foreground mb-2">No nodes found</h3>
			<p className="text-muted-foreground text-xs sm:text-sm max-w-xs sm:max-w-sm mx-auto leading-relaxed">
				Try adjusting your search terms or category filter to find the nodes you're looking for.
			</p>
		</div>
	);
}
