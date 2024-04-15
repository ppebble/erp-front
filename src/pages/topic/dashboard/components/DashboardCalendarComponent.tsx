import { useCallback, useEffect, useRef, useState } from 'react';
import '@fullcalendar/react/dist/vdom';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import FullCalendar, { DateSelectArg, EventApi, EventClickArg, EventContentArg, EventInput } from '@fullcalendar/react';
import '../../../../assets/css/FullCalendar.css';
import { useSideBar } from '../../../../store/useSideBar';
import { CalendarParam, INITIAL_EVENTS } from '../../../../components/calendar/utils/event-utils';
import { useCalendarAction, useCalendarDialogOpen, useCalendarParam, useCalendarType, useEvents } from '../../../../store/useCalendar';
import Card from '../../../../components/card';

type PropsType = {
	param: CalendarParam;
};

const DashboardCalendarComponent = () => {
	const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
	const { isSideBar } = useSideBar();
	const calendarRef = useRef<FullCalendar>(null);
	const calendarParam = useCalendarParam();
	const calendarType = useCalendarType();
	const isDialogOpen = useCalendarDialogOpen();
	const calendarAction = useCalendarAction();
	const calendar = calendarRef.current?.getApi();
	const initEvents = useEvents();
	const [data, setData] = useState<CalendarParam>(calendarParam);
	useEffect(() => {
		calendarAction.setCalendarEvents(INITIAL_EVENTS);
	}, []);
	useEffect(() => {
		// console.log(initEvents);
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
			// calendarAction.setCalendarEvents(INITIAL_EVENTS);
		}
	}, [isSideBar]);
	useEffect(() => {
		// console.log(currentEvents);
	}, [currentEvents]);

	const handleEventClick = useCallback(
		(clickInfo: EventClickArg) => {
			// if (window.confirm(`${clickInfo.event.title}  이벤트를 삭제하시겠습니까?`)) {
			// 	clickInfo.event.remove();
			// }
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
					// progressiveEventRendering
					ref={calendarRef}
					plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
					headerToolbar={{
						start: '',
						center: 'title',
						// end: 'dayGridMonth,timeGridWeek,timeGridDay next',
						end: '',
					}}
					height="85vh"
					initialView="dayGridMonth"
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
					// eventsSet={handleEvents}
					// select={handleDateSelect}
					eventClick={handleEventClick}
					dateClick={() => {}}
				/>
			</div>
		</Card>
	);
};

export default DashboardCalendarComponent;
