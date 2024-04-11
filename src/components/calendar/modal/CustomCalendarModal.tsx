import {
	Button,
	Card,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Switch,
	useDisclosure,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
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
import { CalendarDetailComponent } from './CalendarDetailComponent';

export const CustomCalendarModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	// const [size, setSize] = useState('md');
	const isDialogOpen = useCalendarDialogOpen();
	const addEventParam = useInputEvent();
	const [isConfirm, setIsConfirm] = useState<boolean>(false);
	const events = useEvents();
	const calendarAction = useCalendarAction();
	const refAllDaySwitch = useRef<HTMLInputElement>(null);
	const selectedEvent = useCalendarEvnetParam();
	// const isAdd = useAddEventFlag();
	const [isAllDay, setIsAllDay] = useState<boolean | undefined>(false);
	const [eventParam, setEventParam] = useState<EventInput>(addEventParam);
	const workType = useWorkType();

	const [defStart, setDefStart] = useState<string | undefined>('');
	const [defEnd, setDefEnd] = useState<string | undefined>('');

	const refEventName = useRef<HTMLInputElement>(null);
	const refEventStartDate = useRef<HTMLInputElement>(null);
	const refEventEndDate = useRef<HTMLInputElement>(null);
	const refEventStartDateTime = useRef<HTMLInputElement>(null);
	const refEventEndDateTime = useRef<HTMLInputElement>(null);
	const refRegistUser = useRef<HTMLInputElement>(null);
	const refEventDetail = useRef<HTMLInputElement>(null);

	// useEffect(() => {
	// 	if (isDialogOpen && workType === 'edit') {
	// 		if (refAllDaySwitch.current?.checked && selectedEvent?.startStr?.length !== 10) {
	// 			setDefStart(selectedEvent?.startStr?.slice(0, 10));
	// 			setDefEnd(selectedEvent?.endStr?.slice(0, 10));
	// 		} else if (selectedEvent?.startStr?.length === 10 && !refAllDaySwitch.current?.checked) {
	// 			setDefStart(`${selectedEvent?.startStr}T00:00:00`);
	// 			setDefEnd(`${selectedEvent?.endStr}T23:59:59`);
	// 		} else {
	// 			setDefStart(selectedEvent?.startStr?.slice(0, 16));
	// 			setDefEnd(selectedEvent?.endStr?.slice(0, 16));
	// 		}
	// 	}
	// }, [refAllDaySwitch.current?.checked]);
	const convertDate = useCallback(() => {
		if (isDialogOpen && workType === 'edit') {
			if (refAllDaySwitch.current?.checked && selectedEvent?.startStr?.length !== 10) {
				setDefStart(selectedEvent?.startStr?.slice(0, 10));
				setDefEnd(selectedEvent?.endStr?.slice(0, 10));
			} else if (selectedEvent?.startStr?.length === 10 && !refAllDaySwitch.current?.checked) {
				setDefStart(`${selectedEvent?.startStr}T00:00:00`);
				setDefEnd(`${selectedEvent?.endStr}T23:59:59`);
			} else {
				setDefStart(selectedEvent?.startStr?.slice(0, 16));
				setDefEnd(selectedEvent?.endStr?.slice(0, 16));
			}
		}
	}, [isDialogOpen, selectedEvent?.endStr, selectedEvent?.startStr, workType]);

	useEffect(() => {
		console.log(defStart);
		console.log(defEnd);
	}, [defEnd]);

	const setEvnet = async () => {
		// console.log(addEventParam);
		// if (!addEventParam.title) {
		// 	console.log('err');
		// 	return;
		// }
		// if (!addEventParam.start) {
		// 	console.log('err');
		// 	return;
		// }
		// if (!addEventParam.end) {
		// 	console.log('err');
		// 	return;
		// }
		eventParam.id = `${refEventName.current?.value}${refEventStartDate.current?.value}`;
		eventParam.title = refEventName.current?.value;
		// eventParam.allDay = isAllDay;
		eventParam.allDay = refAllDaySwitch.current?.checked;
		eventParam.start = refEventStartDate.current?.value ? refEventStartDate.current?.value : refEventStartDateTime.current?.value;
		eventParam.end = refEventEndDate.current?.value ? refEventEndDate.current?.value : refEventEndDateTime.current?.value;
		// eventParam.start = defStart;
		// eventParam.end = defEnd;
		eventParam.extendedProps = {
			register: refRegistUser.current?.value,
			eventDesc: refEventDetail.current?.value,
		};
		eventParam.allDay = isAllDay;
		const param = [...events];
		calendarAction.setAddEventParam(eventParam);
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
			calendarAction.setCalendarEvents(param);
		} else if (workType === 'edit') {
			const newParam = param.filter((e) => e.id !== eventParam.id);
			newParam.push(eventParam);
			calendarAction.setCalendarEvents(newParam);
		}
		console.log(defStart);
		console.log(defEnd);

		// calendarAction.setCalendarEvents(events);
		calendarAction.setCalendarDialogFlag(false);
		onClose;
	};
	const onClickConfirm = () => {
		setEvnet();
	};

	// useEffect(() => {
	// 	setIsAllDay(selectedEvent?.allDay);
	// }, []);
	// useEffect(() => {
	// 	setEvnet();
	// }, [addEventParam]);

	useEffect(() => {
		if (isDialogOpen) {
			if (refAllDaySwitch.current?.checked === undefined && selectedEvent?.allDay !== undefined) {
				setIsAllDay(selectedEvent?.allDay);
				// refAllDaySwitch.current?.checked === true;
				if (isDialogOpen && workType === 'edit') {
					if (selectedEvent?.allDay && defStart?.length !== 10) {
						setDefStart(selectedEvent?.startStr?.slice(0, 10));
						setDefEnd(selectedEvent?.endStr?.slice(0, 10));
					} else if (defStart?.length === 10 && !selectedEvent?.allDay) {
						setDefStart(`${selectedEvent?.startStr}T00:00:00`);
						setDefEnd(`${selectedEvent?.endStr}T23:59:59`);
					} else {
						setDefStart(selectedEvent?.startStr?.slice(0, 16));
						setDefEnd(selectedEvent?.endStr?.slice(0, 16));
					}
				}
			} else {
				setIsAllDay(refAllDaySwitch.current?.checked);
			}
			onOpen();
			console.log(defStart);
			console.log(defEnd);
		} else {
			onClose();
		}
	}, [isDialogOpen]);

	return (
		<Modal
			onClose={() => {
				calendarAction.setCalendarDialogFlag(false);
				onClose;
			}}
			size="xl"
			isOpen={isOpen}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					<div className="flex justify-between">
						일정 추가/수정
						<div className="flex mr-5 items-center">
							<Switch
								id="switch5"
								ref={refAllDaySwitch}
								// value={isAllDay}
								// checked={!!selectedEvent?.allDay}
								defaultChecked={isAllDay || selectedEvent?.allDay}
								onChange={() => {
									setIsAllDay(!isAllDay);
									// if (isDialogOpen && workType === 'edit') {
									// 	if (selectedEvent?.allDay && defStart?.length !== 10) {
									// 		setDefStart(selectedEvent?.startStr?.slice(0, 10));
									// 		setDefEnd(selectedEvent?.endStr?.slice(0, 10));
									// 	} else if (defStart?.length === 10 && selectedEvent?.allDay) {
									// 		setDefStart(`${selectedEvent?.startStr}T00:00:00`);
									// 		setDefEnd(`${selectedEvent?.endStr}T23:59:59`);
									// 	} else {
									// 		setDefStart(selectedEvent?.startStr?.slice(0, 16));
									// 		setDefEnd(selectedEvent?.endStr?.slice(0, 16));
									// 	}
									// }
									convertDate();
								}}
							/>
							<label htmlFor="checkbox5" className="text-base text-ms ml-3 font-small text-navy-700 dark:text-white">
								종일 여부
							</label>
						</div>
					</div>
				</ModalHeader>
				<div className="h-px w-full bg-gray-300 dark:bg-white/20 " />
				<ModalCloseButton
					onClick={() => {
						calendarAction.setCalendarDialogFlag(false);
						onClose;
					}}
				/>
				<ModalBody>
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
							<div className={`flex justify-start ${isAllDay ? 'invisible h-0 mb-0 ' : ''}`}>
								<input
									type="datetime-local"
									// type={`${!selectedEvent?.allDay ? 'datetime-local' : 'date'}`}
									ref={refEventStartDateTime}
									id="eventName"
									disabled={false}
									// defaultValue={selectedEvent?.startStr?.slice(0, 19)}
									// defaultValue={refEventStartDate.current?.value}
									defaultValue={defStart}
									className="mt-2 mr-3 read-only flex h-12 w-full items-center justify-center  border bg-white/0 p-3 text-sm outline-none border-b-gray-500 border-white/10 dark:!border-white/10 dark:text-white"
								/>
								<div className="justify-center items-center flex">
									<p className="tex-base font-bold text-xl">-</p>
								</div>
								<input
									// type="datetime-local"
									// type={`${!isAllDay ? 'datetime-local' : 'date'}`}
									type="datetime-local"
									// type={`${!selectedEvent?.allDay ? 'datetime-local' : 'date'}`}
									ref={refEventEndDateTime}
									id="eventName"
									disabled={false}
									onChange={(e) => {
										console.log(refEventEndDate.current?.value);
									}}
									// defaultValue={selectedEvent?.endStr?.slice(0, 19)}
									// defaultValue={refEventEndDate.current?.value}
									defaultValue={defEnd}
									className="mt-2 ml-3 read-only flex h-12 w-full items-center justify-center  border bg-white/0 p-3 text-sm outline-none border-b-gray-500 border-white/10 dark:!border-white/10 dark:text-white"
								/>
							</div>
							<div className={`flex justify-start ${!isAllDay ? 'invisible h-0 mb-0 ' : ''}`}>
								<input
									type="date"
									// type={`${!selectedEvent?.allDay ? 'datetime-local' : 'date'}`}
									ref={refEventStartDate}
									id="eventName"
									disabled={false}
									// defaultValue={selectedEvent?.startStr?.slice(0, 19)}
									// defaultValue={refEventStartDate.current?.value}
									defaultValue={defStart}
									className="mt-2 mr-3 read-only flex h-12 w-full items-center justify-center  border bg-white/0 p-3 text-sm outline-none border-b-gray-500 border-white/10 dark:!border-white/10 dark:text-white"
								/>
								<div className="justify-center items-center flex">
									<p className="tex-base font-bold text-xl">-</p>
								</div>
								<input
									// type="datetime-local"
									// type={`${!isAllDay ? 'datetime-local' : 'date'}`}
									type="date"
									// type={`${!selectedEvent?.allDay ? 'datetime-local' : 'date'}`}
									ref={refEventEndDate}
									id="eventName"
									disabled={false}
									onChange={(e) => {
										console.log(refEventEndDate.current?.value);
									}}
									// defaultValue={selectedEvent?.endStr?.slice(0, 19)}
									// defaultValue={refEventEndDate.current?.value}
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
				</ModalBody>
				<div className="h-px w-full bg-gray-300 dark:bg-white/20 " />
				<ModalFooter>
					<Button
						colorScheme="blue"
						className="mr-3"
						onClick={() => {
							setIsConfirm(!isConfirm);
							onClickConfirm();
						}}
					>
						확인
					</Button>
					<Button
						colorScheme="red"
						onClick={() => {
							calendarAction.setCalendarDialogFlag(false);
							onClose;
						}}
					>
						취소
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
