import { useMutation, useQuery } from 'react-query';
import { loginParam } from '../network/request/authParams';
import { getQuery, postQuery } from './base/AxiosQueryService';

export const AuthService = () => {
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

	// const commonQuery

	return { loginMutation, testMutation, sampleQuery };
};

export default AuthService;
