import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getQuery, postQuery } from './base/AxiosQueryService';
import { useEquipAction } from '../store/useEquip';
import { AnnReqProps, AnnualInfo, ManagerProps, useAnnualAction } from '../store/useAnnual';

export const AnnualService = (param?: any) => {
	const annualAction = useAnnualAction();
	const queryClient = useQueryClient();

	const getPersonalAnnual = {
		// queryFn: (date: string) => getEvents(date),
		queryFn: () => getQuery(`/api/annual/annualHistory`),
		onSuccess: (result: any) => {
			if (result.response && result.response.resultCode === '7000') {
				const data = result.response.result; // arrayList
				const personalResult = [] as AnnualInfo[];
				if (data) {
					personalResult.push(data);
					annualAction.setPersonalAnnual(personalResult);
					console.log(personalResult);
				}
			}
			return false;
		},
		onError: (error: any) => {
			console.log(error);
		},
	};
	const getAnnualRequest = {
		// queryFn: (date: string) => getEvents(date),
		queryFn: () => getQuery(`/api/annual/annual`),
		onSuccess: (result: any) => {
			if (result.response && result.response.resultCode === '7000') {
				const data = result.response.result; // arrayList
				if (data) {
					annualAction.setAnnualRequest(data);
					console.log(data);
				}
			}
			return false;
		},
		onError: (error: any) => {
			console.log(error);
		},
	};
	const getAdminAnnualRequest = {
		// queryFn: (date: string) => getEvents(date),
		queryFn: () => getQuery(`/api/annual/annualApproveList?managerNo=${param.managerNo}`),
		onSuccess: (result: any) => {
			if (result.response && result.response.resultCode === '7000') {
				const data = result.response.result; // arrayList
				if (data) {
					annualAction.setAdminAnnualRequest(data);
					console.log(data);
				}
			}
			return false;
		},
		onError: (error: any) => {
			console.log(error);
		},
	};
	const getManagerList = {
		queryFn: () => getQuery(`/api/annual/managerTag`),
		onSuccess: (result: any) => {
			if (result.response && result.response.resultCode === '7000') {
				const data = result.response.result; // arrayList
				if (data) {
					annualAction.setManagerList(data);
					console.log(data);
				}
			}
			return false;
		},
		onError: (error: any) => {
			console.log(error);
		},
	};
	const approveAnnual = useMutation({
		mutationFn: (params: any) => postQuery(`/api/annual/admission`, params),
		onSuccess: (result) => {
			if (result.response.resultCode === '7000') {
				alert('작업이 완료되었습니다.');
				queryClient.invalidateQueries('getAnnApproveList');
			} else if (result.error) {
				alert(result.error);
			}
			return result.response;
		},
		onError: (error) => {
			alert(error);
		},
	});
	const rejectAnnual = useMutation({
		mutationFn: (params: any) => postQuery(`/api/annual/rejectAnnual`, params),
		onSuccess: (result) => {
			if (result.response.resultCode === '7000') {
				alert('작업이 완료되었습니다.');
				queryClient.invalidateQueries('getAnnApproveList');
			} else if (result.error) {
				alert(result.error);
			}
			return result.response;
		},
		onError: (error) => {
			alert(error);
		},
	});
	const calcleAnnual = useMutation({
		mutationFn: (params: any) => postQuery(`/api/annual/delAnnual`, params),
		onSuccess: (result) => {
			if (result.response.resultCode === '7000') {
				alert('작업이 완료되었습니다.');
				queryClient.invalidateQueries('getAnnReqList');
			} else if (result.error) {
				alert(result.error);
			}
			return result.response;
		},
		onError: (error) => {
			alert(error);
		},
	});
	const createAnnualMutation = useMutation({
		mutationFn: (params: any) => postQuery(`/api/annual/annual`, params),
		onSuccess: (result) => {
			if (result.response.resultCode === '7000') {
				alert('작업이 완료되었습니다.');
				// queryClient.invalidateQueries('g');
			} else if (result.error) {
				alert(result.error);
			}
			return result.response;
		},
		onError: (error) => {
			alert(error);
		},
	});
	const updateEquipMutation = useMutation({
		mutationFn: (params: any) => postQuery(`/api/equipment/modifyEquipment/${params.equipType}`, params),
		onSuccess: (result) => {
			if (result.response && result.response.resultCode === '7000') {
				alert('작업이 완료되었습니다.');
				queryClient.invalidateQueries('getEquips');
			} else if (result.error) {
				alert(result.error);
			}
			return result.response;
		},
		onError: (error) => {
			alert(error);
		},
	});
	const deleteEquipMutation = useMutation({
		mutationFn: (params: any) => postQuery(`/api/equipment/delEquipment`, params),
		onSuccess: (result) => {
			if (result.response.resultCode === '7000') {
				alert('작업이 완료되었습니다.');
				queryClient.invalidateQueries('getEquips');
			} else if (result.error) {
				alert(result.error);
			}
			return result.response;
		},
		onError: (error) => {
			alert(error);
		},
	});

	// const commonQuery

	return {
		getPersonalAnnual,
		getAnnualRequest,
		getManagerList,
		getAdminAnnualRequest,
		approveAnnual,
		rejectAnnual,
		calcleAnnual,
		createAnnualMutation,
		updateEquipMutation,
		deleteEquipMutation,
	};
};

export default AnnualService;
