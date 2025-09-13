
type tools = "callApi" | "codeRun";

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

export interface AINode {
	credential: string; // mongo db id for credentials
	tools: Partial<Record<tools, (FetchAPi | CodeRun)[]>>; // key is the tool name, value is the tool details
	prompt: string; // decribe the job of ai
	temperature?: number; // temperature for ai model
}

