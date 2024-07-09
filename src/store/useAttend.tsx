import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AttendInfo } from '../services/attendService';

type ActionItem = {
	setWeekAttend: (att: AttendInfo[]) => void | null;
	setWeekAttendClear: () => void | null;
	setMonthAttend: (att: AttendInfo[]) => void | null;
	setMonthAttendClear: () => void | null;
};

interface AnnualStore {
	weekAttend: AttendInfo[];
	monthAttend: AttendInfo[];
	action: ActionItem;
}

const useAttend = create<AnnualStore>()(
	devtools((set, get) => ({
		weekAttend: [] as AttendInfo[],
		monthAttend: [] as AttendInfo[],
		action: {
			setWeekAttend: (annual: AttendInfo[]) =>
				set(
					{
						weekAttend: annual,
					},
					false,
					'PERSONAL_ANNUAL',
				),
			setWeekAttendClear: () =>
				set(
					{
						weekAttend: [] as AttendInfo[],
					},
					false,
					'CLEAR_PERSONAL_ANNUAL',
				),
			setMonthAttend: (req: AttendInfo[]) =>
				set(
					{
						monthAttend: req,
					},
					false,
					'PERSONAL_ANNUAL_REQUEST',
				),
			setMonthAttendClear: () =>
				set(
					{
						monthAttend: [] as AttendInfo[],
					},
					false,
					'CLEAR_PERSONAL_ANNUAL_REQUEST',
				),
		},
	})),
);
export const useWeekAttend = () => useAttend((state) => state.weekAttend);
export const useAttendAction = () => useAttend((state) => state.action);
export const useMonthAttend = () => useAttend((state) => state.monthAttend);
export default useAttend;
