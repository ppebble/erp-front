import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { EventApi, EventInput } from '@fullcalendar/react';
import { CalendarParam } from '../pages/topic/calendar';

interface CalendarStoreProps {
	calendarParam: CalendarParam;
	calendarEvents: EventInput[];
	calendarEvent: EventApi;
	isDialogOpen: boolean;
	action: ActionItem;
}
interface ActionItem {
	setCalendarParam: (param: CalendarParam) => void;
	setCalendarDialogFlag: (param: boolean) => void;
	setCalendarEventParam: (param: EventApi) => void;
}

const useCalendar = create<CalendarStoreProps>()(
	devtools((set) => ({
		// EventInput = 서버에 넣을 이벤트 모델 로 예상됨
		calendarParam: {} as CalendarParam,
		calendarEvents: [] as EventInput[],
		calendarEvent: {} as EventApi,
		isDialogOpen: false,

		// set param
		action: {
			setCalendarParam: (param: CalendarParam) =>
				set(
					{
						calendarParam: param,
					},
					false,
					'SET_CALENDAR_PARAM',
				),
			setCalendarDialogFlag: (param: boolean) =>
				set(
					{
						isDialogOpen: param,
					},
					false,
					'CALENDAR_DIALOG_OPEN',
				),
			setCalendarEventParam: (param: EventApi) =>
				set(
					{
						calendarEvent: param,
					},
					false,
					'SET_CALENDAR_PARAM',
				),
		},
	})),
);
export const useCalendarEvnetParam = () => useCalendar((state) => state.calendarEvent);
export const useCalendarParam = () => useCalendar((state) => state.calendarParam);
export const useCalendarDialogOpen = () => useCalendar((state) => state.isDialogOpen);
export const useCalendarAction = () => useCalendar((state) => state.action);
