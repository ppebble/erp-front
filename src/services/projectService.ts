import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getQuery, postQuery, postUploadQuery } from './base/AxiosQueryService';
import { commonResult } from '../network/commonResult';
import { projectDetailParams, project } from '../network/response/projectParams';
import useModal from '../store/useModal';
import useProject from '../store/useProject';

export const ProjectService = () => {
	const { projectNo, setProject, setProjectList, setProjectDetail, setProjectMember, setProjectNo } = useProject();
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

	const projectDetail = {
		queryFn: () => getQuery(`/api/project/projectDetail/${projectNo}`),
		onSuccess: (result: { response: commonResult }) => {
			const common: commonResult = result.response;
			const data: projectDetailParams = common.result;
			if (common.isSuccessful) {
				setProject(data.project);
				setProjectDetail(data.projectDetail);
				setProjectMember(data.projectMember);
				navigate('/topic/projectDetail', { state: { isNew: 0 } });
			}
		},
		onError: (error: any) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
		enabled: !!projectNo,
	};

	const modifyProject = useMutation({
		mutationFn: (params: any) => postQuery('/api/project/modifyProject', params),
		onSuccess: (result) => {
			return result.response;
		},
		onError: (error) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
	});

	const delProject = useMutation({
		mutationFn: (params: any) => postQuery('/api/project/delProject', params),
		onSuccess: (result) => {
			return result.response;
		},
		onError: (error) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
	});

	const insertProject = useMutation({
		mutationFn: (params: any) => postUploadQuery('/api/project/project', params),
		onSuccess: (result) => {
			return result.response;
		},
		onError: (error) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
	});

	return { projectList, projectDetail, modifyProject, delProject, insertProject };
};
