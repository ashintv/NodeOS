import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface Category {
	id: string;
	name: string;
	icon: React.ReactNode;
}

interface SearchAndFiltersProps {
	searchTerm: string;
	onSearchChange: (value: string) => void;
	selectedCategory: string;
	onCategoryChange: (category: string) => void;
	categories: Category[];
}

export function SearchAndFilters({
	searchTerm,
	onSearchChange,
	selectedCategory,
	onCategoryChange,
	categories,
}: SearchAndFiltersProps) {
	return (
		<div className="space-y-3 sm:space-y-5">
			{/* Search Bar */}
			<div className="relative">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
				<Input
					placeholder="Search nodes by name, description, or tags..."
					value={searchTerm}
					onChange={(e) => onSearchChange(e.target.value)}
					className="pl-10 h-10 sm:h-11 text-sm border-2 focus:border-primary/20"
				/>
			</div>

			{/* Category Filters */}
			<div className="flex flex-wrap gap-1.5 sm:gap-2">
				{categories.map((category) => (
					<Button
						key={category.id}
						variant={selectedCategory === category.id ? "default" : "outline"}
						size="sm"
						onClick={() => onCategoryChange(category.id)}
						className="flex items-center gap-1 sm:gap-2 h-8 sm:h-9 px-2 sm:px-4 text-xs sm:text-sm transition-all duration-200 hover:scale-105">
						<span className="hidden sm:inline">{category.icon}</span>
						<span>{category.name}</span>
					</Button>
				))}
			</div>
		</div>
	);
}
