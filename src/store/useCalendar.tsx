import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { EventApi, EventInput } from '@fullcalendar/react';
import { CalendarParam } from '../components/calendar/utils/event-utils';
import { dailyEventProps, MemberTagInfo, MemberTagProps } from './common/useCommon';

interface CalendarStoreProps {
	calendarParam: CalendarParam;
	calendarEvents: EventInput[];
	filteredEvents: EventInput[];
	calendarType: string | undefined;
	addEventFlag: boolean;
	selectedMembers: string[];
	calendarEvent: EventApi | null;
	isDialogOpen: boolean;
	inputEvent: EventInput;
	workType: string;
	filter: string[];
	members: MemberTagProps[];
	action: ActionItem;
	dailyDeptEvents: dailyEventProps[];
	dailyPersonalEvents: dailyEventProps[];
}
interface ActionItem {
	setCalendarParam: (param: CalendarParam) => void;
	setCalendarEvents: (param: EventInput[]) => void;
	setCalendarDialogFlag: (param: boolean) => void;
	setFilterEvents: (param: any) => void;
	setFilter: (param: string[]) => void;
	setCalendarEventParam: (param: EventApi) => void;
	setCalendarType: (param: string | undefined) => void;
	setAddEventParam: (paran: EventInput | undefined) => void;
	setAddFlag: (param: boolean) => void;
	setWorkType: (param: string) => void;
	setMembers: (param: MemberTagProps[]) => void;
	setSelectedMembers: (param: string[]) => void;
	setDailyDeptEvents: (param: dailyEventProps[]) => void;
	setDailyPersonalEvents: (param: dailyEventProps[]) => void;
}

const useCalendar = create<CalendarStoreProps>()(
	devtools((set) => ({
		// EventInput = 서버에 넣을 이벤트 모델 로 예상됨
		calendarParam: { display: 'block', task: { id: 'personal', name: '개인일정', color: '#787f8f' } } as CalendarParam,
		calendarType: 'dayGridMonth',
		calendarEvents: [] as EventInput[],
		calendarEvent: {} as EventApi | null,
		filteredEvents: [] as EventInput[],
		inputEvent: {} as EventInput,
		workType: '',
		addEventFlag: true,
		isDialogOpen: false,
		members: [] as MemberTagProps[],
		selectedMembers: [] as string[],
		filter: ['personal', 'sc', 'sf', 'manage', 'dev', 'sb'] as string[],
		dailyDeptEvents: [] as dailyEventProps[],
		dailyPersonalEvents: [] as dailyEventProps[],

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
			setFilter: (param: string[]) =>
				set({
					filter: param,
				}),
			setFilterEvents: (param: any[]) =>
				set(
					(state) => ({
						filteredEvents: param,
					}),
					false,
					'FILTERED_CALENDAR_EVENTS',
				),
			setCalendarEvents: (param: EventInput[]) =>
				set(
					(state) => ({
						calendarEvents: param,
					}),
					false,
					'CALENDAR_EVENTS',
				),

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
			setMembers: (param: MemberTagProps[]) => {
				set({
					members: param,
				});
			},
			setSelectedMembers: (param: string[]) => {
				set({
					selectedMembers: param,
				});
			},
			setDailyDeptEvents: (param: dailyEventProps[]) => {
				set({
					dailyDeptEvents: param,
				});
			},
			setDailyPersonalEvents: (param: dailyEventProps[]) => {
				set({
					dailyPersonalEvents: param,
				});
			},
		},
	})),
);
export const useCalendarEvnetParam = () => useCalendar((state) => state.calendarEvent);
export const useCalendarParam = () => useCalendar((state) => state.calendarParam);
export const useFilteredEvents = () => useCalendar((state) => state.filteredEvents);
export const useCalendarDialogOpen = () => useCalendar((state) => state.isDialogOpen);
export const useCalendarType = () => useCalendar((state) => state.calendarType);
export const useAddEventFlag = () => useCalendar((state) => state.addEventFlag);
export const useCalendarAction = () => useCalendar((state) => state.action);
export const useInputEvent = () => useCalendar((state) => state.inputEvent);
export const useEvents = () => useCalendar((state) => state.calendarEvents);
export const useWorkType = () => useCalendar((state) => state.workType);
export const useCalendarFilter = () => useCalendar((state) => state.filter);
export const useMemberTags = () => useCalendar((state) => state.members);
export const useSelectedTag = () => useCalendar((state) => state.selectedMembers);
export const useDeptEvents = () => useCalendar((state) => state.dailyDeptEvents);
export const usePersonalEvents = () => useCalendar((state) => state.dailyPersonalEvents);
