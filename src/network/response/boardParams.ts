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

export interface newBoardType {
	profileNo: number;
	authority: number;
	title: string;
	body: string;
}

export interface boardDetailType {
	boardVo: {
		postNo: number;
		boardNo: number;
		profileNo: number;
		authority: number;
		name: string;
		title: string;
		body: string;
		createDate: string;
		modifyDate: string;
	};
	uploadFiles: any;
	reply: [];
}
