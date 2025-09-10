import { useState } from "react";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";
import { Plus, Play, Square, Settings } from "lucide-react";
import { GraphChart } from "./chart";

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
						<Button
							size="sm"
							className="bg-secondary border border-border text-secondary-foreground hover:bg-secondary/80">
							<Plus className="h-4 w-4 mr-1" />
							Add Node
						</Button>
						<Button
							onClick={toggleWorkflow}
							size="sm"
							className={`border border-border text-foreground hover:bg-secondary ${
								isRunning ? "bg-red-600/20" : "bg-green-600/20"
							}`}>
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
			<div className="p-3 border-t border-border bg-muted/50 backdrop-blur-sm ">
				<div className="flex items-center justify-between text-sm">
					<div className="flex items-center space-x-4 text-muted-foreground"></div>
					<div className="flex items-center space-x-2">
						<div
							className={`w-2 h-2 rounded-full ${isRunning ? "bg-emerald-500" : "bg-muted-foreground"} animate-pulse`}
						/>
						<span className="text-muted-foreground">{isRunning ? "Running" : "Stopped"}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
