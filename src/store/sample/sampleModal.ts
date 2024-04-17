import { create } from 'zustand';

type Type = 'test1' | 'test2' | 'test3';
interface ModalState {
	test1: boolean;
	test2: boolean;
	test3: boolean;
	test4: boolean;
	actions: {
		changeModalState: (type: Type) => void;
	};
}

const sampleModalStore = create<ModalState>((set) => ({
	test1: false,
	test2: false,
	test3: false,
	test4: false,
	actions: {
		changeModalState: (type) => {
			set((state) => ({ ...state, [type]: !state[type] }));
		},
	},
}));

export default sampleModalStore;
export const sampleModalTest1 = () => sampleModalStore((state) => state.test1);
export const sampleModalTest2 = () => sampleModalStore((state) => state.test2);
export const sampleModalTest3 = () => sampleModalStore((state) => state.test3);
export const sampleModalTest4 = () => sampleModalStore((state) => state.test4);
