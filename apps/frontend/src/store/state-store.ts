import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CurrentGraphState {
	CurrentId: string;
	setCurrentId: (id: string) => void;
	CurrentTitle: string;
	setCurrentTitle: (title: string) => void;
}

export const useCurrentGraphStateStore = create<CurrentGraphState>()(
	persist(
		(set) => ({
			CurrentId: "",
			setCurrentId: (id) => set({ CurrentId: id }),
			CurrentTitle: "New WorkFlow",
			setCurrentTitle: (title) => set({ CurrentTitle: title }),
		}),
		{
			name: "current-store",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
