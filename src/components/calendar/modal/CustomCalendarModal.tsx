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
	useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import FullCalendarComponent from '../FullCalendarComponent';
import MiniCalendar from '../MiniCalendar';
import CardMenu from '../../card/CardMenu';
import { useCalendarAction, useCalendarDialogOpen, useCalendarEvnetParam } from '../../../store/useCalendar';
import { CalendarDetailComponent } from './CalendarDetailComponent';

export const CustomCalendarModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [size, setSize] = useState('md');
	const isDialogOpen = useCalendarDialogOpen();
	const calendarAction = useCalendarAction();
	useEffect(() => {
		if (isDialogOpen) {
			onOpen();
		} else {
			onClose();
		}
	}, [isDialogOpen]);

	const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'];

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
				<ModalHeader>일정 추가</ModalHeader>
				<div className="h-px w-full bg-gray-300 dark:bg-white/20 " />
				<ModalCloseButton
					onClick={() => {
						calendarAction.setCalendarDialogFlag(false);
						onClose;
					}}
				/>
				<ModalBody>
					<CalendarDetailComponent />
				</ModalBody>
				<div className="h-px w-full bg-gray-300 dark:bg-white/20 " />
				<ModalFooter>
					<Button
						colorScheme="blue"
						className="mr-3"
						onClick={() => {
							calendarAction.setCalendarDialogFlag(false);
							onClose;
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
