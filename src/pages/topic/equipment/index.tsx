import { MdGrid3X3, MdLaptopChromebook } from 'react-icons/md';

import { FaBook, FaMobileAlt, FaServer } from 'react-icons/fa';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { FiMonitor } from 'react-icons/fi';
import { useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';

import {
	tableDesktopData,
	tableEtcData,
	tableMobileData,
	tableMonitorData,
	tableNotebookData,
	tableServerData,
} from './variables/tableHeapDataColumns';
import CustomClickableOneLineWidget from '../../../components/widget/CustomOneLineWidget';
import CustomScrollViewTable from '../../../components/table/CustomScrollViewTable';
import CustomPagingViewTable from '../../../components/table/CustomPagingViewTable';

type EquipRow = {
	inUseEmp: string;
	equipModel: string;
	state: string | number;
	date: string;
};

const Equipment = () => {
	const [title, setTitle] = useState<string>('노트북');
	const [data, setData] = useState<EquipRow[]>(tableNotebookData);
	// useEffect(() => {}, [data]);
	const columnHelper = createColumnHelper<EquipRow>();
	const columns = [
		columnHelper.accessor('inUseEmp', {
			id: 'inUseEmp',
			header: '사용자',
			enableColumnFilter: true,
		}),
		columnHelper.accessor('equipModel', {
			id: 'equipModel',
			header: '장비 모델 명',
			enableColumnFilter: true,
		}),
		columnHelper.accessor('state', {
			id: 'state',
			header: '상태',
			enableColumnFilter: true,
		}),
		columnHelper.accessor('date', {
			id: 'date',
			header: '날짜',
		}),
	];
	return (
		<div className="flex grid grid-cols-12 min-h-[45rem]">
			<div className="mt-3 mr-5 col-span-2">
				<CustomClickableOneLineWidget
					icon={<MdLaptopChromebook className="h-7 w-7" />}
					title="노트북"
					onClickHandler={() => {
						setTitle('노트북');
						setData(tableNotebookData);
					}}
					selectedTitle={title}
				/>
				<CustomClickableOneLineWidget
					icon={<HiOutlineDesktopComputer className="h-6 w-6" />}
					onClickHandler={() => {
						setData(tableDesktopData);
						setTitle('데스크탑');
					}}
					title="데스크탑"
					selectedTitle={title}
				/>
				<CustomClickableOneLineWidget
					icon={<FiMonitor className="h-7 w-7" />}
					title="모니터"
					onClickHandler={() => {
						setTitle('모니터');
						setData(tableMonitorData);
					}}
					selectedTitle={title}
				/>
				<CustomClickableOneLineWidget
					icon={<FaServer className="h-6 w-6" />}
					title="서버장비"
					onClickHandler={() => {
						setData(tableServerData);
						setTitle('서버장비');
					}}
					selectedTitle={title}
				/>
				<CustomClickableOneLineWidget
					icon={<FaMobileAlt className="h-7 w-7" />}
					title="모바일"
					onClickHandler={() => {
						setData(tableMobileData);
						setTitle('모바일');
					}}
					selectedTitle={title}
				/>
				<CustomClickableOneLineWidget
					icon={<FaBook className="h-6 w-6" />}
					title="도서"
					onClickHandler={() => {
						setData(tableEtcData);
						setTitle('도서');
					}}
					selectedTitle={title}
				/>
				<CustomClickableOneLineWidget
					icon={<MdGrid3X3 className="h-6 w-6" />}
					title="기타 장비"
					onClickHandler={() => {
						setData(tableEtcData);
						setTitle('기타 장비');
					}}
					selectedTitle={title}
				/>
			</div>
			<div className="mt-5 grid grid-cols-1 col-span-10">
				<CustomPagingViewTable tableData={data} columns={columns} />
			</div>
		</div>
	);
};

export default Equipment;
