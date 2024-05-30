import { useMutation, useQuery, useQueryClient } from 'react-query';
import { EventInput } from '@fullcalendar/react';
import moment from 'moment';
import { getQuery, postQuery } from './base/AxiosQueryService';
import { getEventColor, getEventTask, INITIAL_EVENTS } from '../components/calendar/utils/event-utils';
import { useCalendarAction, useCalendarFilter } from '../store/useCalendar';
import { dailyEventProps, MemberTagProps } from '../store/common/useCommon';
import { useEquipAction } from '../store/useEquip';

export const EquipService = (param?: any) => {
	const equipAction = useEquipAction();
	const queryClient = useQueryClient();

	const getEquipList = {
		// queryFn: (date: string) => getEvents(date),
		queryFn: () => getQuery(`/api/equipment/equipmentList`),
		onSuccess: (result: any) => {
			if (result.response && result.response.resultCode === '7000') {
				const data = result.response.result; // arrayList

				if (data) {
					equipAction.setEquipList(data);
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
					equipAction.setEquip(data);
				}
			}
			return false;
		},
		onError: (error: any) => {
			console.log(error);
		},
		enabled: !!param && !!param.equipmentNo,
	};
	const createVmMutation = useMutation({
		mutationFn: (params: any) => postQuery(`/api/equipment/addVmInfo`, params),
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
	const updateVmMutation = useMutation({
		mutationFn: (params: any) => postQuery(`/api/equipment/modifyVmInfo`, params),
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
	const deleteVmMutation = useMutation({
		mutationFn: (params: any) => postQuery(`/api/equipment/delVmInfo`, params),
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
		getEquipList,
		getEquipDetail,
		createEquipMutation,
		createVmMutation,
		updateEquipMutation,
		updateVmMutation,
		deleteEquipMutation,
		deleteVmMutation,
	};
};

export default EquipService;
