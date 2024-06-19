import { MdAddCircleOutline, MdApps, MdSearch } from 'react-icons/md';
import { BsSquareFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { EventApi } from '@fullcalendar/react';
import { Checkbox, CheckboxGroup, useModal } from '@chakra-ui/react';
import { useQuery, useQueryClient } from 'react-query';
import FullCalendarComponent from '../../../components/calendar/FullCalendarComponent';
import Dropdown from '../../../components/dropdown';
import { useCalendarAction, useCalendarDialogOpen, useCalendarParam, useEvents, useFilteredEvents } from '../../../store/useCalendar';
import { CustomCalendarModal } from '../../../components/calendar/modal/CustomCalendarModal';
import { CalendarTaskType } from '../../../components/calendar/utils/event-utils';
import CalendarService from '../../../services/calendarService';
import { taskColor, taskLists } from '../../../store/common/useCommon';

// 부서 필터 default value ... 개인일정... + (로그인한 본인 부서)
let filter = ['personal', 'sc', 'sf', 'manage', 'dev', 'sb', 'lab'] as string[];
const CompanyCalendar = () => {
	const [selectedTask, setSelectedTask] = useState<CalendarTaskType>({ id: 'personal', name: '개인일정', color: taskColor.personal });
	const calendarAction = useCalendarAction();
	const isDialogOpen = useCalendarDialogOpen();

	const calendarParam = useCalendarParam();

	const eventParam = {} as EventApi;
	const events = useEvents();
	const queryClient = useQueryClient();

	useEffect(() => {
		// useCalendar.calendarParam 기본값
		const task = { id: 'personal', name: '개인일정', color: taskColor.personal };
		calendarAction.setCalendarParam({ display: 'block', task });
	}, []);
	useEffect(() => {
		console.log(calendarParam);
	}, [calendarParam]);
	const activeTask = (task: CalendarTaskType) => {
		if (task.id !== selectedTask.id) {
			setSelectedTask(task);
			calendarAction.setCalendarParam({ display: 'block', task });
		}
	};

	return (
		<>
			<CustomCalendarModal />
			<div className="mt-3 grid h-full ">
				<div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
					<div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
						<h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white"> </h4>
						<ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
							<li className="text-base font-medium text-brand-500 hover:cursor-pointer hover:text-brand-500 dark:text-white">
								<Dropdown
									button={<MdSearch className="h-10 w-10" />}
									classNames="py-2 top-8 -left-[180px] w-max text-base font-medium text-brand-500 hover:cursor-pointer hover:text-brand-500 dark:text-white"
								>
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
								</Dropdown>
							</li>
							<li>
								<p className="font-large text-brand-500 hover:cursor-pointer hover:text-brand-500 dark:text-white">
									<MdAddCircleOutline
										className="h-10 w-10"
										onClick={() => {
											// 일정 추가 팝업 모달
											if (!isDialogOpen) {
												calendarAction.setWorkType('add');
												calendarAction.setCalendarParam({
													display: 'block',
													task: {
														id: selectedTask.id,
														name: selectedTask.name,
														color: selectedTask.color,
													},
												});
												calendarAction.setCalendarEventParam(eventParam);
												calendarAction.setCalendarDialogFlag(true);
											}
										}}
									/>
								</p>
							</li>
						</ul>
					</div>
					<FullCalendarComponent />
				</div>
			</div>
		</>
	);
};

export default CompanyCalendar;
