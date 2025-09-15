import { memo } from "react";
import { Button } from "@/components/ui/button";
import { BaseNode, BaseNodeContent, BaseNodeFooter, BaseNodeHeader, BaseNodeHeaderTitle } from "@/components/base-node";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { DeleteNode } from "../deleteNode";

export const TriggerNode = memo(({ data , id}: NodeProps) => {
	console.log("Trigger node data:", data);
	return (
		<BaseNode className="w-76">
			<Handle position={Position.Right} type="source" />
			<BaseNodeHeader>
				<BaseNodeHeaderTitle>Webhook Trigger</BaseNodeHeaderTitle>
				<DeleteNode id={id} />
			</BaseNodeHeader>
			<BaseNodeContent className="">
				<div className="flex gap-2 w-full justify-end">
					<Button className="">Copy</Button>
					<Button className="">Run</Button>
				</div>
			</BaseNodeContent>
			<BaseNodeFooter></BaseNodeFooter>
		</BaseNode>
	);
});
