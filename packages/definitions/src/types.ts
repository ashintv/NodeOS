export type Tool = {
	name: string;
	type: "callApi";
	url?: string;
	desc: string;
};

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
	Action: "GMAIL" | "TELEGRAM" | "AI" | "TOOL";
	description: string;
	credential: string;
	message?: string; // prompt

	// optional for triggers
	// allow future extensible fields
};

export interface INode {
	type: "trigger" | "gmail" | "telegram" | "ai" | "tool";
	category: "Triggers" | "Actions";
	label: string; // display label
	description: string;
	icon?: any;
	data: any;
}

export type Noderesponse = {
	status: "succes" | "fail";
	node: string;
	message?: string;
	data:any
};


/**
 * providing a global types to job for better type checking
 */
export type TODO = any
export type NodeTypes = "GMAIL" | "TELEGRAM" | "AI" | "TOOL";
export type Job = {
	id: string;
	type: NodeTypes;
	creadential: TODO
	payload: TODO
	status: "pending" | "in_progress" | "completed" | "failed";
	result: TODO;
}

export type JobNotification = {
	id: string;
	status: "pending" | "in_progress" | "completed" | "failed";
	result?: TODO;
}
