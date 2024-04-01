import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface isNaviOpen {
	naviOpen: boolean;
	openPath: string;
	setNaviOpen: (select: boolean) => void;
	setOpenPath: (path: string) => void;
}

export const useNaviOpen = create(
	persist<isNaviOpen>(
		(set) => ({
			naviOpen: true,
			openPath: 'main',
			setNaviOpen: (select) => set((state) => ({ ...state, naviOpen: select })),
			setOpenPath: (path) => set((state) => ({ ...state, openPath: path })),
		}),
		{
			name: 'naviOpenStorage',
		},
	),
);
