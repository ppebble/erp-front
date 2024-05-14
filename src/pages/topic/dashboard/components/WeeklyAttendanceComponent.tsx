import React, { useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { FiToggleLeft } from 'react-icons/fi';
import Card from '../../../../components/card';
import CustomViewTable from '../../../../components/table/CustomViewTable';
import Progress from '../../../../components/progress';

type AttendRow = {
	enterTime?: string;
	leaveTime?: string;
	remoteFlag: boolean;
	time: string;
};

const attendHeapData: AttendRow[] = [
	{
		enterTime: '05-03 10:00:00',
		leaveTime: '05-03 19:00:00',
		remoteFlag: false,
		time: '19:00',
	},
	{
		enterTime: '05-03 10:00:00',
		leaveTime: '05-03 19:00:00',
		remoteFlag: false,
		time: '19:00',
	},
	{
		enterTime: '05-03 10:00:00',
		leaveTime: '05-03 19:00:00',
		remoteFlag: false,
		time: '19:00',
	},
	{
		enterTime: '05-03 10:00:00',
		leaveTime: '05-03 19:00:00',
		remoteFlag: false,
		time: '19:00',
	},
	{
		enterTime: '05-03 10:00:00',
		leaveTime: '05-03 19:00:00',
		remoteFlag: false,
		time: '19:00',
	},
	{
		enterTime: '05-03 10:00:00',
		leaveTime: '05-03 19:00:00',
		remoteFlag: false,
		time: '19:00',
	},
	{
		enterTime: '05-03 10:00:00',
		leaveTime: '05-03 19:00:00',
		remoteFlag: false,
		time: '19:00',
	},
];

const WeeklyAttendanceComponent = () => {
	const attendColumnHelper = createColumnHelper<AttendRow>();

	const attendColumns = [
		attendColumnHelper.accessor('enterTime', {
			id: 'enterTime',
			header: '출근일시',
		}),
		attendColumnHelper.accessor('leaveTime', {
			id: 'leaveTime',
			header: '퇴근일시',
		}),
		attendColumnHelper.accessor('remoteFlag', {
			id: 'remoteFlag',
			header: '원격여부',
		}),

		attendColumnHelper.accessor('time', {
			id: 'time',
			header: '시간',
		}),
	];

	const [data, setData] = React.useState(() => [...attendHeapData]);
	useEffect(() => {
		setData(attendHeapData);
	}, [attendHeapData]);

	const table = useReactTable({
		data,
		columns: attendColumns,
		// sorting :: 정렬되는 객체, asc|desc   :: 첫 클릭 부터 desc =  false / true / sort 해제 순
		getCoreRowModel: getCoreRowModel(),
		debugTable: true,
	});
	return (
		<div className="max-w-[30vw] pl-4 p-2 h-full min-h-[23rem]">
			<header className="relative flex items-center justify-between">
				<div className="text-xl font-bold text-navy-700 dark:text-white py-1.5">주간 출결</div>
				{/* <CardMenu /> */}
			</header>

			<div className="overflow-x-scroll xl:overflow-x-hidden">
				<table className="w-full min-h-[14rem]">
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id} className="!border-px !border-gray-400">
								{headerGroup.headers.map((header) => {
									return (
										<th
											key={header.id}
											colSpan={header.colSpan}
											onClick={header.column.getToggleSortingHandler()}
											className="cursor-pointer border-b-[1px] border-gray-200 pb-1 pr-4 text-start"
										>
											<div className="items-center justify-between text-xs text-gray-200">
												<p className="text-sm font-bold text-gray-600 dark:text-white">
													{flexRender(header.column.columnDef.header, header.getContext())}
												</p>
												{{
													asc: '',
													desc: '',
												}[header.column.getIsSorted() as string] ?? null}
											</div>
										</th>
									);
								})}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => {
							return (
								<tr key={row.id}>
									{row.getVisibleCells().map((cell) => {
										return (
											<td key={cell.id} className="pl-1 min-w-[150px] border-white/0 py-2  pr-4">
												<p className="text-sm font-bold text-navy-700 dark:text-white">{flexRender(cell.column.columnDef.cell, cell.getContext())}</p>
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
				<div className="h-px w-full bg-gray-300 dark:bg-white/20 " />
				<div className="flex justify-between min-h-[2.5rem] items-center">
					<p className="text-base font-bold text-navy-700 dark:text-white"> 잔여 시간 : HH:mm </p>
					<div className="pr-5">
						<Progress width="w-[15rem]" value={20} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default WeeklyAttendanceComponent;
