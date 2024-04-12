import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { EventApi, EventInput } from '@fullcalendar/react';
import { CalendarParam, taskColor } from '../components/calendar/utils/event-utils';

interface CalendarStoreProps {
	calendarParam: CalendarParam;
	calendarEvents: EventInput[];
	calendarType: string | undefined;
	addEventFlag: boolean;
	calendarEvent: EventApi | null;
	isDialogOpen: boolean;
	inputEvent: EventInput;
	workType: string;
	action: ActionItem;
}
interface ActionItem {
	setCalendarParam: (param: CalendarParam) => void;
	setCalendarEvents: (param: EventInput[]) => void;
	setCalendarDialogFlag: (param: boolean) => void;
	setCalendarEventParam: (param: EventApi) => void;
	setCalendarType: (param: string | undefined) => void;
	setAddEventParam: (paran: EventInput | undefined) => void;
	setAddFlag: (param: boolean) => void;
	setWorkType: (param: string) => void;
}

const useCalendar = create<CalendarStoreProps>()(
	devtools((set) => ({
		// EventInput = 서버에 넣을 이벤트 모델 로 예상됨
		calendarParam: { display: 'block', task: { id: 'personal', name: '개인일정', color: taskColor.personal } } as CalendarParam,
		calendarType: 'dayGridMonth',
		calendarEvents: [] as EventInput[],
		calendarEvent: {} as EventApi | null,
		inputEvent: {} as EventInput,
		workType: '',
		addEventFlag: true,
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
				),
			setCalendarEvents: (param: EventInput[]) =>
				set(
					(state) => ({
						calendarEvents: param,
					}),
					false,
					'CALENDAR_EVENTS',
				),
			// setCalendarEvents: (param: EventInput[]) =>
			// 	set(
			// 		{
			// 			calendarEvents: param,
			// 		},
			// 		false,
			// 		'CALENDAR_EVENTS',
			// 	),
			setAddEventParam: (param: EventInput | undefined) => {
				set({
					inputEvent: param,
				});
			},
			setCalendarType: (param: string | undefined) => {
				set({
					calendarType: param,
				});
			},
			setAddFlag: (param: boolean) => {
				set({
					addEventFlag: param,
				});
			},
			setWorkType: (param: string) => {
				set({
					workType: param,
				});
			},
		},
	})),
);
export const useCalendarEvnetParam = () => useCalendar((state) => state.calendarEvent);
export const useCalendarParam = () => useCalendar((state) => state.calendarParam);
export const useCalendarDialogOpen = () => useCalendar((state) => state.isDialogOpen);
export const useCalendarType = () => useCalendar((state) => state.calendarType);
export const useAddEventFlag = () => useCalendar((state) => state.addEventFlag);
export const useCalendarAction = () => useCalendar((state) => state.action);
export const useInputEvent = () => useCalendar((state) => state.inputEvent);
export const useEvents = () => useCalendar((state) => state.calendarEvents);
export const useWorkType = () => useCalendar((state) => state.workType);
