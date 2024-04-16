import { IoMdHome } from 'react-icons/io';
import { IoDocuments } from 'react-icons/io5';
import { MdBarChart, MdDashboard } from 'react-icons/md';

import { createColumnHelper } from '@tanstack/react-table';
import DailyTraffic from './components/DailyTraffic';
import CheckTable from './components/CheckTable';
import ComplexTable from './components/ComplexTable';
import PieChartCard from './components/PieChartCard';
import TaskCard from './components/TaskCard';
import WeeklyRevenue from './components/WeeklyRevenue';
import MiniCalendar from '../../../components/calendar/MiniCalendar';
import tableDataCheck from './variables/tableDataCheck';
import tableDataComplex from './variables/tableDataComplex';
import Widget from '../../../components/widget/Widget';
import TotalSpent from './components/TotalSpent';
import DashboardCalendarComponent from './components/DashboardCalendarComponent';
import CustomViewTable from '../../../components/table/CustomViewTable';
import { tableNotebookData } from '../equipment/variables/tableHeapDataColumns';

type EquipRow = {
	inUseEmp: string;
	equipModel: string;
	state: string | number;
	date: string;
};

const Dashboard = () => {
	const columnHelper = createColumnHelper<EquipRow>();
	const columns = [
		columnHelper.accessor('inUseEmp', {
			id: 'inUseEmp',
			header: '사용자',
		}),
		columnHelper.accessor('equipModel', {
			id: 'equipModel',
			header: '장비 모델 명',
		}),
		columnHelper.accessor('state', {
			id: 'state',
			header: '상태',
		}),
		columnHelper.accessor('date', {
			id: 'date',
			header: '날짜',
		}),
	];
	return (
		<div>
			{/* Charts */}

			<div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
				<div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-2">
					<CustomViewTable tableData={tableNotebookData} columns={columns} title="나의 일정" />
					<CustomViewTable tableData={tableNotebookData} columns={columns} title="부서 일정" />
				</div>
				<WeeklyRevenue />
			</div>

			{/* Tables & Charts */}

			<div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-2">
				{/* Check Table */}
				<div>
					<DashboardCalendarComponent />
				</div>
				<div>
					<ComplexTable tableData={tableDataCheck} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
