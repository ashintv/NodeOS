import type { Node } from "@xyflow/react";

export type NodeTypes = "TRIGGER" | "ACTION";
export type NodeAction = "GMAIL" | "TELEGRAM" | "SOURCE"

export type BasicNode = Node<{ type: NodeTypes; Action: NodeAction ; desc?:string}>;


