import type { Job, TODO } from "@repo/definitions/types";

class AI {
  private providor: string;
  private apiKey: string;
  private model: string;
  private tools: TODO[] = [];
  private agent: TODO | null = null;
  constructor(providor: string, apiKey: string, model: string) {
    this.providor = providor;
    this.apiKey = apiKey;
    this.model = model;
    this.setAgent();
  }
  addTool(tools: TODO[]) {
    this.tools = this.tools.concat(tools);
  }
  async execute(userPrompt: string, tools: TODO[]): Promise<TODO> {
    console.log(`Executing AI job with providor: ${this.providor}, model: ${this.model}`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { Message: `Response from ${this.providor} with model ${this.model}` } as TODO;
  }

  private setAgent() {
    // based on providor return the agent instnce\
  }
}



