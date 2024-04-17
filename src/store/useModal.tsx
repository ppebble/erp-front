import { create } from 'zustand';

type modalProps = {
	type: number;
	contents?: any;
	closeOnOverlay?: boolean;
	okClick?: () => void;
};

interface ModalStore {
	open: boolean;
	type: number;
	contents: any;
	closeOnOverlay: boolean;
	okClick: () => void;
	openModal: (select: modalProps) => void;
	closeModal: () => void;
}

const useModal = create<ModalStore>()((set) => ({
	open: false,
	type: 0,
	contents: null,
	closeOnOverlay: true,
	okClick: () => {},
	openModal: (select) =>
		set((state) => ({
			...state,
			open: true,
			type: select.type,
			contents: select.contents,
			closeOnOverlay: select.closeOnOverlay,
			okClick: select.okClick,
		})),
	closeModal: () => set(() => ({ open: false, type: 0, contents: null, closeOnOverlay: true, okClick: () => {} })),
}));

export default useModal;
