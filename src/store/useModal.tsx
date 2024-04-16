import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export type modalProps = {
	open: boolean;
	contents?: any;
	type: number;
	closeOnOverlay: boolean;
};
type ActionItem = {
	openModal: (modal: modalProps) => void | null;
	closeModal: () => void | null;
};

export interface ModalStore {
	open: boolean;
	contents: any;
	type: number;
	closeOnOverlay: boolean;
	action: ActionItem;
}

const useModal = create<ModalStore>()(
	devtools(
		persist(
			(set) => ({
				open: false,
				contents: null,
				type: 0,
				closeOnOverlay: true,

				action: {
					openModal: (modal: modalProps) =>
						set({
							open: modal.open,
							contents: modal.contents,
							type: modal.type,
							closeOnOverlay: modal.closeOnOverlay,
						}),

					closeModal: () =>
						set({
							open: false,
							contents: null,
							type: 0,
							closeOnOverlay: true,
						}),
				},
			}),
			{
				name: 'modal-store',
				storage: createJSONStorage(() => localStorage),
			},
		),
	),
);
export const useModalAction = () => useModal((state) => state.action);
export default useModal;
