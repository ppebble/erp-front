import { create } from 'zustand';
import { newsType } from '../network/response/boardParams';

interface ModalStore {
	type: string;
	setType: (state: string) => void;
	news: newsType[];
	setNews: (state: newsType[]) => void;
}

const useBoard = create<ModalStore>()((set) => ({
	type: '',
	setType: (select) => set((state) => ({ ...state, type: select })),
	news: [],
	setNews: (select) => set((state) => ({ ...state, news: select })),
}));

export default useBoard;
