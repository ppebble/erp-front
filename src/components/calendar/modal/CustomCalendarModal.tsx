import {
	Button,
	Card,
	Checkbox,
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
import { EventApi, EventInput } from '@fullcalendar/react';
import { BsSquareFill } from 'react-icons/bs';
import { useQuery, useQueryClient } from 'react-query';
import { MdApps } from 'react-icons/md';
import moment from 'moment';
import {
	useAddEventFlag,
	useCalendarAction,
	useCalendarDialogOpen,
	useCalendarEvnetParam,
	useCalendarParam,
	useEvents,
	useInputEvent,
	useMemberTags,
	useSelectedTag,
	useWorkType,
} from '../../../store/useCalendar';
import { CalendarTaskType, getEventColor, getEventTask } from '../utils/event-utils';
import { TagifyComponent } from '../../tagify/TagifyComponent';
import CalendarService from '../../../services/calendarService';
import Dropdown from '../../dropdown';
import { scheduleResult } from '../../../network/response/scheduleResult';
import { MemberTagInfo } from '../../../store/common/useCommon';

export const CustomCalendarModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	// const [size, setSize] = useState('md');
	const isDialogOpen = useCalendarDialogOpen();
	const memberTags = useMemberTags();
	const selectedTags = useSelectedTag();
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
	const [defStartTime, setDefStartTime] = useState<string | undefined>('');
	const [defEndTime, setDefEndTime] = useState<string | undefined>('');

	const createEvent = CalendarService().createEventMutation;
	const { updateEventMutation, deleteEventMutation } = CalendarService();

	const refEventName = useRef<HTMLInputElement>(null);
	// const token = sessionStorage.getItem('nex_accessToken');
	const refEventStartDate = useRef<HTMLInputElement>(null);
	const refAlterAnnCheck = useRef<HTMLInputElement>(null);
	const refEventEndDate = useRef<HTMLInputElement>(null);
	const refEventStartDateTime = useRef<HTMLInputElement>(null);
	const refEventEndDateTime = useRef<HTMLInputElement>(null);
	const refRegistUser = useRef<HTMLInputElement>(null);
	const members = useSelectedTag();

	const queryClient = useQueryClient();

	const refEventDetail = useRef<HTMLInputElement>(null);
	useQuery(['getMembers'], CalendarService().availableProfile);
	const taskColor = {
		sc: '#1cb9e0',
		sf: '#00e413',
		manage: '#f52b4d',
		dev: '#9842fa',
		personal: '#787f8f',
		sb: '#e9baba',
		myPersonal: '#aaafbb',
	};
	const taskLists = [
		{ id: 'sc', name: 'SC사업부', color: taskColor.sc },
		{ id: 'sf', name: 'SF&신사업부', color: taskColor.sf },
		{ id: 'manage', name: '경영팀', color: taskColor.manage },
		{ id: 'dev', name: '기술개발본부', color: taskColor.dev },
		{ id: 'sb', name: '전략사업본부', color: taskColor.sb },
		{ id: 'personal', name: '개인일정', color: taskColor.personal },
		// { id: 'myPersonal', name: '나의 개인일정', color: taskColor.myPersonal },
	] as const;
	const currentEventParam = useCalendarParam();
	const [selectedTask, setSelectedTask] = useState<CalendarTaskType>({ id: 'personal', name: '개인일정', color: taskColor.personal });

	useEffect(() => {
		if (refAllDaySwitch.current) {
			if (refAllDaySwitch.current?.checked) {
				refEventStartDate.current?.setAttribute('defaultValue', refEventStartDateTime.current?.value?.slice(0, 10) || '');
				refEventEndDate.current?.setAttribute('defaultValue', refEventEndDateTime.current?.value?.slice(0, 10) || '');
			} else {
				refEventStartDateTime.current?.setAttribute('defaultValue', `${refEventStartDate.current?.value}T00:00:00` || '');
				refEventEndDateTime.current?.setAttribute('defaultValue', `${refEventEndDate.current?.value}T23:59:59` || '');
			}
		}
	}, [refEventStartDate.current]);

	const setEvent = async () => {
		setEventParam({});
		const newEvent = {} as scheduleResult;

		// const color = getEventColor(currentEventParam.task.id);
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
			task: { id: currentEventParam.task.id, name: currentEventParam.task.name },
		};
		eventParam.color = getEventColor(currentEventParam.task.id);
		// eventParam.color = color;
		eventParam.allDay = refAllDaySwitch.current?.checked;
		const param = [...events];
		// newEvent.scheduleNo = eventParam.scheduleId;
		newEvent.title = eventParam.title || '';
		newEvent.allDay = eventParam.allDay || false;
		newEvent.start = eventParam.start || '';
		newEvent.end = eventParam.end || '';
		newEvent.eventDesc = eventParam.extendedProps.eventDesc;
		newEvent.register = eventParam.extendedProps.register;
		newEvent.task = eventParam.extendedProps.task.name;

		const result = [] as MemberTagInfo[];
		selectedTags.forEach((item) => {
			const tag = item.split(' | ') || [];
			result.push({ name: tag[0], team: tag[1] });
		});
		newEvent.members = result;
		// calendarAction.setAddEventParam(eventParam);
		if (!eventParam.title) {
			alert('일정 타이틀 입력 누락');
			return;
		}
		if (!eventParam.start) {
			alert('일정 시작일자 입력 누락');
			return;
		}
		if (!eventParam.end) {
			alert('일정 종료일자 입력 누락');
			return;
		}
		if (eventParam.start > eventParam.end) {
			alert('시작일자가 종료일자보다 미래일 수 없습니다.');
			return;
		}

		if (workType === 'add') {
			param.push(eventParam);
			calendarAction.setCalendarEvents(param);
			createEvent.mutate(newEvent);
		} else if (workType === 'edit') {
			const newParam = param.filter((e) => e.id !== eventParam.id);
			newParam.push(eventParam);
			calendarAction.setCalendarEvents(newParam);
			newEvent.scheduleNo = Number.parseInt(selectedEvent?.id || '0', 10);
			updateEventMutation.mutate(newEvent);
		}
		calendarAction.setCalendarDialogFlag(false);

		onClose;
	};
	const deleteEvent = async () => {
		if (workType === 'edit') {
			const params = {} as { scheduleNo: number };
			params.scheduleNo = Number.parseInt(selectedEvent?.id || '0', 10);
			deleteEventMutation.mutate(params);
		}
		calendarAction.setCalendarDialogFlag(false);

		onClose;
	};
	const onClickConfirm = () => {
		setEvent();
	};
	const onClickDelete = () => {
		deleteEvent();
	};

	useEffect(() => {
		if (isDialogOpen) {
			// console.log(selectedEvent);
			calendarAction.setCalendarParam({
				display: 'block',
				task: {
					id: workType === 'edit' ? selectedEvent?.extendedProps.task.id : currentEventParam.task.id,
					name: workType === 'edit' ? selectedEvent?.extendedProps.task.name : currentEventParam.task.name,
					color: workType === 'edit' ? getEventColor(selectedEvent?.extendedProps.task.id) : currentEventParam?.task.color,
				},
			});
			if (refAllDaySwitch.current?.checked === undefined && selectedEvent?.allDay !== undefined) {
				setIsAllDay(selectedEvent?.allDay);

				if (isDialogOpen && workType === 'edit') {
					const startStr = selectedEvent?.startStr ? selectedEvent?.startStr : refEventStartDate.current?.value;
					let endStr = selectedEvent?.endStr ? selectedEvent?.endStr : refEventEndDate.current?.value;
					if (selectedEvent.allDay) {
						endStr = moment(endStr).subtract(1, 'seconds').toISOString();
					}
					if (selectedEvent?.allDay && endStr?.length !== 10) {
						setDefStart(startStr?.slice(0, 10));
						setDefEnd(endStr?.slice(0, 10));
					} else if (endStr?.length === 10 && !selectedEvent?.allDay) {
						setDefStartTime(`${startStr}T00:00:00`);
						setDefEndTime(`${endStr}T23:59:59`);
					} else if (endStr?.length === 10 && selectedEvent.allDay) {
						setDefStart(startStr);
						setDefEnd(endStr);
					} else {
						setDefStartTime(startStr?.slice(0, 16));
						setDefEndTime(endStr?.slice(0, 16));
					}
					calendarAction.setSelectedMembers(selectedEvent?.extendedProps.members);
				}
			} else {
				setIsAllDay(refAllDaySwitch.current?.checked);
			}
			onOpen();
			// console.log(defStart);
			// console.log(defEnd);
		} else {
			calendarAction.setCalendarEventParam({} as EventApi);
			calendarAction.setCalendarParam({
				display: 'block',
				task: {
					id: '',
					name: currentEventParam.task.name,
					color: currentEventParam?.task.color,
				},
			});
			setDefEnd('');
			setDefStart('');
			setDefStartTime('');
			setDefEndTime('');
			onClose();
		}
	}, [isDialogOpen]);
	const activeTask = (task: CalendarTaskType) => {
		if (task.id !== selectedTask.id) {
			setSelectedTask(task);
			calendarAction.setCalendarParam({ display: 'block', task });
		}
	};
	useEffect(() => {
		if (refEventName.current) {
			// if (isAlterAnn) {
			if (refAlterAnnCheck.current?.checked) {
				refEventName.current.disabled = true;
				refEventName.current.setAttribute('value', '대체휴가');
				refEventName.current.setAttribute('defaultValue', '대체휴가');
			} else {
				// refEventName.current?.setAttribute('disabled', 'false');
				refEventName.current.disabled = false;
				refEventName.current?.setAttribute('value', '');
				refEventName.current?.setAttribute('defaultValue', '');
			}
		}
	}, [refAlterAnnCheck.current?.checked]);
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
									if (isDialogOpen) {
										if (refAllDaySwitch.current?.checked) {
											refEventStartDate.current?.setAttribute('value', refEventStartDateTime.current?.value?.slice(0, 10) || '');
											refEventEndDate.current?.setAttribute('value', refEventEndDateTime.current?.value?.slice(0, 10) || '');
										} else {
											refEventStartDateTime.current?.setAttribute('value', `${refEventStartDate.current?.value}T00:00:00` || '');
											refEventEndDateTime.current?.setAttribute('value', `${refEventEndDate.current?.value}T23:59:59` || '');
										}
										const startStr = refAllDaySwitch.current?.checked ? refEventStartDate.current?.value : refEventStartDateTime.current?.value;
										const endStr = refAllDaySwitch.current?.checked ? refEventEndDate.current?.value : refEventEndDateTime.current?.value;

										if (refAllDaySwitch.current?.checked && startStr?.length !== 10) {
											setDefStart(startStr?.slice(0, 10));
											setDefEnd(endStr?.slice(0, 10));
										} else if (startStr?.length === 10 && !refAllDaySwitch.current?.checked) {
											setDefStartTime(`${startStr}T00:00:00`);
											setDefEndTime(`${endStr}T23:59:59`);
										} else if (startStr?.length === 10 && refAllDaySwitch.current?.checked) {
											setDefStart(startStr);
											setDefEnd(endStr);
										} else {
											setDefStartTime(startStr?.slice(0, 16));
											setDefEndTime(endStr?.slice(0, 16));
										}
									}
									// convertDate();
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
						<div className="mt-3 flex justify-between">
							<div className="flex justify-between text-base font-medium text-brand-500 hover:cursor-pointer hover:text-brand-500 dark:text-white">
								<Dropdown
									button={
										<>
											<BsSquareFill color={currentEventParam.task.color} className="mr-2 mt-1" />
											<p className="text-sm text-gray-900 hover:text-gray-600 dark:text-white hover:dark:text-white">{`|  ${currentEventParam.task.name}`}</p>
										</>
									}
									classNames="py-2 top-8 -left-[180px] w-max text-base font-medium text-brand-500 hover:cursor-pointer hover:text-brand-500 dark:text-white"
								>
									<div className="flex w-[180px] flex-col  justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
										<div className="mt-3 ml-4">
											<div className="flex items-center gap-2">
												<p className="text-sm font-bold text-navy-700 dark:text-white"> ✨부서 리스트 </p>{' '}
											</div>
										</div>
										<div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />
										{taskLists.map((e) => {
											return (
												<div
													className="mt-3 ml-4 flex"
													key={e.name}
													onClick={() => {
														activeTask(e);
													}}
												>
													<BsSquareFill color={e.color} className="mr-2" />
													<p className="text-sm text-gray-900 hover:text-gray-600 dark:text-white hover:dark:text-white">{`|  ${e.name}`}</p>
												</div>
											);
										})}

										<div className="mt-3 ml-4 flex flex-col" />
									</div>
								</Dropdown>
							</div>
							<div className="flex items-center">
								<Checkbox
									ref={refAlterAnnCheck}
									// onChange={() => {
									// 	setIsAlterAnn(!isAlterAnn);
									// }}
								/>
								<p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">대체휴가 여부</p>
							</div>
						</div>
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
									ref={refEventStartDateTime}
									id="eventName"
									disabled={false}
									onChange={(e) => {}}
									defaultValue={defStartTime}
									className="mt-2 mr-3 read-only flex h-12 w-full items-center justify-center  border bg-white/0 p-3 text-sm outline-none border-b-gray-500 border-white/10 dark:!border-white/10 dark:text-white"
								/>
								<div className="justify-center items-center flex">
									<p className="tex-base font-bold text-xl">-</p>
								</div>
								<input
									type="datetime-local"
									ref={refEventEndDateTime}
									id="eventName"
									disabled={false}
									onChange={(e) => {
										// console.log(refEventEndDate.current?.value);
									}}
									defaultValue={defEndTime}
									className="mt-2 ml-3 read-only flex h-12 w-full items-center justify-center  border bg-white/0 p-3 text-sm outline-none border-b-gray-500 border-white/10 dark:!border-white/10 dark:text-white"
								/>
							</div>
							<div className={`flex justify-start ${!isAllDay ? 'invisible h-0 mb-0 ' : ''}`}>
								<input
									type="date"
									ref={refEventStartDate}
									id="eventName"
									disabled={false}
									defaultValue={defStart}
									className="mt-2 mr-3 read-only flex h-12 w-full items-center justify-center  border bg-white/0 p-3 text-sm outline-none border-b-gray-500 border-white/10 dark:!border-white/10 dark:text-white"
								/>
								<div className="justify-center items-center flex">
									<p className="tex-base font-bold text-xl">-</p>
								</div>
								<input
									type="date"
									ref={refEventEndDate}
									id="eventName"
									disabled={false}
									onChange={(e) => {
										// console.log(refEventEndDate.current?.value);
									}}
									defaultValue={defEnd}
									className="mt-2 ml-3 read-only flex h-12 w-full items-center justify-center  border bg-white/0 p-3 text-sm outline-none border-b-gray-500 border-white/10 dark:!border-white/10 dark:text-white"
								/>
							</div>
						</div>
						{/* <div className="mt-5 start justify-start">
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
						</div> */}
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
						<div className="mt-5 start justify-start">
							<div className="flex justify-start">
								<p className="text-base font-bold text-navy-700 dark:text-white mb-5">인원 :</p>
							</div>
							<div className="flex justify-start mb-5">
								<TagifyComponent
									// initValue에 edit이면 extendedProps.연관인원리스트 를 넣도록, 아니면 로그인한 인원 profile
									initialValue={workType === 'edit' && isDialogOpen ? selectedEvent?.extendedProps.members : ['']}
									suggestions={memberTags}
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
						className="mr-3"
						onClick={() => {
							calendarAction.setCalendarDialogFlag(false);
							onClose;
						}}
					>
						취소
					</Button>
					<Button
						colorScheme="red"
						onClick={() => {
							calendarAction.setCalendarDialogFlag(false);
							onClickDelete();
							onClose;
						}}
					>
						삭제
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
