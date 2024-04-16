import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import routes from '../routes';

interface ScrollState {
	isScroll: boolean;
	setScroll: (select: boolean) => void;
	divHeight: number;
	setDivHeight: (select: number) => void;
}

export const useScroll = create(
	devtools(
		persist<ScrollState>(
			(set) => ({
				isScroll: true,
				setScroll: (select) => set((state) => ({ ...state, isScroll: select })),
				divHeight: 0,
				setDivHeight: (select) => set((state) => ({ ...state, divHeight: select })),
			}),
			{
				name: 'ScrollStorage',
				storage: createJSONStorage(() => sessionStorage), // 세션스토리지로 생성
			},
		),
	),
);
