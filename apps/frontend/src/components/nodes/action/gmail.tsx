import { memo, useEffect, useState } from "react";

import { BaseNode, BaseNodeContent, BaseNodeFooter, BaseNodeHeader, BaseNodeHeaderTitle } from "@/components/base-node";
import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";
import { Textarea } from "@/components/ui/textarea";
import { GmailIcon } from "@/icons/gmail";
import type { NodeData } from "../types";
import { CredentialSelector } from "../credential-selector";
import { DeleteNode } from "../deleteNode";

export const GmailNode = memo(({ data, id }: NodeProps<NodeData>) => {
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
			<BaseNodeHeader>
				<GmailIcon className="size-5" />
				<BaseNodeHeaderTitle>Send a mail</BaseNodeHeaderTitle>
				<DeleteNode id={id} />
			</BaseNodeHeader>
			<BaseNodeContent className="flex gap-2">
				<Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter your message" />
			</BaseNodeContent>
			<BaseNodeFooter>
				<CredentialSelector
					value={credential}
					platform="Gmail"
					onChange={(value) => {
						setCredential(value);
					}}
				/>
			</BaseNodeFooter>
		</BaseNode>
	);
});
