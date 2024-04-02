import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import routes from '../routes';

interface SideBarState {
	isSideBar: boolean;
	currentPath?: RoutesType;
	setSideBar: (select: boolean) => void;
	setCurrentPath: (path: RoutesType | undefined) => void;
	setClear: () => void;
}

export const useSideBar = create(
	devtools(
		persist<SideBarState>(
			(set) => ({
				isSideBar: true,
				currentPath: routes.find((e) => e.path === 'main'),
				setSideBar: (select) => set((state) => ({ ...state, isSideBar: select })),
				setCurrentPath: (path) => set((state) => ({ ...state, currentPath: path })),

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
