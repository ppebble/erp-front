import { useEffect, useRef, useState } from 'react';
import { useCalendarEvnetParam } from '../../../store/useCalendar';

export const CalendarDetailComponent = () => {
	const selectedEvent = useCalendarEvnetParam();
	const refEventName = useRef<HTMLInputElement>(null);
	const refEventStartDate = useRef<HTMLInputElement>(null);
	const refEventEndDate = useRef<HTMLInputElement>(null);
	const refRegistUser = useRef<HTMLInputElement>(null);
	const refEventDetail = useRef<HTMLInputElement>(null);

	useEffect(() => {
		console.log(selectedEvent?.startStr?.slice(0, 16));
		console.log(selectedEvent?.endStr?.slice(0, 16));
	}, [selectedEvent?.endStr]);

	return (
		<div className="grid h-full grid-cols-1">
			<div className="mt-5 start justify-start">
				<div className="flex justify-start">
					<p className="text-base font-bold text-navy-700 dark:text-white">일정 명 :</p>
				</div>
				<div className="flex justify-start">
					<input
						type="text"
						ref={refEventName}
						id="eventName"
						disabled={false}
						defaultValue={selectedEvent?.title}
						className="mt-2 read-only flex h-12 w-full items-center border bg-white/0 p-3 border-b-gray-500 border-white/10 text-sm outline-none dark:!border-white/10 dark:text-white"
					/>
				</div>
			</div>
			<div className="mt-5 start justify-start">
				<div className="flex justify-start">
					<p className="text-base font-bold text-navy-700 dark:text-white">날짜 선택 :</p>
				</div>
				<div className="flex justify-start">
					<input
						type={`${!selectedEvent?.allDay ? 'datetime-local' : 'date'}`}
						ref={refEventStartDate}
						id="eventName"
						disabled={false}
						defaultValue={selectedEvent?.startStr?.slice(0, 19)}
						className="mt-2 mr-3 read-only flex h-12 w-full items-center justify-center  border bg-white/0 p-3 text-sm outline-none border-b-gray-500 border-white/10 dark:!border-white/10 dark:text-white"
					/>
					<div className="justify-center items-center flex">
						<p className="tex-base font-bold text-xl">-</p>
					</div>
					<input
						// type="datetime-local"
						type={`${!selectedEvent?.allDay ? 'datetime-local' : 'date'}`}
						ref={refEventEndDate}
						id="eventName"
						disabled={false}
						onChange={() => {
							console.log(refEventEndDate.current?.value);
						}}
						defaultValue={selectedEvent?.endStr?.slice(0, 19)}
						className="mt-2 ml-3 read-only flex h-12 w-full items-center justify-center  border bg-white/0 p-3 text-sm outline-none border-b-gray-500 border-white/10 dark:!border-white/10 dark:text-white"
					/>
				</div>
			</div>
			<div className="mt-5 start justify-start">
				<div className="flex justify-start">
					<p className="text-base font-bold text-navy-700 dark:text-white">등록자 명 :</p>
				</div>
				<div className="flex justify-start">
					<input
						type="text"
						id="eventName"
						ref={refRegistUser}
						defaultValue={selectedEvent?.extendedProps.register}
						disabled={false}
						className="mt-2 read-only flex h-12 w-full items-center  border bg-white/0 p-3 text-sm outline-none border-b-gray-500 border-white/10 dark:!border-white/10 dark:text-white"
					/>
				</div>
			</div>
			<div className="mt-5 start justify-start">
				<div className="flex justify-start">
					<p className="text-base font-bold text-navy-700 dark:text-white">일정 상세 :</p>
				</div>
				<div className="flex justify-start mb-5">
					<input
						type="text"
						ref={refEventDetail}
						id="eventName"
						defaultValue={selectedEvent?.extendedProps.eventDesc}
						disabled={false}
						className="mt-2 read-only flex h-12 w-full items-center  border bg-white/0 p-3 text-sm outline-none border-b-gray-500 border-white/10 dark:!border-white/10 dark:text-white"
					/>
				</div>
			</div>
		</div>
	);
};
