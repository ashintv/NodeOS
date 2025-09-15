import { BaseNode, BaseNodeFooter, BaseNodeHeader } from "@/components/base-node";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Code, Settings } from "lucide-react";
import { DeleteNode } from "../deleteNode";
import { Button } from "@/components/ui/button";
import type { NodeData } from "../types";


export function CodeRun({ id, data }: NodeProps<NodeData>) {
	return (
		<BaseNode className="rounded-3xl flex flex-col items-center justify-center border shadow-md">
			<Handle position={Position.Top} type="target" />
			<BaseNodeHeader className="text-sm text-chart-5 ">
				<Code className="size-4" /> Code
			</BaseNodeHeader>
			<BaseNodeFooter>
				<div className="flex  justify-between items-center">
					<div className="">
						<DeleteNode id={id} />
					</div>
					<div className="">
						<Button variant={"ghost"}>
							<Settings className="size-4 " />
						</Button>
					</div>
				</div>
			</BaseNodeFooter>
		</BaseNode>
	);
}

// add code for card component (monaco editor card)
