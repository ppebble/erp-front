import { useMutation, useQuery } from 'react-query';
import { getQuery, postQuery } from './base/AxiosQueryService';

export const ProfileService = () => {
	const idCheckMutation = useMutation({
		mutationFn: (params: string) => postQuery(`/api/profile/iddup?userId=${params}`),
		onSuccess: (result) => {
			return result.response;
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const profieQuery = {
		queryFn: () => getQuery('/api/profile/selprofile'),
		onSuccess: (result: any) => {
			return result;
		},
		onError: (error: any) => {
			console.log(error);
		},
	};

	const updateProfileMutation = useMutation({
		mutationFn: (params: any) => postQuery('/api/profile/modifyprofile', params),
		onSuccess: (result) => {
			return result.response;
		},
		onError: (error) => {
			console.log(error);
		},
	});

	return { idCheckMutation, profieQuery, updateProfileMutation };
};

export default ProfileService;
