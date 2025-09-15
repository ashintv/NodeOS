import { BaseNode, BaseNodeFooter, BaseNodeHeader } from "@/components/base-node";

import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";
import { Settings, Globe } from "lucide-react";
import type { NodeData } from "../types";
import { DeleteNode } from "../deleteNode";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CallApi({ id, data }: NodeProps<NodeData>) {
	const [showForm, setShowForm] = useState(false);

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
						<Button variant={"ghost"} onClick={() => setShowForm(!showForm)}>
							<Settings className="size-4 " />
						</Button>
					</div>
				</div>
			</BaseNodeFooter>
			{showForm && (
				<div className="mt-2 animate-in slide-in-from-top-2 duration-300">
					<CallApiForm data={data} id={id} onClose={() => setShowForm(false)} />
				</div>
			)}
		</BaseNode>
	);
}

function CallApiForm({ data, id, onClose }: { data: any; id: string; onClose: () => void }) {
	const [formData, setFormData] = useState<any>(data || {});
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
						},
					};
				}
				return node;
			})
		);
		console.log("Saving data:", formData);
		onClose();
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
						className="min-h-[80px] w-xs"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-2">URL</label>
					<Input
						value={formData.url || ""}
						onChange={(e) => {
							setFormData((prev: any) => ({ ...prev, url: e.target.value }));
						}}
						placeholder="Enter API URL"
					/>
				</div>
				<Button onClick={handleSave} className="w-full">
					Save
				</Button>
			</div>
		</div>
	);
}
