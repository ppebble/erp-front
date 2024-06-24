import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import SwiperCore, { Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GoDot, GoDotFill } from 'react-icons/go';

import { Button } from '@chakra-ui/react';
import DashboardCalendarComponent from './components/DashboardCalendarComponent';
import CustomViewTable from '../../../components/table/CustomViewTable';
import AnnualComponent from './components/AnnualComponent';
import { useDeptEvents, usePersonalEvents } from '../../../store/useCalendar';
import CalendarService from '../../../services/calendarService';
import WeeklyAttendanceComponent from './components/WeeklyAttendanceComponent';
import MonthAttendanceComponent from './components/MonthAttendanceComponent';
import 'swiper/swiper.min.css';
import DashboardAttendComponent from './components/DashboardAttendComponent';
import AnnualService from '../../../services/annualService';
import { AnnReqProps, useAnnRequest, usePersonalAnnual } from '../../../store/useAnnual';
import { CustomAnnualDetailExternalComponent } from './components/modal/CustomAnnualDetailExternalComponent';

type ScheduleRow = {
	date: string;
	members?: string;
	title: string | number;
};

const Dashboard = () => {
	const scheduleColumnHelper = createColumnHelper<ScheduleRow>();

	const dailyDept = useDeptEvents();
	const dailyPersonal = usePersonalEvents();
	const [personalParams, setPersonalParams] = useState<ScheduleRow[]>([]);
	const [isAttWeek, setIsAttWeek] = useState<boolean>(true);
	const [deptParams, setDeptParams] = useState<ScheduleRow[]>([]);
	const { isSuccess, refetch } = useQuery(['getDailyEvents'], CalendarService().getDeptEvent);
	const [positionX, setPositionX] = useState<number>(0);

	useQuery(['getPersonalAnnual'], AnnualService().getPersonalAnnual);
	useQuery(['getAnnReqList'], AnnualService().getAnnualRequest);
	useQuery(['getManagerList'], AnnualService().getManagerList);

	const columns = [
		scheduleColumnHelper.accessor('date', {
			id: 'date',
			header: '시간',
		}),
		scheduleColumnHelper.accessor('title', {
			id: 'title',
			header: '일정',
		}),
	];
	const taskColumns = [
		scheduleColumnHelper.accessor('date', {
			id: 'date',
			header: '시간',
		}),
		scheduleColumnHelper.accessor('members', {
			id: 'members',
			header: '참여인원',
		}),
		scheduleColumnHelper.accessor('title', {
			id: 'title',
			header: '일정',
		}),
	];

	useEffect(() => {
		if (isSuccess) {
			setDeptParams(
				dailyDept.map((e) => {
					return {
						date: e.allDay ? '종일' : e.date,
						members: e.members,
						title: e.title,
					};
				}),
			);
			setPersonalParams(
				dailyPersonal.map((e) => {
					return {
						date: e.allDay ? '종일' : e.date,
						title: e.title,
					};
				}),
			);
		}
	}, [isSuccess]);
	return (
		<div className="grid grid-cols-12 gap-2 md:grid-cols-12">
			<div className="grid grid-cols-12 gap-2 col-span-12 md:grid-cols-12 col-span-12">
				<div className="grid grid-cols-1 gap-2 md:grid-cols-1 col-span-12">
					<AnnualComponent />
				</div>
				<div className="col-span-3">
					<CustomViewTable tableData={personalParams} columns={columns} title="나의 일정" />
				</div>

				<div className="col-span-4">
					<CustomViewTable tableData={deptParams} columns={taskColumns} title="부서 일정" />
				</div>
				<div className="col-span-5">
					<CustomAnnualDetailExternalComponent />
				</div>
			</div>
			{/* Tables & Charts */}
			<div className="grid grid-cols-12 gap-2 col-span-12 ">
				<div className="col-span-7">
					<DashboardCalendarComponent />
				</div>
				<div className="col-span-5">
					<DashboardAttendComponent />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
