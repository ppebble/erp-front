import { useCallback, useEffect, useRef, useState } from 'react';
import '@fullcalendar/react/dist/vdom';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import FullCalendar, { DateSelectArg, EventApi, EventClickArg, EventContentArg, EventInput } from '@fullcalendar/react';
import { CalendarParam, INITIAL_EVENTS } from './utils/event-utils';
import '../../assets/css/FullCalendar.css';
import { useSideBar } from '../../store/useSideBar';
import Card from '../card';

import { useCalendarAction, useCalendarDialogOpen, useCalendarParam, useCalendarType, useEvents, useFilteredEvents } from '../../store/useCalendar';

const FullCalendarComponent = () => {
	const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
	const { isSideBar } = useSideBar();
	const calendarRef = useRef<FullCalendar>(null);
	const calendarParam = useCalendarParam();
	const isDialogOpen = useCalendarDialogOpen();
	const calendarAction = useCalendarAction();
	const calendar = calendarRef.current?.getApi();
	const initEvents = useFilteredEvents();
	useEffect(() => {
		calendarAction.setCalendarEvents(INITIAL_EVENTS);
		calendarAction.setFilterEvents(INITIAL_EVENTS);
	}, []);
	useEffect(() => {
		if (initEvents && calendar) {
			calendar.addEvent(initEvents);
		}
	}, [initEvents]);
	useEffect(() => {
		calendarAction.setCalendarType(calendar?.view.type ? calendar?.view.type : 'dayGridMonth');
	}, [calendar?.view.type]);
	useEffect(() => {
		if (calendarRef.current) {
			setTimeout(() => {
				calendar?.updateSize();
			}, 250);
		}
	}, [isSideBar]);
	useEffect(() => {}, [currentEvents]);
	const handleEventClick = useCallback(
		(clickInfo: EventClickArg) => {
			if (!isDialogOpen) {
				calendarAction.setWorkType('edit');
				calendarAction.setCalendarEventParam(clickInfo.event);
				calendarAction.setCalendarDialogFlag(true);
			}
		},
		[isDialogOpen],
	);
	const renderEventContent = (eventContent: EventContentArg) => (
		<>
			{/* <b>{eventContent.timeText}</b> */}
			<p className="hover:cursor-pointer">{eventContent.event.title}</p>
		</>
	);
	return (
		<Card extra="mt-15 flex w-full h-full flex-col px-3 py-3">
			<div
				onContextMenu={(e) => {
					e.preventDefault();
				}}
			>
				<FullCalendar
					rerenderDelay={250}
					ref={calendarRef}
					plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
					headerToolbar={{
						start: 'prev',
						center: 'title',
						end: 'today next',
					}}
					height="85vh"
					initialView="dayGridMonth"
					eventContent={renderEventContent}
					eventDisplay="block"
					selectMirror
					dayMaxEvents
					navLinks
					businessHours
					events={initEvents}
					locale="kr"
					eventClick={handleEventClick}
					dateClick={() => {}}
				/>
			</div>
		</Card>
	);
};

export default FullCalendarComponent;
