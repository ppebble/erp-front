import { useMutation } from 'react-query';
import { postQuery, postUploadQuery } from './base/AxiosQueryService';

export const TestUploadService = () => {
	const fileUpload = useMutation({
		mutationFn: (params: any) => postUploadQuery('/api/project/project', params),
		onSuccess: (result) => {
			console.log(123);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	return { fileUpload };
};
