import { memo, useEffect, useState } from "react";
import { BaseNode, BaseNodeContent, BaseNodeFooter, BaseNodeHeader, BaseNodeHeaderTitle } from "@/components/base-node";
import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";
import { Textarea } from "@/components/ui/textarea";
import type { NodeData } from "../types";
import { CredentialSelector } from "../credential-selector";
import { DeleteNode } from "../deleteNode";
import { ToolSelector } from "../toolSelctor";

export const AIAgent = memo(({ data, id }: NodeProps<NodeData>) => {
	const { setNodes } = useReactFlow();
	const [credential, setCredential] = useState(data.credential);
	const [message, setMessage] = useState(data.message);
	useEffect(() => {
		setNodes((nds) =>
			nds.map((node) => {
				if (node.id === id) {
					return {
						...node,
						data: {
							...node.data,
							message,
							credential,
						},
					};
				}
				return node;
			})
		);
	}, [message, setNodes, id, credential]);

	return (
		<BaseNode className="w-96">
			<Handle position={Position.Left} type="target" />
			<Handle position={Position.Right} type="source" />

			<div className="absolute -bottom-6 left-0 right-0 flex justify-end items-center px-4">
				<div className="flex flex-col items-center">
					<Handle
						type="source"
						position={Position.Bottom}
						id="bottom-tools"
						style={{ position: "relative", left: 0, transform: "none" }}
					/>
					<span className="text-xs text-gray-500 mt-1">Tools</span>
				</div>
			</div>

			<BaseNodeHeader>
				<BaseNodeHeaderTitle>AI Agent</BaseNodeHeaderTitle>
				<DeleteNode id={id} />
			</BaseNodeHeader>
			<BaseNodeContent className="flex gap-2">
				<Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter your message" />
			</BaseNodeContent>
			<BaseNodeFooter>
				<div className="flex gap-1 justify-between w-full">
					<CredentialSelector
						value={credential}
						platform="Gmail"
						onChange={(value) => {
							setCredential(value);
						}}
					/>
					<ToolSelector id={id}/>
				</div>
			</BaseNodeFooter>
		</BaseNode>
	);
});
