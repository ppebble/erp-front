export interface boardType {
	boardNo: number;
	name: string;
	authority: number;
	title: string;
	body: string;
	createDate: string;
	modifyDate: string;
	newsNo: number;
}

export interface boardViewType {
	postNo: number;
	name: string;
	title: string;
	body: string;
	createDate: string;
}

export const newsArray = [
	{ boardNo: 1, name: 'user1', authority: 0, title: '제목1', body: '내용1', createDate: '2024-05-21', modifyDate: '2024-05-21', newsNo: 1 },
	{ boardNo: 2, name: 'user2', authority: 0, title: '제목2', body: '내용2', createDate: '2024-05-21', modifyDate: '2024-05-21', newsNo: 2 },
	{ boardNo: 3, name: 'user3', authority: 0, title: '제목3', body: '내용3', createDate: '2024-05-21', modifyDate: '2024-05-21', newsNo: 3 },
];
