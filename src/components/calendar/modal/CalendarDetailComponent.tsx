import { useEffect, useRef, useState } from 'react';
import { EventInput } from '@fullcalendar/react';
import {
	useAddEventFlag,
	useCalendarAction,
	useCalendarDialogOpen,
	useCalendarEvnetParam,
	useEvents,
	useInputEvent,
	useWorkType,
} from '../../../store/useCalendar';

export const CalendarDetailComponent = ({ isAllday, isConfirm }: any) => {
	const selectedEvent = useCalendarEvnetParam();
	const isDialogOpen = useCalendarDialogOpen();
	const setCalendar = useCalendarAction();
	const refEventName = useRef<HTMLInputElement>(null);
	const refEventStartDate = useRef<HTMLInputElement>(null);
	const refEventEndDate = useRef<HTMLInputElement>(null);
	const refRegistUser = useRef<HTMLInputElement>(null);
	const refEventDetail = useRef<HTMLInputElement>(null);
	const [isDate, setIsDate] = useState<boolean | undefined>(false);
	const [defStart, setDefStart] = useState<string | undefined>('');
	const [defEnd, setDefEnd] = useState<string | undefined>('');
	const events = useEvents();
	const addEventParam = useInputEvent();

	const eventParam = {} as EventInput;
	// const addFlag = useAddEventFlag();
	const workType = useWorkType();
	useEffect(() => {
		setIsDate(isAllday);
		if (isDialogOpen) {
			if (isAllday) {
				setDefStart(selectedEvent?.startStr?.slice(0, 10));
				setDefEnd(selectedEvent?.endStr?.slice(0, 10));
			} else if (defStart?.length === 10 && selectedEvent?.allDay) {
				setDefStart(`${selectedEvent?.startStr}T00:00:00`);
				setDefEnd(`${selectedEvent?.endStr}T23:59:59`);
			} else {
				setDefStart(selectedEvent?.startStr?.slice(0, 16));
				setDefEnd(selectedEvent?.endStr?.slice(0, 16));
			}
		}
	}, [isAllday, isDialogOpen]);
	useEffect(() => {
		refEventStartDate.current?.setAttribute('value', defStart || '');
		refEventEndDate.current?.setAttribute('value', defEnd || '');
	}, [defStart, defEnd]);
	useEffect(() => {
		setIsDate(selectedEvent?.allDay);
	}, [selectedEvent?.allDay]);

	useEffect(() => {
		eventParam.id = `${refEventName.current?.value}${refEventStartDate.current?.value}`;
		eventParam.title = refEventName.current?.value;
		eventParam.allDay = isAllday;
		// eventParam.start = refEventStartDate.current?.value;
		// eventParam.end = refEventEndDate.current?.value;
		eventParam.start = defStart;
		eventParam.end = defEnd;
		eventParam.extendedProps = {
			register: refRegistUser.current?.value,
			eventDesc: refEventDetail.current?.value,
		};
		eventParam.allDay = isDate;
		const param = [...events];
		setCalendar.setAddEventParam(eventParam);
		if (!eventParam.title) {
			console.log('err');
			return;
		}
		if (!eventParam.start) {
			console.log('err');
			return;
		}
		if (!eventParam.end) {
			console.log('err');
			return;
		}
		if (workType === 'add') {
			param.push(eventParam);
			setCalendar.setCalendarEvents(param);
		} else if (workType === 'edit') {
			const newParam = param.filter((e) => e.id !== eventParam.id);
			newParam.push(eventParam);
			setCalendar.setCalendarEvents(newParam);
		}

		// if (addEventParam.start || addEventParam.end) {
		// 	addEventParam.start = defStart;
		// 	addEventParam.end = defEnd;
		// }

		// setCalendar.setAddFlag(false);
	}, [isConfirm]);

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
						type={`${!isDate ? 'datetime-local' : 'date'}`}
						// type={`${!selectedEvent?.allDay ? 'datetime-local' : 'date'}`}
						ref={refEventStartDate}
						id="eventName"
						disabled={false}
						// defaultValue={selectedEvent?.startStr?.slice(0, 19)}
						defaultValue={defStart}
						// value={defStart}
						className="mt-2 mr-3 read-only flex h-12 w-full items-center justify-center  border bg-white/0 p-3 text-sm outline-none border-b-gray-500 border-white/10 dark:!border-white/10 dark:text-white"
					/>
					<div className="justify-center items-center flex">
						<p className="tex-base font-bold text-xl">-</p>
					</div>
					<input
						// type="datetime-local"
						type={`${!isDate ? 'datetime-local' : 'date'}`}
						// type={`${!selectedEvent?.allDay ? 'datetime-local' : 'date'}`}
						ref={refEventEndDate}
						id="eventName"
						disabled={false}
						onChange={(e) => {
							console.log(refEventEndDate.current?.value);
						}}
						// defaultValue={selectedEvent?.endStr?.slice(0, 19)}
						defaultValue={defEnd}
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
						defaultValue={selectedEvent?.extendedProps?.register}
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
						defaultValue={selectedEvent?.extendedProps?.eventDesc}
						disabled={false}
						className="mt-2 read-only flex h-12 w-full items-center  border bg-white/0 p-3 text-sm outline-none border-b-gray-500 border-white/10 dark:!border-white/10 dark:text-white"
					/>
				</div>
			</div>
		</div>
	);
};
