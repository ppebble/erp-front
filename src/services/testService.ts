import { useMutation } from 'react-query';
import { postSampleParams, getSampleParams } from '../store/sample/sampleRequest';
import { getQuery, postQuery } from './base/AxiosQueryService';
import { baseParams } from '../store/baseParams/baseParams';

export const TestService = () => {
	const postMutation = useMutation({
		mutationFn: (params: postSampleParams) => postQuery('/datainfo/rest/v1.0/users/auth', params),
		onSuccess: (result) => {
			return result.response;
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const getMutation = useMutation({
		mutationFn: (variables: getSampleParams) =>
			getQuery(`/api/getMyHistory?empNo=${variables.empNo}&offset=${variables.offset}&limit=${variables.limit}`),
		onSuccess: (result) => {
			console.log(JSON.stringify(result.response));
			return result.response;
		},
		onError: (error) => {
			console.log(error);
		},
	});

	return { postMutation, getMutation };
};

export default TestService;
