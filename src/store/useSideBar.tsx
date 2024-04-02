import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import routes from '../routes';

interface SideBarState {
	isSideBar: boolean;
	currentPath?: RoutesType;
	currentChildPath?: RoutesType;
	// currentPath: string;
	setSideBar: (select: boolean) => void;
	// setCurrentPath: (path: string) => void;
	setCurrentPath: (path: RoutesType | undefined) => void;
	setCurrentChildPath: (path: RoutesType | undefined) => void;
	setClear: () => void;
}

export const useSideBar = create(
	devtools(
		persist<SideBarState>(
			(set) => ({
				isSideBar: true,
				currentPath: routes.find((e) => e.path === 'main'),
				currentChildPath: undefined,
				setSideBar: (select) => set((state) => ({ ...state, isSideBar: select })),
				setCurrentPath: (path) => set((state) => ({ ...state, currentPath: path })),
				setCurrentChildPath: (path) => set((state) => ({ ...state, currentChildPath: path })),

				setClear: () =>
					set({
						isSideBar: true,
						currentPath: routes.find((e) => e.path === 'main'),
					}),
			}),
			{
				name: 'SideBarStorage',
				storage: createJSONStorage(() => sessionStorage), // 세션스토리지로 생성
			},
		),
	),
);
