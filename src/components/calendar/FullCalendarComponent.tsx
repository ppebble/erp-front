import { useCallback, useEffect, useState } from 'react';
import '@fullcalendar/react/dist/vdom';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import FullCalendar, { DateSelectArg, EventApi, EventClickArg, EventContentArg } from '@fullcalendar/react';
import { INITIAL_EVENTS } from './utils/event-utils';
import '../../assets/css/FullCalendar.css';
import Card from '../card';
import { useNaviOpen } from '../../store';

const FullCalendarComponent = () => {
	const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
	const { naviOpen } = useNaviOpen();
	useEffect(() => {}, [naviOpen]);
	const handleEvents = useCallback((events: EventApi[]) => setCurrentEvents(events), []);
	const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
		const title = prompt('이벤트 이름 기입')?.trim();
		const calendarApi = selectInfo.view.calendar;
		calendarApi.unselect();
		if (title) {
			calendarApi.addEvent({
				title,
				start: selectInfo.startStr,
				end: selectInfo.endStr,
				allDay: selectInfo.allDay,
			});
		}
	}, []);
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
			<FullCalendar
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
		</Card>
	);
};

export default FullCalendarComponent;
