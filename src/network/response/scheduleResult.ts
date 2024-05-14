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
