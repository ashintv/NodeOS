import { useState } from "react";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";
import { Play, Square, Settings } from "lucide-react";
import { GraphChart } from "./chart";
import { AddNodeSelector } from "./add-node-selector";
import { useCurrentGraphStateStore } from "@/store/state-store";

export function WorkflowChart() {
	const [isRunning, setIsRunning] = useState(false);

	const toggleWorkflow = () => {
		setIsRunning(!isRunning);
	};
	const title = useCurrentGraphStateStore((state)=>state.CurrentTitle)
	const SetTitle = useCurrentGraphStateStore((state) => state.setCurrentTitle);
	return (
		<div className="h-full flex flex-col">
			{/* Header */}
			<div className="p-4 border-b border-border">
				<div className="flex items-center justify-between">
					<div>
						<input value={title} onChange={(e)=>{
							SetTitle(e.target.value)
						}} className="text-xl font-bold text-foreground focus:outline-1 p-1"></input>
						<p className="text-muted-foreground text-sm">Click above to change tiltle</p>
					</div>
					<div className="flex items-center space-x-2">
						<AddNodeSelector />
						<Button
							onClick={toggleWorkflow}
							size="sm"
							className={`border border-border text-white hover:opacity-90 ${isRunning ? "bg-chart-4" : "bg-chart-2"}`}>
							{isRunning ? (
								<>
									<Square className="h-4 w-4 mr-1" />
									Stop
								</>
							) : (
								<>
									<Play className="h-4 w-4 mr-1" />
									Run
								</>
							)}
						</Button>
						<Button size="sm" variant="ghost" className="text-foreground hover:bg-secondary">
							<Settings className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>

			{/* Workflow Canvas */}
			<div className="flex-1 relative">
				<GraphChart />
			</div>

			
		</div>
	);
}
