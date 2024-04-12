/* eslint-disable prettier/prettier */
import { EventInput } from '@fullcalendar/react';
import { useEffect } from 'react';
import { useCalendarParam } from '../../../store/useCalendar';
import { TASK_LIST, TASK_LIST_KEY } from '../../../store/common/useCommon';

// let eventGuid = 0;
const todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
// export function createEventId() {
// 	return String((eventGuid += 1))
// }

export type CalendarTaskType = {
	id?: string;
	name: string;
	color?: string;
};
export type CalendarParam = {
	task: CalendarTaskType;
	display: string;
};
export const taskColor = {
	sc: '#1cb9e0',
	sf: '#00e413',
	manage: '#f52b4d',
	dev: '#9842fa',
	personal: '#787f8f',
	sb: '#e9baba',
	myPersonal: '#aaafbb',
};
export const taskList = [
	{ id: 'sc', name: 'SC사업부', color: taskColor.sc },
	{ id: 'sf', name: 'SF&신사업부', color: taskColor.sf },
	{ id: 'manage', name: '경영팀', color: taskColor.manage },
	{ id: 'dev', name: '기술개발본부', color: taskColor.dev },
	{ id: 'sb', name: '전략사업본부', color: taskColor.sb },
	{ id: 'personal', name: '개인일정', color: taskColor.personal },
	{ id: 'myPersonal', name: '나의 개인일정', color: taskColor.myPersonal },
];
export const getTask = (task: TASK_LIST_KEY) => {
	console.log(task);
	return task;
};
export const getEventColor = (task: string | undefined) => taskList.find((e) => e.id === task)?.color;
/**
 *  scheduleNo = id
 *  profileNo = extendedProps.register
 *  task = extendedProps.task.name ... (extendedProps.task.id 필요함 ..)
 *  title = title
 *  note = extendedProps.eventDesc
 *  isToday ?    ??
 *  startDate = start(string)
 *  endDate = end(string)
 *  status ?   ???
 *
 *   allDay ... allDayFlag 필요
 */
export const INITIAL_EVENTS: EventInput[] = [
	{
		id: 'event1',
		title: 'All-day event',
		start: '2024-04-08T12:00',
		end: '2024-04-11T12:00',
		allDay: true,
		extendedProps: {
			register: 'heap userId',
			eventDesc: '상세 이벤트 설명 설명 설명 설명',
			task: { id: 'dev', name: '기술개발본부' },
		},
		color: getEventColor('dev'),
	},
	{
		id: 'event2',
		title: 'Timed event',
		start: `${todayStr}T12:00:00`,
		end: '2024-04-13T15:00:00',
		extendedProps: {
			register: 'heap userId',
			eventDesc: '상세 이벤트 설명 설명 설명 설명',
			task: { id: 'personal', name: '개인일정' },
		},
	},
];
