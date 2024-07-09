import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getQuery, postQuery } from './base/AxiosQueryService';

export type AttendProps = {
	attendanceDate: string;
	leaveWorkDate: string;
	attendancePlace: boolean;
	workTime: string;
};
export type AttendInfo = {
	mon: AttendProps;
	tue: AttendProps;
	wed: AttendProps;
	thu: AttendProps;
	fri: AttendProps;
	annWorkTime: string;
};

export const AttendService = (param?: any) => {
	const queryClient = useQueryClient();

	const getWeekAttend = {
		// queryFn: (date: string) => getEvents(date),
		queryFn: () => getQuery(`/api/attendance/testWeekAttendance?date=${param.date}`),
		onSuccess: (result: any) => {
			if (result.response && result.response.resultCode === '7000') {
				const data = result.response.result; // arrayList
				if (data) {
					console.log(data);
					return data;
				}
			}
			return false;
		},
		onError: (error: any) => {
			console.log(error);
		},
	};
	const getMonthAttend = {
		// queryFn: (date: string) => getEvents(date),
		queryFn: () => getQuery(`/api/attendance/testMonthAttendance?date=${param.date}`),
		onSuccess: (result: any) => {
			if (result.response && result.response.resultCode === '7000') {
				const data = result.response.result; // arrayList
				if (data) {
					console.log(data);
					return data;
				}
			}
			return false;
		},
		onError: (error: any) => {
			console.log(error);
		},
	};

	// const commonQuery

	return {
		getWeekAttend,
		getMonthAttend,
	};
};

export default AttendService;
