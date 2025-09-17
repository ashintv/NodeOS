import { BaseNode, BaseNodeFooter, BaseNodeHeader } from "@/components/base-node";
import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";
import { Code, Settings } from "lucide-react";
import { DeleteNode } from "../deleteNode";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import type { NodeData } from "../types";

export function CodeRun({ id, data }: NodeProps<NodeData>) {
	const [showForm, setShowForm] = useState(false);

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
						<Button variant={"ghost"} onClick={() => setShowForm(!showForm)}>
							<Settings className="size-4 " />
						</Button>
					</div>
				</div>
			</BaseNodeFooter>
			{showForm && (
				<div className="mt-2 animate-in slide-in-from-top-2 duration-300">
					<CodeRunForm data={data} id={id} onClose={() => setShowForm(false)} />
				</div>
			)}
		</BaseNode>
	);
}

function CodeRunForm({ data, id, onClose }: { data: any; id: string; onClose: () => void }) {
	const [formData, setFormData] = useState<any>(data || {});
	const [language, setLanguage] = useState<string>(data?.language || "javascript");
	const { setNodes } = useReactFlow();

	const handleSave = () => {
		setNodes((nds) =>
			nds.map((node) => {
				if (node.id === id) {
					return {
						...node,
						data: {
							...node.data,
							...formData,
							language, 
						},
					};
				}
				return node;
			})
		);
		console.log("Saving code data:", { ...formData, language });
		onClose();
	};

	const getDefaultCode = (lang: string) => {
		switch (lang) {
			case "python":
				return "# Write your Python code here\nprint('Hello World!')";
			case "javascript":
				return "// Write your JavaScript code here\nconsole.log('Hello World!');";
			case "typescript":
				return "// Write your TypeScript code here\nconsole.log('Hello World!');";
			default:
				return "// Write your code here\nconsole.log('Hello World!');";
		}
	};

	return (
		<div className="p-4 border rounded-lg shadow-lg transform transition-all duration-300 ease-out animate-in zoom-in-95">
			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium mb-2">Description</label>
					<Textarea
						value={formData.desc || ""}
						onChange={(e) => {
							setFormData((prev: any) => ({ ...prev, desc: e.target.value }));
						}}
						placeholder="Enter description"
						className="min-h-[60px] w-full"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-2">Language</label>
					<Select
						value={language}
						onValueChange={(value) => {
							setLanguage(value);
							// Update the code template when language changes
							if (!formData.code || formData.code === getDefaultCode(language)) {
								setFormData((prev: any) => ({ ...prev, code: getDefaultCode(value) }));
							}
						}}>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select language" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="javascript">JavaScript</SelectItem>
							<SelectItem value="python">Python</SelectItem>
							<SelectItem value="typescript">TypeScript</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<label className="block text-sm font-medium mb-2">Code</label>
					<div className="border rounded-md overflow-hidden">
						<Editor
							height="400px"
							width="400px"
							theme="vs-dark"
							language={language}
							value={formData.code || getDefaultCode(language)}
							onChange={(value) => {
								setFormData((prev: any) => ({ ...prev, code: value }));
							}}
							options={{
								minimap: { enabled: false },
								fontSize: 14,
								lineNumbers: "on",
								scrollBeyondLastLine: false,
								automaticLayout: true,
							}}
						/>
					</div>
				</div>
				<Button onClick={handleSave} className="w-full">
					Save
				</Button>
			</div>
		</div>
	);
}


