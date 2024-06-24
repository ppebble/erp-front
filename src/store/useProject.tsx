import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
	businessDetailParams,
	businessList,
	memberList,
	project,
	projectDetail,
	projectFile,
	projectMember,
	projectOutput,
} from '../network/response/projectParams';

interface ProjectStore {
	projectNo: number;
	setProjectNo: (state: number) => void;
	businessNo: number;
	setBusinessNo: (state: number) => void;
	projectList: project[];
	setProjectList: (state: project[]) => void;
	project: project;
	setProject: (state: project) => void;
	projectDetail: projectDetail;
	setProjectDetail: (state: projectDetail) => void;
	projectMember: projectMember[];
	setProjectMember: (state: projectMember[]) => void;
	projectOutput: any;
	setProjectOutput: (state: any) => void;
	memberList: memberList[];
	setMemberList: (state: memberList[]) => void;
	setClear: () => void;
	setClearDetailNo: () => void;
	businessList: businessList[];
	setBusinessList: (state: businessList[]) => void;
	businessDetail: businessDetailParams;
	setBusinessDetail: (state: businessDetailParams) => void;
}

const useProject = create(
	persist<ProjectStore>(
		(set) => ({
			projectNo: 0,
			setProjectNo: (select) => set((state) => ({ ...state, projectNo: select })),
			businessNo: 0,
			setBusinessNo: (select) => set((state) => ({ ...state, businessNo: select })),
			projectList: [
				{
					projectNo: 0,
					field: '',
					projectName: '',
					managerNo: 0,
					manager: '',
					status: '',
					step: '',
					client: '',
					partner: '',
					startDate: '',
					endDate: '',
				},
			],
			setProjectList: (select) => set((state) => ({ ...state, projectList: select })),
			project: {
				projectNo: 0,
				field: '',
				projectName: '',
				managerNo: 0,
				manager: '',
				status: '',
				step: '',
				client: '',
				partner: '',
				startDate: '',
				endDate: '',
			},
			setProject: (select) => set((state) => ({ ...state, project: select })),
			projectDetail: {
				detailNo: 0,
				projectNo: 0,
				projectUrl: '',
				vcs: '',
				os: '',
				webServer: '',
				was: '',
				db: '',
				equipment: '',
				module: '',
				libs: '',
				tech: '',
				tool: '',
				note: '',
			},
			setProjectDetail: (select) => set((state) => ({ ...state, projectDetail: select })),
			projectMember: [],
			setProjectMember: (select) => set((state) => ({ ...state, projectMember: select })),
			projectOutput: [],
			setProjectOutput: (select) => set((state) => ({ ...state, projectOutput: select })),
			memberList: [{ profileNo: 0, name: '', team: '', empNo: '' }],
			setMemberList: (select) => set((state) => ({ ...state, memberList: select })),
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
			setClear: () =>
				set(() => ({
					projectNo: 0,
					project: {
						projectNo: 0,
						field: '',
						projectName: '',
						managerNo: 0,
						manager: '',
						status: '',
						step: '',
						client: '',
						partner: '',
						startDate: '',
						endDate: '',
					},
					projectDetail: {
						detailNo: 0,
						projectNo: 0,
						projectUrl: '',
						vcs: '',
						os: '',
						webServer: '',
						was: '',
						db: '',
						equipment: '',
						module: '',
						libs: '',
						tech: '',
						tool: '',
						note: '',
					},
					projectMember: [],
					projectOutput: [],
				})),
			setClearDetailNo: () => set(() => ({ projectNo: 0, businessNo: 0 })),
		}),
		{
			name: 'ProjectStorage',
		},
	),
);

export default useProject;
