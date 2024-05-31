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
	isDel: number;
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
	memberNo: number;
	projectNo: number;
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
