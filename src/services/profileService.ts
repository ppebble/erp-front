import { useMutation, useQuery } from 'react-query';
import { getQuery, postQuery } from './base/AxiosQueryService';
import { commonResult } from '../network/commonResult';
import { profileResult } from '../network/response/profileParams';
import useProfile from '../store/useProfile';

export const ProfileService = () => {
	const { setProfile, setDetail, setDept, setEducation, setArmy, setCareer, setLicense, setCoursework, setSkill } = useProfile();

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
		queryFn: () => getQuery('/api/profile/selProfile'),
		onSuccess: (result: { response: commonResult }) => {
			const common: commonResult = result.response;
			const data: profileResult = common.result;
			if (common.isSuccessful) {
				// console.log(data);
				setProfile(data.profile);
				data.profile.rePw = '';
				setDetail(data.detail);
				setDept(data.dept);
				setEducation(data.education);
				setArmy(data.army);
				setCareer(data.career);
				setLicense(data.license);
				setCoursework(data.coursework);
				setSkill(data.skill);
			}
		},
		onError: (error: any) => {
			console.log(error);
		},
	};

	const updateProfileMutation = useMutation({
		mutationFn: (params: any) => postQuery('/api/profile/modifyProfile', params),
		onSuccess: (result) => {
			return result.response;
		},
		onError: (error) => {
			console.log(error);
		},
	});

	return { idCheckMutation, profieQuery, updateProfileMutation };
};
