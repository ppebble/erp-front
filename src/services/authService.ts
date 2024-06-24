import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { loginParam } from '../network/request/authParams';
import { getQuery, postQuery } from './base/AxiosQueryService';
import useModal from '../store/useModal';
import { commonResult } from '../network/commonResult';

export const AuthService = () => {
	const { openModal } = useModal();
	const navigate = useNavigate();

	const loginMutation = useMutation({
		mutationFn: (params: loginParam) => postQuery('/api/auth/login', params),
		onSuccess: (result) => {
			return result.response;
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const testMutation = useMutation({
		mutationFn: () => getQuery('/api/user/getUserInfo'),
		onSuccess: (result) => {
			return result.response;
		},
		onError: (error) => {
			console.log(error);
		},
	});

	// const testQuery = useQuery('getUserInfo', {
	// 	queryFn: () => getQuery('/api/user/getUserInfo'),
	// 	onSuccess: (result) => {
	// 		console.log(result);
	// 	},
	// 	onError: (error) => {
	// 		console.log(error);
	// 	},
	// 	enabled: !!sessionStorage.getItem('nex_accessToken'),
	// });

	const sampleQuery = {
		queryFn: () => getQuery(`/api/user/getUserInfo`),
		onSuccess: (result: any) => {
			return result;
		},
		onError: (error: any) => {
			console.log(error);
		},
		enabled: !!sessionStorage.getItem('nex_accessToken'),
	};

	const sendResetUrl = useMutation({
		mutationFn: (params: any) => postQuery('/api/auth/sendResetUrl', params),
		onSuccess: (result) => {
			const common: commonResult = result.response;
			openModal({ type: 3, contents: common.result });
			return result.response;
		},
		onError: (error) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
	});

	const checkResetPwExpired = useMutation({
		mutationFn: (params: any) => getQuery(`/api/auth/checkResetPwExpired?resetId=${params}`),
		onSuccess: (result) => {
			const common: commonResult = result.response;
			if (common.result.isExpired === false) {
				navigate('/auth/login');
				openModal({ type: 3, contents: '만료된 링크 입니다.', color: 'red' });
			}
		},
		onError: (error) => {
			navigate('/auth/login');
			openModal({ type: 3, contents: error, color: 'red' });
		},
	});

	const modifyPassword = useMutation({
		mutationFn: (params: any) => postQuery('/api/auth/modifyPassword', params),
		onSuccess: (result) => {
			openModal({ type: 3, contents: '비밀번호가 변경 되었습니다.' });
			return result.response;
		},
		onError: (error) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
	});

	// const commonQuery

	return { loginMutation, testMutation, sampleQuery, sendResetUrl, checkResetPwExpired, modifyPassword };
};

export default AuthService;
