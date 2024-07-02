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
