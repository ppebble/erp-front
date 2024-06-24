import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getQuery, postQuery, postUploadQuery } from './base/AxiosQueryService';
import { commonResult } from '../network/commonResult';
import { projectDetailParams, project, businessList as businessListType, businessDetailParams } from '../network/response/projectParams';
import useModal from '../store/useModal';
import useProject from '../store/useProject';

// 프로젝트 + 연구과제
export const ProjectService = () => {
	const {
		projectNo,
		businessNo,
		setProject,
		setProjectList,
		setProjectDetail,
		setProjectMember,
		setProjectOutput,
		setBusinessList,
		setBusinessDetail,
	} = useProject();
	const { openModal } = useModal();
	const navigate = useNavigate();

	const projectList = {
		queryFn: () => getQuery('/api/project/projectList'),
		onSuccess: (result: { response: commonResult }) => {
			const common: commonResult = result.response;
			const data: project[] = common.result;
			if (common.isSuccessful) {
				setProjectList(data);
			}
		},
		onError: (error: any) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
	};

	const businessList = {
		queryFn: () => getQuery('/api/business/businessList'),
		onSuccess: (result: { response: commonResult }) => {
			const common: commonResult = result.response;
			const data: businessListType[] = common.result;
			if (common.isSuccessful) {
				setBusinessList(data);
			}
		},
		onError: (error: any) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
	};

	const projectDetail = {
		queryFn: () => getQuery(`/api/project/projectDetail/${projectNo}`),
		onSuccess: (result: { response: commonResult }) => {
			const common: commonResult = result.response;
			const data: projectDetailParams = common.result;
			if (common.isSuccessful) {
				setProject(data.project);
				setProjectDetail(data.projectDetail);
				setProjectMember(data.projectMember);
				setProjectOutput(data.projectOutput);
				navigate('/topic/projectDetail');
			}
		},
		onError: (error: any) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
		enabled: !!projectNo,
	};

	const businessDetail = {
		queryFn: () => getQuery(`/api/business/businessDetail/${businessNo}`),
		onSuccess: (result: { response: commonResult }) => {
			const common: commonResult = result.response;
			const data: businessDetailParams = common.result;
			if (common.isSuccessful) {
				setBusinessDetail(data);
				navigate('/topic/businessDetail');
			}
		},
		onError: (error: any) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
		enabled: !!businessNo,
	};

	const insertProject = useMutation({
		mutationFn: (params: any) => postUploadQuery('/api/project/project', params),
		onSuccess: (result) => {
			navigate('/topic/project');
			return result.response;
		},
		onError: (error) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
	});

	const modifyProject = useMutation({
		mutationFn: (params: any) => postUploadQuery('/api/project/modifyProject', params),
		onSuccess: (result) => {
			navigate('/topic/project');
			return result.response;
		},
		onError: (error) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
	});

	const delProject = useMutation({
		mutationFn: (params: any) => postQuery('/api/project/delProject', params),
		onSuccess: (result) => {
			navigate('/topic/project');
			return result.response;
		},
		onError: (error) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
	});

	return { projectList, businessList, projectDetail, businessDetail, insertProject, modifyProject, delProject };
};
