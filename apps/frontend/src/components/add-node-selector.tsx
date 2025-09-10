import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import type { NodeTypes, NodeAction } from "./nodes/config/node-types";

import { SearchAndFilters, PopularNodesSection, NodesList, nodeTemplates, categories } from "./add-node";

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

export function AddNodeSelector() {
	const { setNodes } = useReactFlow();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [isOpen, setIsOpen] = useState(false);

	const filteredNodes = nodeTemplates.filter((node) => {
		const matchesSearch =
			node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			node.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			node.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

		const matchesCategory = selectedCategory === "all" || node.category === selectedCategory;

		return matchesSearch && matchesCategory;
	});

	const popularNodes = nodeTemplates.filter((node) => node.popular);
	const showPopularSection = selectedCategory === "all" && searchTerm === "";

	const handleNodeClick = (template: NodeTemplate) => {
		setNodes((nodes) => {
			const newId = String(nodes.length + 1);
			const newNode = {
				id: newId,
				type: "basic",
				position: {
					x: Math.random() * 300 + 100,
					y: Math.random() * 300 + 100,
				},
				data: {
					type: template.type,
					Action: template.action,
					description: template.description,
				},
			};
			return nodes.concat(newNode);
		});
		setIsOpen(false);
	};

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button
					size="sm"
					className="bg-secondary border border-border text-secondary-foreground hover:bg-secondary/80 text-xs sm:text-sm">
					<Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
					<span className="hidden sm:inline">Add Node</span>
					<span className="sm:hidden">Add</span>
				</Button>
			</SheetTrigger>
			<SheetContent className="w-full sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[800px] max-w-[95vw] p-3 sm:p-5 flex flex-col">
				<SheetHeader className="flex-shrink-0">
					<SheetTitle className="text-lg sm:text-xl font-bold">Add Node</SheetTitle>
					<SheetDescription className="text-sm sm:text-base">
						Choose from our collection of nodes to build your workflow
					</SheetDescription>
				</SheetHeader>

				<div className="flex flex-col flex-1 mt-4 sm:mt-6 min-h-0">
					{/* Search and Filters */}
					<div className="flex-shrink-0 mb-4 sm:mb-6">
						<SearchAndFilters
							searchTerm={searchTerm}
							onSearchChange={setSearchTerm}
							selectedCategory={selectedCategory}
							onCategoryChange={setSelectedCategory}
							categories={categories}
						/>
					</div>

					{/* Popular Nodes Section */}
					{showPopularSection && (
						<div className="flex-shrink-0 mb-4 sm:mb-6">
							<PopularNodesSection popularNodes={popularNodes} onNodeClick={handleNodeClick} />
							<Separator className="mt-4 sm:mt-6" />
						</div>
					)}

					{/* All Nodes Section */}
					<NodesList
						nodes={filteredNodes}
						selectedCategory={selectedCategory}
						categories={categories}
						onNodeClick={handleNodeClick}
					/>
				</div>
			</SheetContent>
		</Sheet>
	);
}
