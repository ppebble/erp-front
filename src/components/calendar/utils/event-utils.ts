/* eslint-disable prettier/prettier */
import { EventInput } from '@fullcalendar/react';

// let eventGuid = 0;
const todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
// export function createEventId() {
// 	return String((eventGuid += 1))
// }
export const INITIAL_EVENTS: EventInput[] = [
	{
		title: 'All-day event',
		start: '2024-04-08T12:00',
		end: '2024-04-25T12:00',
		allDay: true,
		extendedProps: {
			register: 'heap userId',
			eventDesc: '상세 이벤트 설명 설명 설명 설명',
		},
	},
	{
		title: 'Timed event',
		start: `${todayStr}T12:00:00`,
		end: '2024-04-09T12:00:00',
	},
];
