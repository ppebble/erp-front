import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SideBarState {
	isSideBar: boolean;
	currentPath: string;
	setSideBar: (select: boolean) => void;
	setCurrentPath: (path: string) => void;
	setClear: () => void;
}

export const useSideBar = create(
	persist<SideBarState>(
		(set) => ({
			isSideBar: true,
			currentPath: 'main',
			setSideBar: (select) => set((state) => ({ ...state, isSideBar: select })),
			setCurrentPath: (path) => set((state) => ({ ...state, currentPath: path })),
			setClear: () =>
				set({
					isSideBar: true,
					currentPath: 'main',
				}),
		}),
		{
			name: 'SideBarStorage',
			storage: createJSONStorage(() => sessionStorage), // 세션스토리지로 생성
		},
	),
);
