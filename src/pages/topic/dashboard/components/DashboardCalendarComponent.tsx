import { useEffect, useRef, useState } from 'react';
import '@fullcalendar/react/dist/vdom';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar, { EventContentArg } from '@fullcalendar/react';
import '../../../../assets/css/FullCalendar.css';
import { useQueries } from 'react-query';
import { useSideBar } from '../../../../store/useSideBar';
import { getTodayString } from '../../../../components/calendar/utils/event-utils';
import { useEvents } from '../../../../store/useCalendar';
import Card from '../../../../components/card';
import CalendarService from '../../../../services/calendarService';

const DashboardCalendarComponent = () => {
	const { isSideBar } = useSideBar();
	const calendarRef = useRef<FullCalendar>(null);
	const calendar = calendarRef.current?.getApi();

	const initEvents = useEvents();
	useQueries([
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
	]);

	useEffect(() => {
		if (calendarRef.current) {
			setTimeout(() => {
				calendar?.updateSize();
			}, 250);
		}
	}, [isSideBar]);

	const renderEventContent = (eventContent: EventContentArg) => (
		<p className="text-sm font-medium base text-white-300 dark:text-white">{eventContent.event.title}</p>
	);
	return (
		<Card extra="flex w-full h-full flex-col px-3 py-3">
			<div
				onContextMenu={(e) => {
					e.preventDefault();
				}}
			>
				<FullCalendar
					now={getTodayString()}
					ref={calendarRef}
					plugins={[dayGridPlugin]}
					headerToolbar={false}
					height="36vh"
					initialView="dayGridWeek"
					eventContent={renderEventContent}
					eventDisplay="block"
					selectMirror
					dayMaxEvents
					navLinks
					businessHours
					events={initEvents}
					locale="kr"
					navLinkDayClick={() => {
						return false;
					}}
				/>
			</div>
		</Card>
	);
};

export default DashboardCalendarComponent;
