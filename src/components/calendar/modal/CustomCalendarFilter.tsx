import { Checkbox, CheckboxGroup } from '@chakra-ui/react';
import * as React from 'react';
import { useQueryClient } from 'react-query';
import { MdSearch } from 'react-icons/md';
import { useCalendarAction } from '../../../store/useCalendar';
import Dropdown from '../../dropdown';
import { taskColor, taskLists } from '../../../store/common/useCommon';
import { CalendarTaskType } from '../utils/event-utils';

export const CustomCalendarFilter = () => {
	let filter = ['personal', 'sc', 'sf', 'manage', 'dev', 'sb', 'lab', 'holiday'] as string[];
	const [selectedTask, setSelectedTask] = React.useState<CalendarTaskType>({ id: 'personal', name: '개인일정', color: taskColor.personal });

	const calendarAction = useCalendarAction();
	const queryClient = useQueryClient();
	const activeTask = (task: CalendarTaskType) => {
		if (task.id !== selectedTask.id) {
			setSelectedTask(task);
			calendarAction.setCalendarParam({ display: 'block', task });
		}
	};
	return (
		<div className="flex w-[180px] flex-col  justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
			<div className="mt-3 ml-4">
				<div className="flex items-center gap-2">
					<p className="text-sm font-bold text-navy-700 dark:text-white"> ✔ 부서 리스트 </p>{' '}
				</div>
			</div>
			<div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />
			<CheckboxGroup
				onChange={(e) => {
					filter = Object.assign([], e);
					calendarAction.setFilter(filter);
					queryClient.invalidateQueries(['getEvents']);
				}}
				defaultValue={filter}
			>
				{taskLists.map((e) => {
					return (
						<div
							className="mt-3 ml-4 flex"
							key={e.name}
							onClick={() => {
								activeTask(e);
							}}
						>
							<Checkbox color={e.color} className="mr-2" value={e.id} />
							<p className="text-sm text-gray-700  dark:text-white hover:dark:text-white">{`|  ${e.name}`}</p>
						</div>
					);
				})}
			</CheckboxGroup>
			<div className="mt-3 ml-4 flex flex-col" />
		</div>
	);
};
