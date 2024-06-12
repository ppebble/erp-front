import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { memberList, project, projectDetail, projectFile, projectMember, projectOutput } from '../network/response/projectParams';

interface ProjectStore {
	projectNo: number;
	setProjectNo: (state: number) => void;
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
	setClearProjectNo: () => void;
}

const useProject = create(
	persist<ProjectStore>(
		(set) => ({
			projectNo: 0,
			setProjectNo: (select) => set((state) => ({ ...state, projectNo: select })),
			projectList: [
				{
					projectNo: 0,
					field: '',
					projectName: '',
					managerNo: 0,
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
			setClear: () =>
				set(() => ({
					projectNo: 0,
					project: {
						projectNo: 0,
						field: '',
						projectName: '',
						managerNo: 0,
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
			setClearProjectNo: () => set(() => ({ projectNo: 0 })),
		}),
		{
			name: 'ProjectStorage',
		},
	),
);

export default useProject;
