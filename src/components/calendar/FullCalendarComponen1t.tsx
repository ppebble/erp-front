/*
import React, { Component } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import '../../assets/css/FullCalendar.css';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BsArrowBarUp } from 'react-icons/bs';
import Card from '../card';
import Dropdown from '../dropdown';

export type FullCalendarProps = {
	eventContent?: {
		id: string;
		start: string;
		end: string;
		allDay: boolean;
	};
};

const FullCalendarComponent = ({ eventContent }: FullCalendarProps) => {
	return (
		<Card extra="flex w-full h-full flex-col px-3 py-3">
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				locale="kr"
				headerToolbar={{
					start: 'prev',
					center: 'title',
					end: 'dayGridMonth timeGridWeek,timeGridDay next',
				}}
				height="85vh"
				// dateClick={}
			/>
		</Card>
	);
};
export default FullCalendarComponent;
*/
