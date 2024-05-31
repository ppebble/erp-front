import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { project, projectDetail, projectMember, projectOutput } from '../network/response/projectParams';

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
	projectOutput: projectOutput[];
	setProjectOutput: (state: projectOutput[]) => void;
	setClear: () => void;
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
					isDel: 0,
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
				isDel: 0,
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
				projectMember: [],
				projectOutput: [],
			},
			setProjectDetail: (select) => set((state) => ({ ...state, projectDetail: select })),
			projectMember: [{ memberNo: 0, projectNo: 0, profileNo: 0, member: '', role: '', task: '' }],
			setProjectMember: (select) => set((state) => ({ ...state, projectMember: select })),
			projectOutput: [{ outputNo: 0, projectNo: 0, fileNo: 0, fileName: '' }],
			setProjectOutput: (select) => set((state) => ({ ...state, projectOutput: select })),
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
						isDel: 0,
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
						projectMember: [],
						projectOutput: [],
					},
					projectMember: [{ memberNo: 0, projectNo: 0, profileNo: 0, member: '', role: '', task: '' }],
					projectOutput: [{ outputNo: 0, projectNo: 0, fileNo: 0, fileName: '' }],
				})),
		}),
		{
			name: 'ProjectStorage',
		},
	),
);

export default useProject;
