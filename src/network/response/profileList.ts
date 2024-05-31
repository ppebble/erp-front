export interface profileList {
	profileNo: number;
	empNo: string;
	userId: string;
	userEmail: string;
	name: string;
	tel: string;
	task: string;
	position: string;
	rank: string;
	place: string;
	employmentDate: string;
}

export interface profileSearch {
	option: string;
	input: string;
}

export interface profieRank {
	rank: string;
	count: number;
}
