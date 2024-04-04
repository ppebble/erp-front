import { useCallback, useEffect, useRef, useState } from 'react';
import '@fullcalendar/react/dist/vdom';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import FullCalendar, { DateSelectArg, EventApi, EventClickArg, EventContentArg } from '@fullcalendar/react';
import { INITIAL_EVENTS } from './utils/event-utils';
import '../../assets/css/FullCalendar.css';
import { useSideBar } from '../../store/useSideBar';
import Card from '../card';
import { CalendarParam } from '../../pages/topic/calendar';
import { useCalendarParam } from '../../store/useCalendar';

type PropsType = {
	param: CalendarParam;
};

export const taskColor = {
	sc: '#1cb9e0',
	sf: '#00e413',
	manage: '#f52b4d',
	dev: '#9842fa',
	personal: '#787f8f',
	strategicBusinessDivision: '#e9baba',
	myPersonal: '#aaafbb',
};
const FullCalendarComponent = () => {
	const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
	const { isSideBar } = useSideBar();
	const calendarRef = useRef<FullCalendar>(null);
	const calendarParam = useCalendarParam();
	// const [data, setData] = useState<CalendarParam>(calendarParam);
	useEffect(() => {}, [calendarParam]);
	useEffect(() => {
		if (calendarRef.current) {
			const calendar = calendarRef.current.getApi();

			setTimeout(() => {
				calendar.updateSize();
			}, 250);
		}
	}, [isSideBar]);
	useEffect(() => {
		// console.log(currentEvents);
	}, [currentEvents]);

	const handleEvents = useCallback((events: EventApi[]) => setCurrentEvents(events), []);
	const handleDateSelect = useCallback(
		(selectInfo: DateSelectArg) => {
			const title = prompt('이벤트 이름 기입')?.trim();
			const calendarApi = selectInfo.view.calendar;
			calendarApi.unselect();
			if (title) {
				calendarApi.addEvent({
					// type :: eventInput
					title,
					start: selectInfo.startStr,
					end: selectInfo.endStr,
					allDay: selectInfo.allDay,
					color: calendarParam.task.color,
					display: calendarParam.display,
					textColor: '#fff',
				});
			}
		},
		[calendarParam],
	);
	const handleEventClick = useCallback((clickInfo: EventClickArg) => {
		if (window.confirm(`${clickInfo.event.title}  이벤트를 삭제하시겠습니까?`)) {
			clickInfo.event.remove();
		}
	}, []);
	const renderEventContent = (eventContent: EventContentArg) => (
		<>
			<b>{eventContent.timeText}</b>
			<i>{eventContent.event.title}</i>
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
					rerenderDelay={100}
					progressiveEventRendering
					ref={calendarRef}
					plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
					headerToolbar={{
						start: 'prev',
						center: 'title',
						end: 'dayGridMonth,timeGridWeek,timeGridDay next',
					}}
					height="85vh"
					initialView="dayGridMonth"
					eventContent={renderEventContent}
					selectable
					editable
					eventDisplay="block"
					selectMirror
					dayMaxEvents
					navLinks
					businessHours
					initialEvents={INITIAL_EVENTS}
					locale="kr"
					eventsSet={handleEvents}
					select={handleDateSelect}
					eventClick={handleEventClick}
				/>
			</div>
		</Card>
	);
};

export default FullCalendarComponent;
