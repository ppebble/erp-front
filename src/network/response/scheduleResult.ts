import { MemberTagInfo } from '../../store/common/useCommon';

export interface scheduleResult {
	scheduleNo: number;
	register?: string;
	task: string;
	title: string;
	eventDesc: string;
	allDay: boolean;
	start: string;
	end: string;
	members: MemberTagInfo[];
}
export interface annualProps {
	sign: string;
	requestDate: string;
	note?: string;
	managerNo: number;
	start: string;
	end: string;
	annType: number;
	signType: number;
}
