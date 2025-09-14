import { memo } from "react";
import { Button } from "@/components/ui/button";
import { BaseNode, BaseNodeContent, BaseNodeFooter, BaseNodeHeader, BaseNodeHeaderTitle } from "@/components/base-node";
import { Handle, Position, type NodeProps } from "@xyflow/react";

export const TriggerNode = memo(({ data }: NodeProps) => {
	return (
		<BaseNode className="w-76">
			<Handle position={Position.Right} type="source" />
			<BaseNodeHeader>
				<BaseNodeHeaderTitle>Webhook Trigger</BaseNodeHeaderTitle>
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
