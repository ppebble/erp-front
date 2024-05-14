import { useCallback, useEffect, useRef, useState } from 'react';
import '@fullcalendar/react/dist/vdom';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import FullCalendar, { DateSelectArg, EventApi, EventClickArg, EventContentArg, EventInput } from '@fullcalendar/react';
import { useQuery, useQueryClient } from 'react-query';
import moment from 'moment';
import { CalendarParam, getTodayString, INITIAL_EVENTS } from './utils/event-utils';
import '../../assets/css/FullCalendar.css';
import { useSideBar } from '../../store/useSideBar';
import Card from '../card';

import { useCalendarAction, useCalendarDialogOpen, useCalendarParam, useCalendarType, useEvents, useFilteredEvents } from '../../store/useCalendar';
import CalendarService from '../../services/calendarService';

const FullCalendarComponent = () => {
	const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);

	const { isSideBar } = useSideBar();
	const calendarRef = useRef<FullCalendar>(null);
	const calendarParam = useCalendarParam();
	const isDialogOpen = useCalendarDialogOpen();
	const calendarAction = useCalendarAction();
	const events = useEvents();
	const calendar = calendarRef.current?.getApi();

	const initEvents = useFilteredEvents();
	const [currentDate, setCurrentDate] = useState<string>(getTodayString());
	const { isSuccess, refetch } = useQuery(['getEvents', currentDate.slice(0, 7)], CalendarService(currentDate).getEventQuery);
	const queryClient = useQueryClient();

	const filter = [''] as string[];
	const convertDate = (date: any) => {
		const yyyy = date.getFullYear().toString();
		const mm = date.getMonth() + 1;
		const dd = date.getDate();
		let ddString = '';
		let mmString = '';

		if (dd < 10) {
			ddString = `0${dd}`;
		} else {
			ddString = dd.toString();
		}
		if (mm < 10) {
			mmString = `0${mm}`;
		} else {
			mmString = mm.toString();
		}
		setCurrentDate(`${yyyy}-${mmString}-${ddString}`);
		return `${yyyy}-${mmString}-${ddString}`;
	};
	useEffect(() => {
		if (initEvents && calendar) {
			calendar.addEvent(initEvents);
			if (isSuccess) {
				// calendarAction.setFilterEvents(events.filter((item) => filter.includes(item.extendedProps?.task.id)));
			}
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
	const handleEventClick = useCallback(
		(clickInfo: EventClickArg) => {
			if (!isDialogOpen) {
				calendarAction.setWorkType('edit');
				const event = { ...clickInfo.event };
				// event.event.end = moment(clickInfo.event.end).subtract(1, 'days');
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
	// useEffect(() => {
	// 	if (!isDialogOpen) {
	// 		queryClient.invalidateQueries([`getEvents, ${currentDate.slice(0, 7)}`]);
	// 	}
	// }, [isDialogOpen]);
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
						start: 'cPrevBtn',
						center: 'title',
						end: 'today cNextBtn',
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
					customButtons={{
						cPrevBtn: {
							// text: '<',
							icon: 'chevron-left',
							click: () => {
								calendar?.prev();
								convertDate(calendar?.getDate());
							},
						},
						cNextBtn: {
							icon: 'chevron-right',
							click: () => {
								calendar?.next();
								convertDate(calendar?.getDate());
							},
						},
					}}
					locale="kr"
					eventClick={handleEventClick}
					dateClick={() => {
						return false;
					}}
					navLinkDayClick={() => {
						return false;
					}}
				/>
			</div>
		</Card>
	);
};

export default FullCalendarComponent;
