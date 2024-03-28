import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface isNaviOpen {
	naviOpen: boolean;
	setNaviOpen: (select: boolean) => void;
}

export const useNaviOpen = create(
	persist<isNaviOpen>(
		(set) => ({
			naviOpen: true,
			setNaviOpen: (select) => set((state) => ({ ...state, naviOpen: select })),
		}),
		{
			name: 'naviOpenStorage',
		},
	),
);
