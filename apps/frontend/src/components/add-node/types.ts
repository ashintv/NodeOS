import type { NodeTypes, NodeAction } from "../nodes/config/node-types";

export interface NodeTemplate {
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

export interface Category {
	id: string;
	name: string;
	icon: React.ReactNode;
}
