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
		start: todayStr,
	},
	{
		title: 'Timed event',
		start: `${todayStr}T12:00:00`,
	},
];
