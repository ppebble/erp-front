export interface project {
	projectNo: number;
	field: string;
	projectName: string;
	managerNo: number;
	status: string;
	step: string;
	client: string;
	partner: string;
	startDate: string;
	endDate: string;
}

export interface projectDetail {
	detailNo: number;
	projectNo: number;
	projectUrl: string;
	vcs: string;
	os: string;
	webServer: string;
	was: string;
	db: string;
	equipment: string;
	module: string;
	libs: string;
	tech: string;
	tool: string;
	note: string;
}

export interface projectMember {
	id: number;
	profileNo: number;
	member: string;
	role: string;
	task: string;
}

export interface projectOutput {
	outputNo: number;
	projectNo: number;
	fileNo: number;
	fileName: string;
}

export interface projectFile {
	data: File;
	id: number;
}

export interface projectDetailParams {
	project: project;
	projectDetail: projectDetail;
	projectMember: projectMember[];
	projectOutput: projectOutput[];
}

export interface partnerType {
	company: string;
	name: string;
	phone: string;
	email: string;
}

export interface memberList {
	profileNo: number;
	name: string;
	team: string;
	empNo: string;
}
