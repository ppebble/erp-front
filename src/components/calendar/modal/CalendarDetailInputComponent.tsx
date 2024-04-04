import { MdCheckCircle } from 'react-icons/md';
import { Input } from '@chakra-ui/react';
import CardMenu from '../../card/CardMenu';
import { useCalendarEvnetParam } from '../../../store/useCalendar';
import InputField from '../../fields/InputField';

export const CalendarDetailInputComponent = () => {
	const selectedEvent = useCalendarEvnetParam();
	return (
		<>
			<div className="relative flex flex-row justify-between">
				<div className="flex items-center">
					<div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-100 dark:bg-white/5">
						<MdCheckCircle className="h-6 w-6 text-brand-500 dark:text-white" />
					</div>
					<h4 className="ml-4 text-xl font-bold text-navy-700 dark:text-white">Event</h4>
				</div>
			</div>
			<div className="h-full w-full">
				<div className="mt-5 flex items-center p-2">
					<div className="flex items-center justify-center gap-2">
						<p className="text-base font-bold text-navy-700 dark:text-white">이벤트 명 :</p>
					</div>
					<div className="flex items-center justify-center gap-2">
						{/* <input
							width="100px"
							type="text"
							id="eventName"
							placeholder="event name"
							className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
						/> */}
						<Input />
					</div>
				</div>
				<div className="mt-2 flex items-center justify-between p-2">
					<div className="flex items-center justify-center gap-2">
						<p className="text-base font-bold text-navy-700 dark:text-white">
							{selectedEvent.startStr} - {selectedEvent.endStr}
						</p>
					</div>
				</div>
				<div className="mt-2 flex items-center justify-between p-2">
					<div className="flex items-center justify-center gap-2">
						<p className="text-base font-bold text-navy-700 dark:text-white">Dashboard Builder</p>
					</div>
				</div>
				<div className="mt-2 flex items-center justify-between p-2">
					<div className="flex items-center justify-center gap-2">
						<p className="text-base font-bold text-navy-700 dark:text-white">Landing Page Design</p>
					</div>
				</div>
				<div className="mt-2 flex items-center justify-between p-2">
					<div className="flex items-center justify-center gap-2">
						<p className="text-base font-bold text-navy-700 dark:text-white">Dashboard Builder</p>
					</div>
				</div>
			</div>
		</>
	);
};
