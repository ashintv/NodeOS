import { BaseNode, BaseNodeFooter, BaseNodeHeader } from "@/components/base-node";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Settings, Globe } from "lucide-react";
import type { NodeData } from "../types";
import { DeleteNode } from "../deleteNode";
import { Button } from "@/components/ui/button";

export function CallApi({ id, data }: NodeProps<NodeData>) {
	return (
		<BaseNode className="rounded-3xl flex flex-col items-center justify-center border shadow-md">
			<Handle position={Position.Top} type="target" />
			<BaseNodeHeader className="text-sm text-chart-2">
				<Globe className="size-4" /> HTTP
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


