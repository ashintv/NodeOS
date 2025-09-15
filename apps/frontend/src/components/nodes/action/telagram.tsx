import { memo, useEffect, useState } from "react";
import { BaseNode, BaseNodeContent, BaseNodeFooter, BaseNodeHeader, BaseNodeHeaderTitle } from "@/components/base-node";
import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";
import { Textarea } from "@/components/ui/textarea";
import { TelegramIcon } from "@/icons/telegram";
import type { NodeData } from "../types";
import { CredentialSelector } from "../credential-selector";
import { DeleteNode } from "../deleteNode";

export const TelegramNode = memo(({ data, id }: NodeProps<NodeData>) => {
	const [credential, setCredential] = useState(data.credential);
	const { setNodes } = useReactFlow();
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
						},
					};
				}
				return node;
			})
		);
	}, [message, setNodes, id]);
	return (
		<BaseNode className="w-96">
			<Handle position={Position.Left} type="target" />
			<Handle position={Position.Right} type="source" />
			<BaseNodeHeader>
				<TelegramIcon className="size-5" />
				<BaseNodeHeaderTitle>Send a message(bot)</BaseNodeHeaderTitle>
				<DeleteNode id={id} />
			</BaseNodeHeader>
			<BaseNodeContent className="flex gap-2">
				<Textarea
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="enter your message to send"></Textarea>
			</BaseNodeContent>
			<BaseNodeFooter>
				<CredentialSelector platform="Telegram" onChange={setCredential} value={credential} />
			</BaseNodeFooter>
		</BaseNode>
	);
});
