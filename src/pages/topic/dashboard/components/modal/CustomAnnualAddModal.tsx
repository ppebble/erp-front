import {
	AlertDialogContent,
	AlertDialogHeader,
	Button,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogFooter,
	useDisclosure,
	Select,
} from '@chakra-ui/react';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { EventInput } from '@fullcalendar/react';
import ReactSignatureCanvas from 'react-signature-canvas';
import {
	useCalendarDialogOpen,
	useCalendarEvnetParam,
	useCalendarParam,
	useEvents,
	useInputEvent,
	useWorkType,
} from '../../../../../store/useCalendar';
import { getEventColor } from '../../../../../components/calendar/utils/event-utils';
import { scheduleResult } from '../../../../../network/response/scheduleResult';
import CalendarService from '../../../../../services/calendarService';

export const CustomAnnualAddModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	// const [size, setSize] = useState('md');
	const isDialogOpen = useCalendarDialogOpen();
	const [isConfirm, setIsConfirm] = useState<boolean>(false);
	// const refAnnType = useRef<HTMLSelectElement>(null);
	const [annType, setAnnType] = useState<string>('연차');
	const selectedEvent = useCalendarEvnetParam();
	// const isAdd = useAddEventFlag();
	const [eventParam, setEventParam] = useState<scheduleResult>({} as scheduleResult);

	const [defStart, setDefStart] = useState<string | undefined>('');
	const [defEnd, setDefEnd] = useState<string | undefined>('');

	const refEventDesc = useRef<HTMLInputElement>(null);
	const refEventStartDate = useRef<HTMLInputElement>(null);
	const refEventEndDate = useRef<HTMLInputElement>(null);
	const refAnnHalfDate = useRef<HTMLInputElement>(null);

	const refSignCanvas = useRef() as MutableRefObject<any>;

	useEffect(() => {
		// if (refAllDaySwitch.current) {
		// 	if (refAllDaySwitch.current?.checked) {
		// 		refEventStartDate.current?.setAttribute('defaultValue', refEventStartDateTime.current?.value?.slice(0, 10) || '');
		// 		refEventEndDate.current?.setAttribute('defaultValue', refEventEndDateTime.current?.value?.slice(0, 10) || '');
		// 	} else {
		// 		refEventStartDateTime.current?.setAttribute('defaultValue', `${refEventStartDate.current?.value}T00:00:00` || '');
		// 		refEventEndDateTime.current?.setAttribute('defaultValue', `${refEventEndDate.current?.value}T23:59:59` || '');
		// 	}
		// }
	}, [refEventStartDate.current]);
	const createEvent = CalendarService().createEventMutation;

	const setEvnet = async () => {
		setEventParam({} as scheduleResult);
		eventParam.eventDesc = refEventDesc.current?.value || '';
		eventParam.title = `[${annType}]`;

		let endDate;
		let startDate;
		if (annType.includes('반차')) {
			if (annType === '오전반차') {
				startDate = `${refAnnHalfDate.current?.value.slice(0, 10)}T09:00`;
				endDate = `${refAnnHalfDate.current?.value.slice(0, 10)}T14:00`;
			} else if (annType === '오후반차') {
				startDate = `${refAnnHalfDate.current?.value.slice(0, 10)}T13:00`;
				endDate = `${refAnnHalfDate.current?.value.slice(0, 10)}T18:00`;
			}
			eventParam.allDay = false;
		} else {
			eventParam.allDay = true;
			startDate = refEventStartDate.current?.value;
			endDate = refEventEndDate.current?.value;
		}
		eventParam.start = startDate || '';
		eventParam.end = endDate || '';
		eventParam.task = '개인일정';
		eventParam.members = [];
		eventParam.register;

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
		// 연차 일정 신청
		createEvent.mutate(eventParam);

		// 연차 신청서 작성

		onClose();
	};
	const onClickConfirm = () => {
		setEvnet();
	};

	useEffect(() => {
		if (isDialogOpen) {
			onOpen();
		} else {
			setDefEnd('');
			setDefStart('');
			onClose();
		}
	}, [isDialogOpen]);

	return (
		<AlertDialogContent>
			<AlertDialogHeader>
				<div className="flex justify-between">
					<p>휴가 신청</p>
				</div>
			</AlertDialogHeader>
			<div className="h-px w-full bg-gray-300 dark:bg-white/20 " />
			<AlertDialogCloseButton
				onClick={() => {
					onClose;
				}}
			/>
			<AlertDialogBody>
				<div className="grid h-full grid-cols-1">
					<div className="mt-5 start justify-start">
						<div className="flex justify-start">
							<p className="text-base font-bold text-navy-700 dark:text-white">사유 :</p>
						</div>
						<div className="flex justify-start">
							<input
								type="text"
								ref={refEventDesc}
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
						<div className={`${annType.includes('반차') ? 'invisible h-0 mb-0' : ''}`}>
							<div className="flex justify-start">
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
									defaultValue={defEnd}
									className="mt-2 ml-3 read-only flex h-12 w-full items-center justify-center  border bg-white/0 p-3 text-sm outline-none border-b-gray-500 border-white/10 dark:!border-white/10 dark:text-white"
								/>
							</div>
						</div>
						<div className={`${annType.includes('반차') ? '' : 'invisible h-0 mb-0'}`}>
							<div className="flex justify-start">
								<input
									type="date"
									ref={refAnnHalfDate}
									id="eventName"
									disabled={false}
									defaultValue={defStart}
									className="mt-2 mr-3 read-only flex h-12 w-full items-center justify-center  border bg-white/0 p-3 text-sm outline-none border-b-gray-500 border-white/10 dark:!border-white/10 dark:text-white"
								/>
							</div>
						</div>
					</div>
					<div className="mt-5 start justify-start">
						<div className="flex justify-start">
							<p className="text-base font-bold text-navy-700 dark:text-white">승인 :</p>
						</div>
						<div className="flex justify-start mb-5">
							<Select id="task" className="!min-w-[120px]">
								<option value="ann">김용걸대표</option>
								<option value="annHalf">김상순상무</option>
								<option value="경영팀">박지용이사</option>
							</Select>
						</div>
					</div>
					<div className="mt-5 start justify-start">
						<div className="flex justify-start">
							<p className="text-base font-bold text-navy-700 dark:text-white">서명 :</p>
						</div>
						<div className="flex justify-start mb-5">
							<ReactSignatureCanvas ref={refSignCanvas} canvasProps={{ className: 'border bg-gray-100' }} />
							<Button
								colorScheme="red"
								className="ml-3"
								onClick={() => {
									refSignCanvas.current?.clear();
								}}
							>
								지우기
							</Button>
							<Button
								colorScheme="blue"
								className="ml-3"
								onClick={() => {
									console.log(refSignCanvas.current?.toDataURL());
								}}
							>
								코드확인
							</Button>
						</div>
					</div>
				</div>
			</AlertDialogBody>
			<div className="h-px w-full bg-gray-300 dark:bg-white/20 " />
			<AlertDialogFooter>
				<Select
					onChange={(e) => {
						setAnnType(e.target.value);
					}}
					id="task"
					className="!min-w-[120px]"
				>
					<option value="연차">연차</option>
					<option value="오전반차">오전 반차</option>
					<option value="오후반차">오후 반차</option>
					<option value="경조">경조</option>
					<option value="결근">결근</option>
					{/* <option value="조퇴">조퇴</option> */}
					{/* <option value="외출">외출</option>
					<option value="월차">월차</option> */}
					<option value="하기휴가">하기휴가</option>
				</Select>
				<Button
					colorScheme="blue"
					className="mr-3 ml-3"
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
						onClose;
					}}
				>
					취소
				</Button>
			</AlertDialogFooter>
		</AlertDialogContent>
	);
};
