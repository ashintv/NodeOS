import { cn } from "@/lib/utils";

interface SectionHeaderProps {
	title: string;
	icon?: React.ReactNode;
	subtitle?: string;
	children?: React.ReactNode;
	className?: string;
}

export function SectionHeader({ title, icon, subtitle, children, className }: SectionHeaderProps) {
	return (
		<div className={cn("flex items-center justify-between gap-2", className)}>
			<div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
				<span className="hidden sm:inline-flex">{icon}</span>
				<div className="min-w-0">
					<h3 className="text-sm sm:text-base lg:text-lg font-semibold truncate">{title}</h3>
					{subtitle && <p className="text-xs sm:text-sm text-muted-foreground truncate">{subtitle}</p>}
				</div>
			</div>
			<div className="flex-shrink-0">{children}</div>
		</div>
	);
}
