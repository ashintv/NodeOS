import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu, Workflow, Key, Sun, Moon, FileText } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import axios from "axios";
import { BASE_URL } from "@/config";
import { useCurrentGraphStateStore } from "@/store/state-store";
import type { Workflow as WorkFlowType } from "@repo/definitions/schema";

interface SidebarProps {
	onViewChange: (view: "chart" | "credentials") => void;
	currentView: "chart" | "credentials";
}

export function Sidebar({ onViewChange, currentView }: SidebarProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [workflows, setWorkflows] = useState([]);
	async function fetchWorkflows() {
		try {
			const response = await axios.get(BASE_URL + "/workflow", {
				headers: {
					token: localStorage.getItem("token"),
				},
			});
			setWorkflows(response.data.workflows);
		} catch (e) {
			console.log(e);
		}
	}
	useEffect(() => {
		fetchWorkflows();
	}, []);
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
				<SheetContent side="left" className="w-80  backdrop-blur-xl border-border">
					<div className="relative z-10 h-full">
						<SidebarContent
							menuItems={menuItems}
							workflows={workflows}
							onViewChange={onViewChange}
							currentView={currentView}
							onItemClick={() => setIsOpen(false)}
						/>
					</div>
				</SheetContent>
			</Sheet>

			<div className="hidden lg:flex w-80  backdrop-blur-xl border-r border-border h-full relative overflow-hidden">
				<div className="relative z-10 w-full">
					<SidebarContent
						menuItems={menuItems}
						workflows={workflows}
						onViewChange={onViewChange}
						currentView={currentView}
					/>
				</div>
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
	workflows: any[];
	onViewChange: (view: "chart" | "credentials") => void;
	currentView: "chart" | "credentials";
	onItemClick?: () => void;
}

function SidebarContent({ menuItems, workflows, onViewChange, currentView, onItemClick }: SidebarContentProps) {
	const { theme, toggleTheme } = useTheme();
	const selected = useCurrentGraphStateStore((state) => state.CurrentId);

	return (
		<div className="flex flex-col w-full p-6">
			{/* Logo Area */}
			<div className="mb-8">
				<div className="flex items-center space-x-3">
					<div className="bg-gradient-to-r from-primary to-chart-5 p-2 rounded-lg">
						<Workflow className="h-6 w-6 text-primary-foreground" />
					</div>
					<div>
						<h2 className="text-foreground font-bold text-lg">x4x</h2>
						<p className="text-muted-foreground text-sm">Workflows</p>
					</div>
				</div>
			</div>

			{/* Theme Toggle */}
			<div className="mb-6">
				<Button
					onClick={toggleTheme}
					variant="outline"
					size="sm"
					className="w-full flex items-center space-x-2 bg-secondary border border-border text-secondary-foreground hover:bg-secondary/80">
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
									? "bg-secondary border border-border text-foreground shadow-sm"
									: "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
							}`}>
							<Icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
							<div className="flex-1 text-left">
								<div className="font-medium">{item.label}</div>
								<div className="text-xs text-muted-foreground">{item.description}</div>
							</div>
							{isActive && <div className="w-2 h-2 bg-primary rounded-full" />}
						</button>
					);
				})}
			</div>
			<Separator className="bg-border mb-6" />
			{/* Additional Features */}
			<div className="space-y-2 mb-6">
				<h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-3">WorkFlows</h3>
				<div className="h-70 overflow-scroll">
					{workflows.map((item, index) => {
						return <WorkflowItem key={index} title={item.title} isSelected={selected == item._id} id={item._id} />;
					})}
				</div>
			</div>
			<Separator className="bg-border mb-6" />
			{/* Status */}
			<div
				className="mt-auto hover:-translate-0.5 hover:cursor-pointer"
				onClick={async () => {
					try {
						const data: WorkFlowType = {
							title: "Untitled Workflow",
							nodes: [],
							connections: [],
							enabled: true,
						};
						const response = await axios.post(BASE_URL + "/workflow", data, {
							headers: {
								token: localStorage.getItem("token"),
							},
						});

						const id = response.data.id;
						useCurrentGraphStateStore.setState({ CurrentId: id });
					} catch (e) {
						console.log(e);
					}
				}}>
				<div className="bg-secondary/50 border border-border rounded-lg p-4">
					<div className="flex items-center space-x-2 mb-2">
						<div className="w-2 h-2 bg-chart-2 rounded-full animate-pulse" />
						<span className="text-foreground text-sm font-medium">Add a workflow</span>
					</div>
					<p className="text-muted-foreground text-xs">create a new workflow</p>
				</div>
			</div>
		</div>
	);
}

const WorkflowItem = ({ title, isSelected, id }: { title: string; isSelected: boolean; id: string }) => {
	const setCurrentId = useCurrentGraphStateStore((state) => state.setCurrentId);
	const setCurrentTitle = useCurrentGraphStateStore((state) => state.setCurrentTitle);
	return (
		<button
			onClick={() => {
				setCurrentId(id);
				setCurrentTitle(title);
			}}
			className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group hover:bg-secondary/50 ${
				isSelected
					? "bg-primary/10 border border-primary/20 text-primary shadow-sm"
					: "text-muted-foreground/80 hover:text-foreground"
			}`}>
			<div
				className={`p-1.5 rounded-md transition-colors ${
					isSelected
						? "bg-primary/20 text-primary"
						: "bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
				}`}>
				<FileText className="h-3.5 w-3.5" />
			</div>
			<div className="flex-1 text-left">
				<span className="font-medium text-sm truncate block">{title}</span>
			</div>
			{isSelected && <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />}
		</button>
	);
};
