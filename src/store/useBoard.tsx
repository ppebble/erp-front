import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { boardDetailType, boardType, boardViewType, newBoardType } from '../network/response/boardParams';

interface BoardStore {
	type: string;
	setType: (state: string) => void;
	newBoard: newBoardType;
	setNewBoard: (state: newBoardType) => void;
	board: boardType[];
	setBoard: (state: boardType[]) => void;
	boardIndex: number;
	setBoardIndex: (state: number) => void;
	detail: boardDetailType;
	setDetail: (state: boardDetailType) => void;
	title: string;
	setTitle: (state: string) => void;
	setClearBoardIndex: () => void;
	setClear: () => void;
}

const useBoard = create(
	persist<BoardStore>(
		(set) => ({
			type: 'notice',
			setType: (select) => set((state) => ({ ...state, type: select })),
			newBoard: { profileNo: 0, authority: 0, title: '', body: '' },
			setNewBoard: (select) => set((state) => ({ ...state, newBoard: select })),
			board: [],
			setBoard: (select) => set((state) => ({ ...state, board: select })),
			boardIndex: 0,
			setBoardIndex: (select) => set((state) => ({ ...state, boardIndex: select })),
			detail: {
				boardVo: {
					postNo: 0,
					boardNo: 0,
					profileNo: 0,
					authority: 0,
					name: '',
					title: '',
					body: '',
					createDate: '',
					modifyDate: '',
				},
				uploadFiles: [],
				reply: [],
			},
			setDetail: (select) => set((state) => ({ ...state, detail: select })),
			title: '공지사항',
			setTitle: (select) => set((state) => ({ ...state, title: select })),
			setClearBoardIndex: () => set(() => ({ boardIndex: 0 })),
			setClear: () =>
				set(() => ({
					detail: {
						boardVo: {
							postNo: 0,
							boardNo: 0,
							profileNo: 0,
							authority: 0,
							name: '',
							title: '',
							body: '',
							createDate: '',
							modifyDate: '',
						},
						uploadFiles: [],
						reply: [],
					},
				})),
		}),
		{
			name: 'ProjectStorage',
		},
	),
);

export default useBoard;
