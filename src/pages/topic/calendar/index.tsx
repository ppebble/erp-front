import { MdAddCircleOutline, MdApps, MdSearch } from 'react-icons/md';
import { BsSquareFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import FullCalendarComponent, { taskColor } from '../../../components/calendar/FullCalendarComponent';
import Dropdown from '../../../components/dropdown';
import { useCalendarAction } from '../../../store/useCalendar';

export type CalendarTaskType = {
	id: string;
	name: string;
	color: string;
};
export type CalendarParam = {
	task: CalendarTaskType;
	display: string;
};

const CompanyCalendar = () => {
	const taskList = [
		{ id: 'sc', name: 'SC사업부', color: taskColor.sc },
		{ id: 'sf', name: 'SF&신사업부', color: taskColor.sf },
		{ id: 'manage', name: '경영팀', color: taskColor.manage },
		{ id: 'dev', name: '기술개발본부', color: taskColor.dev },
		{ id: 'strategicBusinessDivision', name: '전략사업본부', color: taskColor.strategicBusinessDivision },
		{ id: 'personal', name: '개인일정', color: taskColor.personal },
		{ id: 'myPersonal', name: '나의 개인일정', color: taskColor.myPersonal },
	];
	const [display, setDisplay] = useState<string>('block');
	const [selectedTask, setSelectedTask] = useState<CalendarTaskType>({ id: 'personal', name: '개인일정', color: taskColor.personal });
	const calendarAction = useCalendarAction();
	useEffect(() => {
		// useCalendar.calendarParam 기본값
		const task = { id: 'personal', name: '개인일정', color: taskColor.personal };
		calendarAction.setCalendarParam({ display, task });
	}, []);
	const activeTask = (task: CalendarTaskType) => {
		if (task.id !== selectedTask.id) {
			setSelectedTask(task);
			calendarAction.setCalendarParam({ display, task });
		}
	};

	return (
		<div className="mt-3 grid h-full ">
			<div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
				<div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
					<h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white"> </h4>
					<ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
						<li>
							<p className="font-large text-brand-500 hover:cursor-pointer hover:text-brand-500 dark:text-white">
								<MdSearch
									className="h-10 w-10"
									onClick={() => {
										// 조회 팝업 모달
									}}
								/>
							</p>
						</li>
						<li>
							<p className="font-large text-brand-500 hover:cursor-pointer hover:text-brand-500 dark:text-white">
								<MdAddCircleOutline
									className="h-10 w-10"
									onClick={() => {
										// 일정 추가 팝업 모달
									}}
								/>
							</p>
						</li>
						<li className="text-base font-medium text-brand-500 hover:cursor-pointer hover:text-brand-500 dark:text-white">
							<Dropdown
								button={<MdApps className="h-10 w-10" />}
								classNames="py-2 top-8 -left-[180px] w-max text-base font-medium text-brand-500 hover:cursor-pointer hover:text-brand-500 dark:text-white"
							>
								<div className="flex w-[180px] flex-col  justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
									<div className="mt-3 ml-4">
										<div className="flex items-center gap-2">
											<p className="text-sm font-bold text-navy-700 dark:text-white"> ✨부서 리스트 </p>{' '}
										</div>
									</div>
									<div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />
									{taskList.map((e) => {
										return (
											<div
												className="mt-3 ml-4 flex"
												key={e.name}
												onClick={() => {
													activeTask(e);
												}}
											>
												<BsSquareFill color={e.color} className="mr-2" />
												<p
													className={`text-sm ${selectedTask.id === e.id ? 'text-gray-800' : 'text-gray-200'} dark:text-white hover:dark:text-white`}
												>{`|  ${e.name}`}</p>
											</div>
										);
									})}

									<div className="mt-3 ml-4 flex flex-col" />
								</div>
							</Dropdown>
						</li>
					</ul>
				</div>
				<FullCalendarComponent />
			</div>
		</div>
	);
};

export default CompanyCalendar;
