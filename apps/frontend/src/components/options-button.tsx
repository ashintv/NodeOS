import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Workflow, Key, Settings, User, LogOut, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OptionsButtonProps {
	onViewChange: (view: "chart" | "credentials") => void;
	currentView: "chart" | "credentials";
}

export function OptionsButton({ onViewChange, currentView }: OptionsButtonProps) {
	const navigate = useNavigate();

	const handleLogout = () => {
		// TODO: Clear user session/token
		navigate("/signin");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="bg-sidebar/80 backdrop-blur-sm border border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent">
					<MoreVertical className="h-5 w-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="w-56 bg-popover/95 backdrop-blur-xl border-border text-popover-foreground">
				<div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">Quick Actions</div>
				<DropdownMenuSeparator className="bg-border" />

				<DropdownMenuItem
					onClick={() => onViewChange("chart")}
					className={`cursor-pointer hover:bg-accent focus:bg-accent ${currentView === "chart" ? "bg-accent/50" : ""}`}>
					<Workflow className="h-4 w-4 mr-2" />
					Workflow Chart
					{currentView === "chart" && <div className="ml-auto w-2 h-2 bg-primary rounded-full" />}
				</DropdownMenuItem>

				<DropdownMenuItem
					onClick={() => onViewChange("credentials")}
					className={`cursor-pointer hover:bg-accent focus:bg-accent ${
						currentView === "credentials" ? "bg-accent/50" : ""
					}`}>
					<Key className="h-4 w-4 mr-2" />
					Credentials
					{currentView === "credentials" && <div className="ml-auto w-2 h-2 bg-primary rounded-full" />}
				</DropdownMenuItem>

				<DropdownMenuSeparator className="bg-border" />

				<DropdownMenuItem className="cursor-pointer hover:bg-accent focus:bg-accent">
					<User className="h-4 w-4 mr-2" />
					Profile
				</DropdownMenuItem>

				<DropdownMenuItem className="cursor-pointer hover:bg-accent focus:bg-accent">
					<Settings className="h-4 w-4 mr-2" />
					Settings
				</DropdownMenuItem>

				<DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
					<HelpCircle className="h-4 w-4 mr-2" />
					Help & Support
				</DropdownMenuItem>

				<DropdownMenuSeparator className="bg-white/20" />

				<DropdownMenuItem
					onClick={handleLogout}
					className="cursor-pointer hover:bg-red-500/10 focus:bg-red-500/10 text-red-300">
					<LogOut className="h-4 w-4 mr-2" />
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
