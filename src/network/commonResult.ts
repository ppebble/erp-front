export interface commonResult {
	isSuccessful: boolean;
	resultCode: string;
	resultMsg: string;
	dateTime: string;
	result?: any;
}

// TODO 업로드 적용 후 삭제
export interface testParam {
	name: string;
	age: string;
}
