/* eslint-disable prettier/prettier */
import { EventInput } from '@fullcalendar/react';
import { useEffect } from 'react';
import { useCalendarParam } from '../../../store/useCalendar';
import { taskLists } from '../../../store/common/useCommon';

// let eventGuid = 0;
const todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export type CalendarTaskType = {
	id?: string;
	name: string;
	color?: string;
};
export type CalendarParam = {
	task: CalendarTaskType;
	display: string;
};

export const getEventColor = (task: string | undefined) => {
	let color;
	taskLists.map((e) => {
		if (task === e.id) {
			color = e.color;
		}
		return true;
	});
	return color;
};
export const getTodayString = () => {
	const date = new Date();
	const yyyy = date.getFullYear().toString();
	const mm = date.getMonth() + 1;
	const dd = date.getDate();
	let ddString = '';
	let mmString = '';

	if (dd < 10) {
		ddString = `0${dd}`;
	} else {
		ddString = dd.toString();
	}
	if (mm < 10) {
		mmString = `0${mm}`;
	} else {
		mmString = mm.toString();
	}
	return `${yyyy}-${mmString}-${ddString}`;
};
export const getEventTask = (taskName: string | undefined) => {
	let taskId;
	taskLists.map((e) => {
		if (taskName === e.name) {
			taskId = e.id;
		}
		return true;
	});
	return taskId;
};

/**
 *  scheduleNo = id
 *  profileNo = extendedProps.register
 *  task = extendedProps.task.name ... (extendedProps.task.id 필요함 ..)
 *  title = title
 *  note = extendedProps.eventDesc
 *  isToday  = isAllDay
 *  startDate = start(string)
 *  endDate = end(string)
 *  status ?   ???
 *
 */

// EVENT_MODEL_EXAMPLE

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
		end: '2024-04-30T15:00:00',
		extendedProps: {
			register: 'heap userId',
			eventDesc: '상세 이벤트 설명 설명 설명 설명',
			task: { id: 'personal', name: '개인일정' },
		},
		color: getEventColor('personal'),
	},
];
