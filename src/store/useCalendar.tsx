import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { EventInput } from '@fullcalendar/react';
import { CalendarParam } from '../pages/topic/calendar';

interface CalendarStoreProps {
	calendarParam: CalendarParam;
	calendarEvents: EventInput[];
	action: ActionItem;
}
interface ActionItem {
	setCalendarParam: (param: CalendarParam) => void;
}

const useCalendar = create<CalendarStoreProps>()(
	devtools((set) => ({
		// EventInput = 서버에 넣을 이벤트 모델 로 예상됨
		calendarParam: {} as CalendarParam,
		calendarEvents: [] as EventInput[],

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
		},
	})),
);
export const useCalendarParam = () => useCalendar((state) => state.calendarParam);
export const useCalendarAction = () => useCalendar((state) => state.action);
