// 서버에서 받아올 데이터 구조가 정해지기 전에 테스트용도

export interface baseParams {
	key: any;
	value: any;
}

export interface loginResult {
	isSuccessful: boolean;
	resultCode: string;
	resultMsg: string;
	dateTime: string;
	result: {
		accessToken: string;
		refreshToken: string;
	};
}

export interface profileDto {
	profileNo: number;
	empNo: string;
	userId: string;
	userEmail: string;
	pw: string;
	authority: number;
	isDel: false;
	detailNo: number;
	name: string;
	ename: string;
	tel: string;
	address: string;
	residentNumber: string;
	birthday: string;
	family: string;
	deptNo: number;
	task: string;
	team: string;
	position: string;
	rank: string;
	sciTechCertify: string;
	place: string;
	employmentDate: string;
	pEduNo: number;
	highSchool: string;
	collage: string;
	graduateSchool: string;
	armyNo: number;
	armyStart: string;
	armyEnd: string;
	armyBranch: string;
}

export interface career {
	careerNo?: number;
	companyName: string;
	jobClassification: string;
	employmentDate: string;
	resignationDate: string;
}

export interface careerDetail {
	carDetailNo?: number;
	projectName: string;
	projectTask: string;
	projectTerm: string;
}

export interface license {
	licenseNo?: number;
	licenseName: string;
	licenseDate: string;
}

export interface coursework {
	eduNo?: number;
	eduName: string;
	eduStartDate: string;
	eduEndDate: string;
	institutation: string;
}

export interface skill {
	skillNo?: number;
	skilName: string;
	skillGrade: string;
	criteria: string;
}

export interface profile {
	isSuccessful: boolean;
	resultCode: string;
	resultMsg: string;
	dateTime: string;
	result: {
		profileDto: profileDto;
		career: career[];
		careerDetail: careerDetail[];
		license: license[];
		coursework: coursework[];
		skill: skill[];
	};
}
