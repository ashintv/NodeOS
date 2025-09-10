import { useState } from "react";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";
import { Play, Square, Settings } from "lucide-react";
import { GraphChart } from "./chart";
import { AddNodeSelector } from "./add-node-selector";

export function WorkflowChart() {
	const [isRunning, setIsRunning] = useState(false);

	const toggleWorkflow = () => {
		setIsRunning(!isRunning);
	};

	return (
		<div className="h-full flex flex-col">
			{/* Header */}
			<div className="p-4 border-b border-border">
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-xl font-bold text-foreground">Workflow Builder</h2>
						<p className="text-muted-foreground text-sm">Design and execute your automation workflows</p>
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

			{/* Status Bar */}
			<div className="p-3 border-t border-border bg-muted">
				<div className="flex items-center justify-between text-sm">
					<div className="flex items-center space-x-4 text-muted-foreground"></div>
					<div className="flex items-center space-x-2">
						<div className={`w-2 h-2 rounded-full ${isRunning ? "bg-chart-2" : "bg-muted-foreground"} animate-pulse`} />
						<span className="text-muted-foreground">{isRunning ? "Running" : "Stopped"}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
