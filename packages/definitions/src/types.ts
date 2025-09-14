type tools = "callApi" | "codeRun";
export type NodeData = GmailACtionData | TelegramActionData | AiActionData | WebTrigger;

interface WebTrigger {
	type: "ACTION";
	description: string;
	node_: TriggerNode;
}

interface GmailACtionData {
	type: "ACTION";
	Action: "GMAIL";
	description: string;
	node_: GmailNode;
}
interface TelegramActionData {
	type: "ACTION";
	Action: "TELEGRAM";
	description: string;
	node_: TelegramNode;
}

interface AiActionData {
	type: "ACTION";
	Action: "AINode";
	description: string;
	node_: AINode;
}

interface GmailNode {
	credential:string
	message:string
}

interface TriggerNode {
	type:"TRIGGER"
	workflowId:string
}


export interface AINode {
	credential: string; // mongo db id for credentials
	tools: Partial<Record<tools, (FetchAPi | CodeRun)[]>>; // key is the tool name, value is the tool details
	prompt: string; // decribe the job of ai
	temperature?: number; // temperature for ai model
}

export interface TelegramNode {
	credential: string;
	message: string;
}

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
