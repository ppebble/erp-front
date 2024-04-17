import { create } from 'zustand';

type modalProps = {
	type: number;
	contents?: any;
	closeOnOverlay?: boolean;
};

interface ModalStore {
	open: boolean;
	type: number;
	contents: any;
	closeOnOverlay: boolean;
	openModal: (select: modalProps) => void;
	closeModal: () => void;
}

const useModal = create<ModalStore>()((set) => ({
	open: false,
	closeOnOverlay: true,
	contents: null,
	type: 0,
	openModal: (select) =>
		set((state) => ({ ...state, open: true, type: select.type, contents: select.contents, closeOnOverlay: select.closeOnOverlay })),
	closeModal: () => set((state) => ({ ...state, open: false, type: 0, contents: null, closeOnOverlay: true })),
}));

export default useModal;
