export interface project {
	projectNo: number;
	field: string;
	projectName: string;
	managerNo: number;
	manager: string;
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

export interface businessList {
	businessNo: number;
	businessName: string;
	department: string;
	participationType: string;
	startDate: string;
	endDate: string;
	cost: number;
	register: string;
	authority: number;
	createDate: string;
	modifyDate: string;
}

export interface businessDetailParams {
	detail: detail;
	member: member[];
}

export interface detail {
	info: info;
	cost: cost;
	institution: institution;
}

export interface info {
	businessNo: number;
	businessName: string;
	participationType: string;
	department: string;
	startDate: string;
	endDate: string;
	register: string;
	authority: number;
	createDate: string;
	modifyDate: string;
	isDel: number;
}

export interface cost {
	costNo: number;
	businessNo: number;
	fundingCost: number;
	privateCost: number;
	privateGoods: number;
	etcCost: number;
}

export interface institution {
	insNo: number;
	businessNo: number;
	proResearchIns: string;
	proResearchName: string;
	proResearchNo: string;
	headResearchIns: string;
	headResearchName: string;
	headResearchNo: string;
	jointResearchIns: string;
	jointResearchName: string;
	jointResearchNo: string;
	detailName: string;
	detailNo: string;
}

export interface member {
	memberNo: number;
	businessNo: number;
	profileNo: number;
	empNo: string;
	role: string;
	status: number;
	participation: number;
	startDate: string;
	endDate: string;
	note: string;
}
