import { IoMdHome } from 'react-icons/io';
import { IoDocuments } from 'react-icons/io5';
import { MdBarChart, MdCatchingPokemon, MdDashboard, MdGrid3X3, MdLaptopChromebook, MdMonitorWeight } from 'react-icons/md';

import { FaMobile, FaMobileAlt, FaServer } from 'react-icons/fa';
import { HiDesktopComputer, HiOutlineDesktopComputer } from 'react-icons/hi';
import { FiMonitor } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import WeeklyRevenue from './components/WeeklyRevenue';
import Widget from '../../../components/widget/Widget';
import TotalSpent from './components/TotalSpent';
import EquipTable from './components/EquipTable';
import {
	tableDesktopData,
	tableEtcData,
	tableMobileData,
	tableMonitorData,
	tableNotebookData,
	tableServerData,
} from './variables/tableHeapDataColumns';
import CustomClickableOneLineWidget from '../../../components/widget/CustomOneLineWidget';
import CustomViewTable from '../../../components/table/CustomViewTable';

type EquipRow = {
	inUseEmp: string;
	equipModel: string;
	state: string | number;
	date: string;
};

const Equipment = () => {
	const [title, setTitle] = useState<string>('');
	const [data, setData] = useState<EquipRow[]>([]);
	// useEffect(() => {}, [data]);
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
			{/* Card widget */}

			<div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
				<CustomClickableOneLineWidget
					icon={<MdLaptopChromebook className="h-7 w-7" />}
					title="노트북"
					onClickHandler={() => {
						setTitle('노트북');
						setData(tableNotebookData);
					}}
				/>
				<CustomClickableOneLineWidget
					icon={<HiOutlineDesktopComputer className="h-6 w-6" />}
					onClickHandler={() => {
						setData(tableDesktopData);
						setTitle('데스크탑');
					}}
					title="데스크탑"
				/>
				<CustomClickableOneLineWidget
					icon={<FiMonitor className="h-7 w-7" />}
					title="모니터"
					onClickHandler={() => {
						setTitle('모니터');
						setData(tableMonitorData);
					}}
				/>
				<CustomClickableOneLineWidget
					icon={<FaServer className="h-6 w-6" />}
					title="서버장비"
					onClickHandler={() => {
						setData(tableServerData);
						setTitle('서버장비');
					}}
				/>
				<CustomClickableOneLineWidget
					icon={<FaMobileAlt className="h-7 w-7" />}
					title="모바일"
					onClickHandler={() => {
						setData(tableMobileData);
						setTitle('모바일');
					}}
				/>
				<CustomClickableOneLineWidget
					icon={<MdGrid3X3 className="h-6 w-6" />}
					title="기타 장비"
					onClickHandler={() => {
						setData(tableEtcData);
						setTitle('기타장비');
					}}
				/>
			</div>

			{/* Charts */}

			<div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-1">
				<CustomViewTable title={title} tableData={data} columns={columns} />
			</div>
		</div>
	);
};

export default Equipment;
