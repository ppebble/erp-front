import { useMutation } from 'react-query';
import { getQuery, postQuery } from './base/AxiosQueryService';
import { commonResult } from '../network/commonResult';
import { profileParams } from '../network/response/profileParams';
import useModal from '../store/useModal';
import useProfile from '../store/useProfile';
import { profieRank, profileList } from '../network/response/profileList';

export const ProfileService = () => {
	const { setProfile, setDetail, setDept, setEducation, setArmy, setCareer, setLicense, setCoursework, setSkill, setProfileList, setRank } =
		useProfile();
	const { openModal } = useModal();

	const idCheckMutation = useMutation({
		mutationFn: (params: string) => postQuery(`/api/profile/duplicate?userId=${params}`, params),
		onSuccess: (result) => {
			return result.response;
		},
		onError: (error) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
	});

	const selProfile = {
		queryFn: () => getQuery('/api/profile/profile'),
		onSuccess: (result: { response: commonResult }) => {
			const common: commonResult = result.response;
			const data: profileParams = common.result;
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
			openModal({ type: 3, contents: error, color: 'red' });
		},
	};

	const updateProfileMutation = useMutation({
		mutationFn: (params: any) => postQuery('/api/profile/modifyProfile', params),
		onSuccess: (result) => {
			return result.response;
		},
		onError: (error) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
	});

	const getProfileList = {
		queryFn: () => getQuery('/api/profile/profileList'),
		onSuccess: (result: { response: commonResult }) => {
			const common: commonResult = result.response;
			const data: profileList[] = common.result;
			if (common.isSuccessful) {
				setProfileList(data);
			}
		},
		onError: (error: any) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
	};

	const modifyPw = useMutation({
		mutationFn: (params: any) => postQuery(`/api/profile/modifyPw?pw=${params}`, params),
		onSuccess: (result) => {
			openModal({ type: 3, contents: '비밀번호가 변경 되었습니다.' });
		},
		onError: (error) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
	});

	const profileByRank = {
		queryFn: () => getQuery('/api/profile/profileByRank'),
		onSuccess: (result: { response: commonResult }) => {
			const common: commonResult = result.response;
			const data: profieRank[] = common.result;
			if (common.isSuccessful) {
				setRank(data);
			}
		},
		onError: (error: any) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
	};

	return { idCheckMutation, selProfile, updateProfileMutation, getProfileList, modifyPw, profileByRank };
};
