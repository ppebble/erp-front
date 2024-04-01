import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SideBarState {
	isSideBar: boolean;
	currentPath: string;
	setSideBar: (select: boolean) => void;
	setCurrentPath: (path: string) => void;
}

export const useSideBar = create(
	persist<SideBarState>(
		(set) => ({
			isSideBar: true,
			currentPath: 'main',
			setSideBar: (select) => set((state) => ({ ...state, isSideBar: select })),
			setCurrentPath: (path) => set((state) => ({ ...state, currentPath: path })),
		}),
		{
			name: 'SideBarStorage',
		},
	),
);
