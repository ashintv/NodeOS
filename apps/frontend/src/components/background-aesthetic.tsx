import type { ReactNode } from "react";

interface BackgroundAestheticProps {
	children: ReactNode;
}

export function BackgroundAesthetic({ children }: BackgroundAestheticProps) {
	return (
		<div className="">
			{/* Content area */}
			<div className="">{children}</div>
		</div>
	);
}
