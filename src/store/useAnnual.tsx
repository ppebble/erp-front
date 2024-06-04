import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type ManagerProps = {
	profileNo: number;
	name: string;
};

export type AnnualInfo = {
	empNo: string;
	name: string;
	annualType: number;
	annualDay: number;
	january: number;
	febuary: number;
	march: number;
	april: number;
	may: number;
	june: number;
	july: number;
	august: number;
	september: number;
	october: number;
	november: number;
	december: number;
	remainDay: number;
};
export type AnnReqProps = {
	historyNo: number;
	start: string;
	end: string;
	note: string;
	deny: any;
};
type ActionItem = {
	setPersonalAnnual: (annual: AnnualInfo[]) => void | null;
	setPersonalAnnualClear: () => void | null;
	setAnnualRequest: (req: AnnReqProps[]) => void | null;
	setClearAnnReq: () => void | null;
	setManagerList: (manager: ManagerProps[]) => void | null;
	setManagerListClear: () => void | null;
};

interface AnnualStore {
	personalAnnual: AnnualInfo[];
	annualRequest: AnnReqProps[];
	managerList: ManagerProps[];
	action: ActionItem;
}

const useAnnual = create<AnnualStore>()(
	devtools((set, get) => ({
		personalAnnual: [] as AnnualInfo[],
		annualRequest: [] as AnnReqProps[],
		managerList: [] as ManagerProps[],
		action: {
			setPersonalAnnual: (annual: AnnualInfo[]) =>
				set(
					{
						personalAnnual: annual,
					},
					false,
					'PERSONAL_ANNUAL',
				),
			setPersonalAnnualClear: () =>
				set(
					{
						personalAnnual: [] as AnnualInfo[],
					},
					false,
					'CLEAR_PERSONAL_ANNUAL',
				),
			setAnnualRequest: (req: AnnReqProps[]) =>
				set(
					{
						annualRequest: req,
					},
					false,
					'PERSONAL_ANNUAL_REQUEST',
				),
			setClearAnnReq: () =>
				set(
					{
						annualRequest: [] as AnnReqProps[],
					},
					false,
					'CLEAR_PERSONAL_ANNUAL_REQUEST',
				),
			setManagerList: (manager: ManagerProps[]) =>
				set(
					{
						managerList: manager,
					},
					false,
					'MANAGER_LIST',
				),
			setManagerListClear: () =>
				set(
					{
						managerList: [] as ManagerProps[],
					},
					false,
					'CLEAR_MANAGER_LIST',
				),
		},
	})),
);
export const usePersonalAnnual = () => useAnnual((state) => state.personalAnnual);
export const useAnnualAction = () => useAnnual((state) => state.action);
export const useAnnRequest = () => useAnnual((state) => state.annualRequest);
export const useManagerList = () => useAnnual((state) => state.managerList);
export default useAnnual;
