import { useReactFlow } from "@xyflow/react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

export function DeleteNode({ id }: { id: string }) {
	const { setNodes } = useReactFlow();
	const handleClick = () => {
		setNodes((nds) => nds.filter((nd) => nd.id !== id));
	};
	return (
		<Button variant={"ghost"}  onClick={handleClick}>
			<Trash2 />
		</Button>
	);
}
