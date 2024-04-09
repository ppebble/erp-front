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
import { useAddEventFlag, useCalendarAction, useCalendarDialogOpen, useCalendarEvnetParam, useInputEvent } from '../../../store/useCalendar';
import { CalendarDetailComponent } from './CalendarDetailComponent';

export const CustomCalendarModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	// const [size, setSize] = useState('md');
	const isDialogOpen = useCalendarDialogOpen();
	const addEventParam = useInputEvent();
	const addFlag = useAddEventFlag();
	const calendarAction = useCalendarAction();
	const refAllDaySwitch = useRef<HTMLInputElement>(null);
	const selectedEvent = useCalendarEvnetParam();
	const isAdd = useAddEventFlag();
	const [isAllDay, setIsAllDay] = useState<boolean | undefined>(selectedEvent?.allDay);

	const onClickConfirm = () => {
		calendarAction.setAddFlag(true);
	};
	useEffect(() => {
		setIsAllDay(selectedEvent?.allDay);
	}, []);

	useEffect(() => {
		if (isDialogOpen) {
			if (refAllDaySwitch.current?.checked === undefined && selectedEvent?.allDay) {
				setIsAllDay(selectedEvent?.allDay);
				// refAllDaySwitch.current?.checked === true;
			} else {
				setIsAllDay(refAllDaySwitch.current?.checked);
			}
			onOpen();
		} else {
			onClose();
		}
	}, [isDialogOpen]);
	useEffect(() => {
		if (refAllDaySwitch.current?.checked === undefined && selectedEvent?.allDay) {
			setIsAllDay(selectedEvent?.allDay);
		}
		setIsAllDay(refAllDaySwitch.current?.checked);
	}, [isAllDay, isDialogOpen]);
	// const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'];
	// useEffect(() => {
	// 	if (!isAdd) {
	// 		console.log(addEventParam);
	// 	}
	// }, [isAdd]);

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
						일정 추가
						<div className="flex mr-5 items-center">
							<Switch
								id="switch5"
								ref={refAllDaySwitch}
								// value={isAllDay}
								// checked={!!selectedEvent?.allDay}
								defaultChecked={isAllDay || selectedEvent?.allDay}
								onChange={() => {
									setIsAllDay(!isAllDay);
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
					<CalendarDetailComponent isAllday={isAllDay} />
				</ModalBody>
				<div className="h-px w-full bg-gray-300 dark:bg-white/20 " />
				<ModalFooter>
					<Button colorScheme="blue" className="mr-3" onClick={onClickConfirm}>
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
