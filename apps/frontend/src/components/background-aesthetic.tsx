import type { ReactNode } from "react";

interface BackgroundAestheticProps {
	children: ReactNode;
}

export function BackgroundAesthetic({ children }: BackgroundAestheticProps) {
	return (
		<div className="bg-aesthetic">
			{/* Animated background elements */}
			<div className="absolute inset-0">
				{/* Primary gradient overlay */}
				<div className="bg-aesthetic-overlay" />

				{/* Floating geometric shapes */}
				<div className="bg-aesthetic-shape-1" />
				<div className="bg-aesthetic-shape-2" />
				<div className="bg-aesthetic-shape-3" />

				{/* Grid pattern overlay */}
				<div className="bg-aesthetic-grid" />

				{/* Subtle noise texture */}
				<div className="bg-aesthetic-noise" />
			</div>

			{/* Content area */}
			<div className="bg-aesthetic-content">{children}</div>
		</div>
	);
}
