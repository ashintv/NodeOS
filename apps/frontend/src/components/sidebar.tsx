import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu, Workflow, Key, BarChart3, Settings, Users, Database, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

interface SidebarProps {
	onViewChange: (view: "chart" | "credentials") => void;
	currentView: "chart" | "credentials";
}

export function Sidebar({ onViewChange, currentView }: SidebarProps) {
	const [isOpen, setIsOpen] = useState(false);

	const menuItems = [
		{
			id: "chart",
			label: "Workflow Chart",
			icon: Workflow,
			description: "Visual workflow builder",
		},
		{
			id: "credentials",
			label: "Credentials",
			icon: Key,
			description: "Manage API keys and connections",
		},
	];

	const additionalItems = [
		{ label: "Analytics", icon: BarChart3, disabled: true },
		{ label: "Users", icon: Users, disabled: true },
		{ label: "Database", icon: Database, disabled: true },
		{ label: "Settings", icon: Settings, disabled: true },
	];

	return (
		<>
			{/* Mobile Sidebar */}
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="lg:hidden fixed top-4 left-4 z-50 glass-effect text-sidebar-foreground hover:bg-sidebar-accent">
						<Menu className="h-5 w-5" />
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="w-80 bg-aesthetic-sidebar backdrop-blur-xl border-sidebar-border">
					<SidebarContent
						menuItems={menuItems}
						additionalItems={additionalItems}
						onViewChange={onViewChange}
						currentView={currentView}
						onItemClick={() => setIsOpen(false)}
					/>
				</SheetContent>
			</Sheet>

			{/* Desktop Sidebar */}
			<div className="hidden lg:flex w-80 bg-aesthetic-sidebar backdrop-blur-xl border-r border-sidebar-border h-full">
				<SidebarContent
					menuItems={menuItems}
					additionalItems={additionalItems}
					onViewChange={onViewChange}
					currentView={currentView}
				/>
			</div>
		</>
	);
}

interface SidebarContentProps {
	menuItems: Array<{
		id: string;
		label: string;
		icon: any;
		description: string;
	}>;
	additionalItems: Array<{
		label: string;
		icon: any;
		disabled?: boolean;
	}>;
	onViewChange: (view: "chart" | "credentials") => void;
	currentView: "chart" | "credentials";
	onItemClick?: () => void;
}

function SidebarContent({ menuItems, additionalItems, onViewChange, currentView, onItemClick }: SidebarContentProps) {
	const { theme, toggleTheme } = useTheme();

	return (
		<div className="flex flex-col w-full p-6">
			{/* Logo Area */}
			<div className="mb-8">
				<div className="flex items-center space-x-3">
					<div className="bg-gradient-to-r from-primary to-chart-5 p-2 rounded-lg shadow-lg">
						<Workflow className="h-6 w-6 text-primary-foreground" />
					</div>
					<div>
						<h2 className="text-sidebar-foreground font-bold text-lg">NtoX Dashboard</h2>
						<p className="text-muted-foreground text-sm">Workflow Manager</p>
					</div>
				</div>
			</div>

			{/* Theme Toggle */}
			<div className="mb-6">
				<Button
					onClick={toggleTheme}
					variant="outline"
					size="sm"
					className="w-full flex items-center space-x-2 glass-effect hover:bg-sidebar-accent/80 border-sidebar-border/30">
					{theme === "light" ? (
						<>
							<Moon className="h-4 w-4" />
							<span>Dark Mode</span>
						</>
					) : (
						<>
							<Sun className="h-4 w-4" />
							<span>Light Mode</span>
						</>
					)}
				</Button>
			</div>

			{/* Main Navigation */}
			<div className="space-y-2 mb-6">
				<h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-3">Main Features</h3>
				{menuItems.map((item) => {
					const Icon = item.icon;
					const isActive = currentView === item.id;
					return (
						<button
							key={item.id}
							onClick={() => {
								onViewChange(item.id as "chart" | "credentials");
								onItemClick?.();
							}}
							className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
								isActive
									? "glass-effect border border-sidebar-primary/30 text-sidebar-foreground shadow-lg backdrop-blur-sm"
									: "text-muted-foreground hover:glass-effect hover:text-sidebar-foreground hover:shadow-md hover:backdrop-blur-sm"
							}`}>
							<Icon className={`h-5 w-5 ${isActive ? "text-sidebar-primary" : ""}`} />
							<div className="flex-1 text-left">
								<div className="font-medium">{item.label}</div>
								<div className="text-xs text-muted-foreground">{item.description}</div>
							</div>
							{isActive && <div className="w-2 h-2 bg-sidebar-primary rounded-full" />}
						</button>
					);
				})}
			</div>

			<Separator className="bg-sidebar-border/30 mb-6" />

			{/* Additional Features */}
			<div className="space-y-2 mb-6">
				<h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-3">Coming Soon</h3>
				{additionalItems.map((item, index) => {
					const Icon = item.icon;
					return (
						<button
							key={index}
							disabled={item.disabled}
							className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-muted-foreground/60 cursor-not-allowed hover:bg-sidebar-accent/20">
							<Icon className="h-5 w-5" />
							<span className="font-medium">{item.label}</span>
						</button>
					);
				})}
			</div>

			<Separator className="bg-sidebar-border/30 mb-6" />

			{/* Status */}
			<div className="mt-auto">
				<div className="glass-effect rounded-lg p-4 border border-sidebar-border/30">
					<div className="flex items-center space-x-2 mb-2">
						<div className="w-2 h-2 bg-chart-2 rounded-full animate-pulse" />
						<span className="text-sidebar-foreground text-sm font-medium">System Online</span>
					</div>
					<p className="text-muted-foreground text-xs">All systems operational</p>
				</div>
			</div>
		</div>
	);
}
