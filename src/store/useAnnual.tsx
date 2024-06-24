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
export type AdminAnnReqProps = {
	totalPages: number;
	totalElements: number;
	totalApproveElements: number;
	currentPage: number;
	pageSize: number;
	items: AnnReqProps[];
};
export type AnnReqProps = {
	approvalNo: number;
	register: string;
	start: string;
	end: string;
	note: string;
	reject?: any;
	approval?: any;
	manageNote?: string;
	signType: number;
};
type ActionItem = {
	setPersonalAnnual: (annual: AnnualInfo[]) => void | null;
	setPersonalAnnualClear: () => void | null;
	setAnnualRequest: (req: AnnReqProps[]) => void | null;
	setClearAnnReq: () => void | null;
	setAdminAnnualRequest: (req: AdminAnnReqProps) => void | null;
	setClearAdminAnnReq: () => void | null;
	setManagerList: (manager: ManagerProps[]) => void | null;
	setManagerListClear: () => void | null;
};

interface AnnualStore {
	personalAnnual: AnnualInfo[];
	annualRequest: AnnReqProps[];
	adminAnnualRequest: AdminAnnReqProps;
	managerList: ManagerProps[];
	action: ActionItem;
}

const useAnnual = create<AnnualStore>()(
	devtools((set, get) => ({
		personalAnnual: [] as AnnualInfo[],
		annualRequest: [] as AnnReqProps[],
		adminAnnualRequest: {} as AdminAnnReqProps,
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
			setAdminAnnualRequest: (req: AdminAnnReqProps) =>
				set(
					{
						adminAnnualRequest: req,
					},
					false,
					'ADMIN_ANNUAL_REQUEST',
				),
			setClearAdminAnnReq: () =>
				set(
					{
						adminAnnualRequest: {} as AdminAnnReqProps,
					},
					false,
					'CLEAR_ADMINL_ANNUAL_REQUEST',
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
export const useAdminAnnRequest = () => useAnnual((state) => state.adminAnnualRequest);
export const useManagerList = () => useAnnual((state) => state.managerList);
export default useAnnual;
