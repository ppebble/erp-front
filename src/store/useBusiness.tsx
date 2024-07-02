import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { businessDetailParams, businessList } from '../network/response/businessParams';

interface BusinessStore {
	businessNo: number;
	setBusinessNo: (state: number) => void;
	businessList: businessList[];
	setBusinessList: (state: businessList[]) => void;
	businessDetail: businessDetailParams;
	setBusinessDetail: (state: businessDetailParams) => void;
}

const useBusiness = create(
	persist<BusinessStore>(
		(set) => ({
			businessNo: 0,
			setBusinessNo: (select) => set((state) => ({ ...state, businessNo: select })),
			businessList: [],
			setBusinessList: (select) => set((state) => ({ ...state, businessList: select })),
			businessDetail: {
				detail: {
					info: {
						businessNo: 0,
						businessName: '',
						participationType: '',
						department: '',
						startDate: '',
						endDate: '',
						register: '',
						authority: 0,
						createDate: '',
						modifyDate: '',
						isDel: 0,
					},
					institution: {
						insNo: 0,
						businessNo: 0,
						proResearchIns: '',
						proResearchName: '',
						proResearchNo: '',
						headResearchIns: '',
						headResearchName: '',
						headResearchNo: '',
						jointResearchIns: '',
						jointResearchName: '',
						jointResearchNo: '',
						detailName: '',
						detailNo: '',
					},
					cost: {
						costNo: 0,
						businessNo: 0,
						fundingCost: 0,
						privateCost: 0,
						privateGoods: 0,
						etcCost: 0,
					},
					output: [],
				},
				member: [],
			},
			setBusinessDetail: (select) => set((state) => ({ ...state, businessDetail: select })),
		}),
		{
			name: 'BusinessStorage',
		},
	),
);

export default useBusiness;
