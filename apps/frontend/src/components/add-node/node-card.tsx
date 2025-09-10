import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

interface NodeCardProps {
	node: NodeTemplate;
	onClick: (node: NodeTemplate) => void;
	variant?: "compact" | "detailed";
}

export function NodeCard({ node, onClick, variant = "detailed" }: NodeCardProps) {
	if (variant === "compact") {
		return (
			<Card
				className="cursor-pointer hover:shadow-md transition-all duration-200 border hover:border-primary/20 h-fit group "
				onClick={() => onClick(node)}>
				<CardHeader className="p-3 sm:p-4">
					<div className="flex items-start gap-2 sm:gap-3">
						<div className="flex-shrink-0 flex items-center justify-center mt-0.5">{node.icon}</div>
						<div className="flex-1 min-w-0">
							<CardTitle className="text-xs sm:text-sm font-medium truncate leading-tight group-hover:text-primary transition-colors">
								{node.name}
							</CardTitle>
							<CardDescription className="text-xs mt-1 sm:mt-1.5 line-clamp-2 leading-relaxed">
								{node.description}
							</CardDescription>
						</div>
						<div className="flex-shrink-0 mt-0.5">
							<Badge variant="secondary" className="text-xs px-1.5 sm:px-2 py-0.5 sm:py-1">
								{node.type}
							</Badge>
						</div>
					</div>
				</CardHeader>
			</Card>
		);
	}

	return (
		<Card
			className="cursor-pointer hover:shadow-md transition-all duration-200 border hover:border-primary/20 hover:bg-accent/5 group"
			onClick={() => onClick(node)}>
			<CardContent className="p-3 sm:p-4">
				<div className="flex items-start gap-3 sm:gap-4">
					<div className="flex-shrink-0 mt-1 flex items-center justify-center">{node.icon}</div>
					<div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
						<div className="flex items-start justify-between gap-2 sm:gap-3">
							<h4 className="font-medium text-xs sm:text-sm text-foreground leading-tight group-hover:text-primary transition-colors">
								{node.name}
							</h4>
							<div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
								{node.popular && (
									<Badge
										variant="secondary"
										className="text-xs bg-yellow-100 text-yellow-800 border-yellow-200 hidden sm:inline-flex">
										Popular
									</Badge>
								)}
								<Badge variant="outline" className="text-xs px-1.5 sm:px-2 py-0.5 sm:py-1">
									{node.type}
								</Badge>
							</div>
						</div>
						<p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-none">
							{node.description}
						</p>
						<div className="flex flex-wrap gap-1 sm:gap-1.5">
							{node.tags.slice(0, 3).map((tag: string) => (
								<Badge
									key={tag}
									variant="secondary"
									className="text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-muted/60 text-muted-foreground hover:bg-muted transition-colors">
									{tag}
								</Badge>
							))}
							{node.tags.length > 3 && (
								<Badge
									variant="secondary"
									className="text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-muted/60 text-muted-foreground">
									+{node.tags.length - 3}
								</Badge>
							)}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
