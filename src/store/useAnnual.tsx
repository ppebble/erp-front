import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

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
type ActionItem = {
	setPersonalAnnual: (annual: AnnualInfo[]) => void | null;
	setPersonalAnnualClear: () => void | null;
};

interface AnnualStore {
	personalAnnual: AnnualInfo[];
	action: ActionItem;
}

const useAnnual = create<AnnualStore>()(
	devtools((set, get) => ({
		personalAnnual: [] as AnnualInfo[],
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
		},
	})),
);
export const usePersonalAnnual = () => useAnnual((state) => state.personalAnnual);
export const useAnnualAction = () => useAnnual((state) => state.action);
export default useAnnual;
