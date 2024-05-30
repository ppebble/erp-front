import { useMutation, useQuery, useQueryClient } from 'react-query';
import { EventInput } from '@fullcalendar/react';
import moment from 'moment';
import { getQuery, postQuery } from './base/AxiosQueryService';
import { getEventColor, getEventTask, INITIAL_EVENTS } from '../components/calendar/utils/event-utils';
import { useCalendarAction, useCalendarFilter } from '../store/useCalendar';
import { dailyEventProps, MemberTagProps } from '../store/common/useCommon';

export const CalendarService = (date?: string) => {
	const calendarAction = useCalendarAction();
	const filter = useCalendarFilter();
	const queryClient = useQueryClient();

	const getEventQuery = {
		// queryFn: (date: string) => getEvents(date),
		queryFn: () => getQuery(`/api/schedule/monthSchedules?date=${date}`),
		onSuccess: (result: any) => {
			if (result.response && result.response.resultCode === '7000') {
				const data = result.response.result; // arrayList
				const paramList = [];

				if (data) {
					for (let i = 0; i < data.length; i += 1) {
						const param = {} as EventInput;
						const taskId = getEventTask(data[i].task);
						param.allDay = data[i].allDay;
						if (param.allDay) {
							param.end = moment(data[i].end).add(86400, 'second').toISOString();
						} else {
							param.end = data[i].end;
						}
						param.id = data[i].scheduleNo;
						param.start = data[i].start;
						param.title = data[i].title;
						param.extendedProps = {
							register: data[i].register,
							eventDesc: data[i].eventDesc,
							task: {
								id: taskId,
								name: data[i].task,
							},
							// 연관 인원 리스트 추가
							members: data[i].members.map((e: any) => {
								return `${e.name} | ${e.team}`;
							}),
						};
						param.color = getEventColor(taskId);
						paramList.push(param);
					}
				}
				calendarAction.setCalendarEvents(paramList);
				calendarAction.setFilterEvents(paramList.filter((item) => filter.includes(item.extendedProps?.task.id)));

				return paramList;
			}
			return false;
		},
		onError: (error: any) => {
			console.log(error);
		},
		// enabled: !!sessionStorage.getItem('nex_accessToken'),
	};
	const getWeekEventQuery = {
		// queryFn: (date2: string, userId: string) => getWeekEvent(date, userId),
		queryFn: () => getQuery(`/api/schedule/weekSchedules`),
		onSuccess: (result: any) => {
			if (result.response && result.response.resultCode === '7000') {
				const data = result.response.result; // arrayList
				const paramList = [];

				if (data) {
					for (let i = 0; i < data.length; i += 1) {
						const param = {} as EventInput;
						param.allDay = data[i].allDay;
						if (param.allDay) {
							param.end = moment(data[i].end).add(86400, 'second').toISOString();
						} else {
							param.end = data[i].end;
						}

						param.id = data[i].scheduleNo;
						param.start = data[i].start;
						param.title = data[i].title;
						param.extendedProps = {
							register: data[i].register,
							eventDesc: data[i].eventDesc,
							task: {
								id: getEventTask(data[i].task),
								name: data[i].task,
							},
						};
						param.color = getEventColor(getEventTask(data[i].task));
						paramList.push(param);
					}
				}
				calendarAction.setCalendarEvents(paramList);
				calendarAction.setFilterEvents(paramList);

				return paramList;
			}
			return false;
		},
		onError: (error: any) => {
			console.log(error);
		},
		// enabled: !!sessionStorage.getItem('nex_accessToken'),
	};
	const getDeptEvent = {
		// queryFn: (date2: string, userId: string) => getWeekEvent(date, userId),
		queryFn: () => getQuery(`/api/schedule/dashSchedules`),
		onSuccess: (result: any) => {
			if (result.response && result.response.resultCode === '7000') {
				const deptData = result.response.result.dept; // arrayList
				const personalData = result.response.result.personal; // arrayList

				if (deptData) {
					const deptList = [];
					for (let i = 0; i < deptData.length; i += 1) {
						const param = {} as dailyEventProps;
						param.allDay = deptData[i].allDay;

						param.schduleNo = deptData[i].scheduleNo;
						param.date = deptData[i].date;
						param.title = deptData[i].title;
						param.members = deptData[i].members;
						deptList.push(param);
					}
					calendarAction.setDailyDeptEvents(deptList);
				}
				if (personalData) {
					const personalList = [];
					for (let i = 0; i < personalData.length; i += 1) {
						const param = {} as dailyEventProps;
						param.allDay = personalData[i].allDay;
						param.schduleNo = personalData[i].scheduleNo;
						param.date = personalData[i].date;
						param.title = personalData[i].title;
						personalList.push(param);
					}
					calendarAction.setDailyPersonalEvents(personalList);
				}
				// calendarAction.setCalendarEvents(paramList);
				// calendarAction.setFilterEvents(paramList);
			}
			return false;
		},
		onError: (error: any) => {
			console.log(error);
		},
		// enabled: !!sessionStorage.getItem('nex_accessToken'),
	};
	const availableProfile = {
		// queryFn: (date2: string, userId: string) => getWeekEvent(date, userId),
		queryFn: () => getQuery(`/api/common/memberTag`),
		onSuccess: (result: any) => {
			const paramList = [];
			if (result.response && result.response.resultCode === '7000') {
				const data = result.response.result; // arrayList

				if (data) {
					for (let i = 0; i < data.length; i += 1) {
						const param = {} as MemberTagProps;
						param.name = data[i].name;
						param.task = {
							id: getEventTask(data[i].team),
							name: data[i].team,
						};
						param.profileNo = data[i].profileNo;
						param.value = `${data[i].team} | ${data[i].name}`;
						paramList.push(param);
					}
				}
				// console.log(paramList);
				calendarAction.setMembers(paramList);

				// calendarAction.setCalendarEvents(paramList);
				// calendarAction.setFilterEvents(paramList);
			}
		},
		onError: (error: any) => {
			console.log(error);
		},
		// enabled: !!sessionStorage.getItem('nex_accessToken'),
	};

	const createEventMutation = useMutation({
		mutationFn: (params: any) => postQuery(`/api/schedule/schedule`, params),
		onSuccess: (result) => {
			queryClient.invalidateQueries('getEvents');
			return result.response;
		},
		onError: (error) => {
			alert(error);
		},
	});
	const updateEventMutation = useMutation({
		mutationFn: (params: any) => postQuery(`/api/schedule/modifySchedule?scheduleNo=${params.scheduleNo}`, params),
		onSuccess: (result) => {
			queryClient.invalidateQueries('getEvents');
			return result.response;
		},
		onError: (error) => {
			alert(error);
		},
	});
	const deleteEventMutation = useMutation({
		mutationFn: (params: any) => postQuery(`/api/schedule/deleteSchedule?scheduleNo=${params.scheduleNo}`, params),
		onSuccess: (result) => {
			queryClient.invalidateQueries('getEvents');
			return result.response;
		},
		onError: (error) => {
			alert(error);
		},
	});

	// const commonQuery

	return { getEventQuery, getWeekEventQuery, createEventMutation, updateEventMutation, deleteEventMutation, getDeptEvent, availableProfile };
};

export default CalendarService;
