import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useReactFlow } from "@xyflow/react";
import { useEffect, useState } from "react";
import type { ToolsType } from "@repo/definitions/types";

const ToolOptions = [
	{ title: "GET", type: "callApi" },
	{
		title: "Code",
		type: "codeRun",
	},
];
export function ToolSelector({ id }: { id: string }) {
	const [tools, setTools] = useState<ToolsType>({});
	const [selected, setSelected] = useState("");
	const { setNodes, setEdges } = useReactFlow();

	useEffect(() => {
		if (!selected) return;

		let new_tool;
		if (selected === "callApi") {
			new_tool = {
				url: "",
				desc: "API call tool placeholder",
			};
		} else if (selected === "codeRun") {
			new_tool = {
				code: "",
				desc: "Code execution tool placeholder",
				schema: {
					name: "code_executor",
				},
			};
		}

		if (new_tool) {
			const updatedTools = { ...tools };
			if (!updatedTools[selected as keyof ToolsType]) {
				updatedTools[selected as keyof ToolsType] = [];
			}
			updatedTools[selected as keyof ToolsType]!.push(new_tool);
			setTools(updatedTools);
			const toolNodeId = `${selected}_${Date.now()}`;

			
			
			
			setNodes((nds) => {
				const currentNode = nds.find((node) => node.id === id);
				if (!currentNode) return nds;

				const newToolNode = {
					id: toolNodeId,
					type: selected, 
					position: {
						x: currentNode.position.x + 100, 
						y: currentNode.position.y + 200, 
					},
					data: new_tool, 
				};

				return [...nds, newToolNode];
			});

			
			setEdges((edges) => {
				const newEdge = {
					id: `${id}-${toolNodeId}`,
					source: id,
					target: toolNodeId,
					sourceHandle: "bottom-tools", 
					targetHandle: null,
					animated: false,
				};
				return [...edges, newEdge];
			});
		}



		setSelected("");
	}, [selected, tools, setNodes, id]);

	return (
		<div className="space-y-2 w-fit">
			<Select
				value={selected}
				onValueChange={(value) => {
					setSelected(value);
				}}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder={<span>Tools +</span>} />
				</SelectTrigger>

				<SelectContent>
					{ToolOptions.map((tool, index) => (
						<SelectItem key={index} value={tool.type}>
							{tool.title}
							<Plus />
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
