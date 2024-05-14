export interface profileParams {
	isSuccessful: boolean;
	resultCode: string;
	resultMsg: string;
	dateTime: string;
	result: {
		profile: profile;
		detail: detail;
		dept: dept;
		education: education;
		army: army;
		career: career[];
		license: license[];
		coursework: coursework[];
		skill: skill[];
	};
}

export interface profileResult {
	result: {
		profile: profile;
		detail: detail;
		dept: dept;
		education: education;
		army: army;
		career: career[];
		license: license[];
		coursework: coursework[];
		skill: skill[];
	};
}

export interface profile {
	profileNo: number;
	empNo: string;
	userId: string;
	userEmail: string;
	pw: string;
	rePw: string; // 테스트
	authority: number;
	isDel: false;
}

export interface detail {
	detailNo: number;
	name: string;
	ename: string;
	tel: string;
	address: string;
	residentNumber: string;
	birthday: string;
	family: string;
}

export interface dept {
	deptNo: number;
	task: string;
	team: string;
	position: string;
	rank: string;
	sciTechCertify: string;
	place: string;
	employmentDate: string;
}

export interface education {
	pEduNo: number;
	highSchool: string;
	collage: string;
	graduateSchool: string;
}

export interface army {
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
	careerDetail: careerDetail[];
}

export interface careerDetail {
	id?: number;
	carDetailNo?: number;
	projectName: string;
	task: string;
	term: string;
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
	institution: string;
}

export interface skill {
	skillNo?: number;
	skillName: string;
	skillGrade: string;
	criteria: string;
}
