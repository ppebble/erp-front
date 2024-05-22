import { create } from 'zustand';

type modalProps = {
	type: number;
	contents?: any;
	color?: string;
	closeOnOverlay?: boolean;
	okClick?: () => void;
	updataClick?: (update: any) => void;
	deleteClick?: () => void;
};

interface ModalStore {
	open: boolean;
	type: number;
	contents: any;
	color: string;
	closeOnOverlay: boolean;
	okClick: () => void;
	updataClick: (update: any) => void;
	deleteClick: () => void;
	openModal: (select: modalProps) => void;
	closeModal: () => void;
}

const useModal = create<ModalStore>()((set) => ({
	open: false,
	type: 0,
	contents: null,
	color: '',
	closeOnOverlay: true,
	okClick: () => {},
	updataClick: () => {},
	deleteClick: () => {},
	openModal: (select) =>
		set((state) => ({
			...state,
			open: true,
			type: select.type,
			contents: select.contents,
			color: select?.color,
			closeOnOverlay: select.closeOnOverlay,
			okClick: select.okClick,
			updataClick: select.updataClick,
			deleteClick: select.deleteClick,
		})),
	closeModal: () =>
		set(() => ({ open: false, type: 0, contents: null, closeOnOverlay: true, okClick: () => {}, updataClick: () => {}, deleteClick: () => {} })),
}));

export default useModal;
