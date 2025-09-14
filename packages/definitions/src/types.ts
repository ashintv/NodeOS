type tools = "callApi" | "codeRun";




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

export type INodeData = {
// node type
	Action: "GMAIL" | "TELEGRAM"
	description: string;
	credential: string;
	message?: string; // prompt 
	tools: Partial<Record<tools, (FetchAPi | CodeRun)[]>>;
	

	// optional for triggers
	// allow future extensible fields
};

export interface INode {
	type: "trigger" | "gmail" | "telegram" | "ai";
	category: "Triggers" | "Actions";
	label: string; // display label
	description: string;
	icon?: any;
	data: INodeData;
	
}
