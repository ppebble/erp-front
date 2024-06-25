import React, { useEffect, useState } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useQuery } from 'react-query';
import AttendService from '../../../../services/attendService';

type MonthAttendRow = {
	startDateOfWeek?: string;
	endDateOfWeek?: string;
	workTime: string;
};

const MonthAttendanceComponent = () => {
	const attendColumnHelper = createColumnHelper<MonthAttendRow>();

	const attendColumns = [
		attendColumnHelper.accessor('startDateOfWeek', {
			id: 'startDateOfWeek',
			header: '출근일시',
		}),
		attendColumnHelper.accessor('endDateOfWeek', {
			id: 'endDateOfWeek',
			header: '퇴근일시',
		}),
		attendColumnHelper.accessor('workTime', {
			id: 'workTime',
			header: '시간',
		}),
	];
	const { data: result } = useQuery(['getMonthAttend'], AttendService({ date: '2024-03-11' }).getMonthAttend);
	const [data, setData] = useState<any>('');

	useEffect(() => {
		const attendData: MonthAttendRow[] = [];
		if (result) {
			result.response.result.map((e: any) => {
				if (typeof e[1] !== 'string') {
					if (e[1]) {
						attendData.push(e[1] as MonthAttendRow);
					} else {
						attendData.push({} as MonthAttendRow);
					}
				}
				return e;
			});
			setData(attendData);
		}
	}, [result]);
	const table = useReactTable({
		data: data || '',
		columns: attendColumns,
		// sorting :: 정렬되는 객체, asc|desc   :: 첫 클릭 부터 desc =  false / true / sort 해제 순
		getCoreRowModel: getCoreRowModel(),
	});
	return (
		<div className="w-full h-full">
			<div className=" pl-4 p-2 h-full min-h-[23rem]">
				<header className="relative flex items-center justify-between">
					<div className="text-xl font-bold text-navy-700 dark:text-white py-1.5">월간 출결</div>
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
												className="cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 text-start"
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
													<p className="text-sm font-bold text-navy-700 dark:text-white">
														{flexRender(cell.column.columnDef.cell, cell.getContext())}
													</p>
												</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default MonthAttendanceComponent;
