import { create } from 'zustand';
import { boardType, boardViewType } from '../network/response/boardParams';

interface ModalStore {
	type: string;
	setType: (state: string) => void;
	board: boardType[];
	setBoard: (state: boardType[]) => void;
	boardDetail: boardViewType;
	setBoardDetail: (state: boardViewType) => void;
}

const useBoard = create<ModalStore>()((set) => ({
	type: '',
	setType: (select) => set((state) => ({ ...state, type: select })),
	board: [],
	setBoard: (select) => set((state) => ({ ...state, board: select })),
	boardDetail: { postNo: 0, name: '', title: '', body: '', createDate: '' },
	setBoardDetail: (select) => set((state) => ({ ...state, boardDetail: select })),
}));

export default useBoard;
