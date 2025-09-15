export type Tools = "callApi" | "codeRun";




// Union of all possible data variants

export type FetchAPi = {
	url: string;
	desc: string;
};

export type CodeRun = {
	code: string;
	desc: string;
	schema: {
		name: string;
		// add others accordingly
	};
};


export type ToolsType = Partial<Record<Tools, (FetchAPi | CodeRun)[]>>;
export type INodeData = {
// node type
	Action: "GMAIL" | "TELEGRAM" | "AI" | "TOOL"
	description: string;
	credential: string;
	message?: string; // prompt 
	tools: ToolsType
	

	// optional for triggers
	// allow future extensible fields
};

export interface INode {
	type: "trigger" | "gmail" | "telegram" | "ai" | "tool";
	category: "Triggers" | "Actions";
	label: string; // display label
	description: string;
	icon?: any;
	data: INodeData;
	
}
