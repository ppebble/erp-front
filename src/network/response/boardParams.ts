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
