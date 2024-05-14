import { useCallback, useEffect, useRef, useState } from 'react';
import '@fullcalendar/react/dist/vdom';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import FullCalendar, { DateSelectArg, EventApi, EventClickArg, EventContentArg, EventInput } from '@fullcalendar/react';
import '../../../../assets/css/FullCalendar.css';
import { useQueries, useQuery } from 'react-query';
import { useSideBar } from '../../../../store/useSideBar';
import { CalendarParam, getTodayString, INITIAL_EVENTS } from '../../../../components/calendar/utils/event-utils';
import { useCalendarAction, useCalendarDialogOpen, useCalendarParam, useCalendarType, useEvents } from '../../../../store/useCalendar';
import Card from '../../../../components/card';
import CalendarService from '../../../../services/calendarService';

type PropsType = {
	param: CalendarParam;
};

const DashboardCalendarComponent = () => {
	const { isSideBar } = useSideBar();
	const calendarRef = useRef<FullCalendar>(null);
	const calendar = calendarRef.current?.getApi();
	const [currentDate, setCurrentDate] = useState<string>(getTodayString());

	const initEvents = useEvents();
	// const { isSuccess, data, refetch } = useQuery([`getEvents${getTodayString()}`], CalendarService(getTodayString()).getEventQuery);
	// const { isSuccess, data, refetch } = useQuery([`getDashboardCalendarEvent`], CalendarService(currentDate).getWeekEventQuery);
	const results = useQueries([
		{
			queryKey: [`getDashboardCalendarEvent`],
			queryFn: CalendarService().getWeekEventQuery.queryFn,
			onSuccess: CalendarService().getWeekEventQuery.onSuccess,
			onError: CalendarService().getWeekEventQuery.onError,
		},
		{
			queryKey: [`getDashboardDeptEvent`],
			queryFn: CalendarService().getDeptEvent.queryFn,
			onSuccess: CalendarService().getDeptEvent.onSuccess,
			onError: CalendarService().getDeptEvent.onError,
		},
		// CalendarService().getWeekEventQuery,
		// CalendarService().getDeptEvent,
	]);

	useEffect(() => {
		if (calendarRef.current) {
			setTimeout(() => {
				calendar?.updateSize();
			}, 250);
			// calendarAction.setCalendarEvents(INITIAL_EVENTS);
		}
	}, [isSideBar]);

	const renderEventContent = (eventContent: EventContentArg) => (
		<>
			{/* <b>{eventContent.timeText}</b> */}
			<p className="text-sm font-medium base text-white-300 dark:text-white">{eventContent.event.title}</p>
		</>
	);
	return (
		<Card extra="flex w-full h-full flex-col px-3 py-3">
			<div
				onContextMenu={(e) => {
					e.preventDefault();
				}}
			>
				<FullCalendar
					now={currentDate}
					// progressiveEventRendering
					ref={calendarRef}
					plugins={[dayGridPlugin]}
					headerToolbar={false}
					height="36vh"
					initialView="dayGridWeek"
					eventContent={renderEventContent}
					// selectable
					// editable
					eventDisplay="block"
					selectMirror
					dayMaxEvents
					navLinks
					businessHours
					events={initEvents}
					locale="kr"
					// dateClick={() => {
					// 	return false;
					// }}
					navLinkDayClick={() => {
						return false;
					}}
				/>
			</div>
		</Card>
	);
};

export default DashboardCalendarComponent;
