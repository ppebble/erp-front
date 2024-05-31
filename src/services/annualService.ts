import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getQuery, postQuery } from './base/AxiosQueryService';
import { useEquipAction } from '../store/useEquip';
import { AnnualInfo, useAnnualAction } from '../store/useAnnual';

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
	const getEquipDetail = {
		// queryFn: (date: string) => getEvents(date),
		queryFn: () => getQuery(`/api/equipment/equipmentDetail/${param.equipType}/${param.equipmentNo}`),
		onSuccess: (result: any) => {
			if (result.response && result.response.resultCode === '7000') {
				const data = result.response.result; // arrayList

				if (data) {
					// equipAction.setEquip(data);
				}
			}
			return false;
		},
		onError: (error: any) => {
			console.log(error);
		},
		enabled: !!param && !!param.equipmentNo,
	};

	const createEquipMutation = useMutation({
		mutationFn: (params: any) => postQuery(`/api/equipment/equipment/${params.equipType}`, params),
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
		getEquipDetail,
		createEquipMutation,
		updateEquipMutation,
		deleteEquipMutation,
	};
};

export default AnnualService;
