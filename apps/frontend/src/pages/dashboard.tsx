import { useState } from "react";
import { BackgroundAesthetic } from "@/components/background-aesthetic";
import { Sidebar } from "@/components/sidebar";
import { OptionsButton } from "@/components/options-button";
import { WorkflowChart } from "@/components/workflow-chart-new";
import { CredentialsForm } from "@/components/credentials-form";
import { ReactFlowProvider } from "@xyflow/react";

export default function Dashboard() {
	const [currentView, setCurrentView] = useState<"chart" | "credentials">("chart");

	const handleViewChange = (view: "chart" | "credentials") => {
		setCurrentView(view);
	};

	const renderMainContent = () => {
		switch (currentView) {
			case "chart":
				return <WorkflowChart />;
			case "credentials":
				return <CredentialsForm />;
			default:
				return <WorkflowChart />;
		}
	};

	return (
		<ReactFlowProvider>
			<BackgroundAesthetic>
				<div className="h-screen flex overflow-hidden">
					{/* Sidebar */}
					<Sidebar onViewChange={handleViewChange} currentView={currentView} />

					{/* Main Content Area */}
					<div className="flex-1 flex flex-col min-w-0 relative border-l border-border">
						{/* Options Button */}
						<div className="absolute top-4 right-4 z-50">
							<OptionsButton onViewChange={handleViewChange} currentView={currentView} />
						</div>

						{/* Content */}
						<div className="flex-1 overflow-hidden bg-background/50">{renderMainContent()}</div>
					</div>
				</div>
			</BackgroundAesthetic>
		</ReactFlowProvider>
	);
}
