import { MdCheckCircle } from 'react-icons/md';
import CardMenu from '../../card/CardMenu';
import { useCalendarEvnetParam } from '../../../store/useCalendar';

export const CalendarDetailViewComponent = () => {
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
				<CardMenu />
			</div>
			<div className="h-full w-full">
				<div className="mt-5 flex items-center justify-between p-2">
					<div className="flex items-center justify-center gap-2">
						<p className="text-base font-bold text-navy-700 dark:text-white">{selectedEvent.title}</p>
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
