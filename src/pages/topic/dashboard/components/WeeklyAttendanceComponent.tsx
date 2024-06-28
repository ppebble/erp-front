import React, { useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { FiToggleLeft } from 'react-icons/fi';
import { useQuery } from 'react-query';
import moment from 'moment';
import Card from '../../../../components/card';
import CustomViewTable from '../../../../components/table/CustomViewTable';
import Progress from '../../../../components/progress';
import AttendService from '../../../../services/attendService';

type AttendRow = {
	attendanceDate?: string;
	leaveWorkDate?: string;
	attendancePlace: boolean;
	workTime: string;
};

const WeeklyAttendanceComponent = () => {
	const attendColumnHelper = createColumnHelper<AttendRow>();
	const [remainTime, setRemainTime] = useState<number>(0);

	const attendColumns = [
		attendColumnHelper.accessor('attendanceDate', {
			id: 'attendanceDate',
			header: '출근일시',
		}),
		attendColumnHelper.accessor('leaveWorkDate', {
			id: 'leaveWorkDate',
			header: '퇴근일시',
		}),
		attendColumnHelper.accessor('attendancePlace', {
			id: 'attendancePlace',
			header: '원격여부',
		}),

		attendColumnHelper.accessor('workTime', {
			id: 'workTime',
			header: '시간',
		}),
	];
	const { data: result } = useQuery(['getWeekAttend'], AttendService({ date: '2024-03-02' }).getWeekAttend);

	const [data, setData] = useState<any>('');
	useEffect(() => {
		if (result) {
			const workTime: any = [];
			let totalTime: any;
			const attendData: AttendRow[] = [];
			Object.entries(result.response.result).map((e, idx) => {
				if (typeof e[1] !== 'string') {
					if (e[1]) {
						attendData.push(e[1] as AttendRow);
						workTime.push({
							hours: moment(attendData[idx].workTime, 'HH:mm').hour(),
							minutes: moment(attendData[idx].workTime, 'HH:mm').minute(),
						});
					} else {
						attendData.push({ attendanceDate: '-' } as AttendRow);
					}
				}

				return e;
			});
			workTime.map((time: any) => {
				if (!totalTime) {
					totalTime = time.hours + time.minutes / 60;
				} else {
					totalTime = totalTime + time.hours + time.minutes / 60;
				}

				return totalTime;
			});
			console.log(Number.parseFloat(totalTime).toFixed(2));
			// remainTime = 주간 일한 시간 총합 + annWorkTime
			setRemainTime(Number.parseFloat(Number.parseFloat(totalTime).toFixed(2)) + Number.parseInt(result.response.result.annWorkTime, 10));
			setData(attendData);
		}
		// setData(result);
	}, [result]);
	const table = useReactTable({
		data,
		columns: attendColumns,
		// sorting :: 정렬되는 객체, asc|desc   :: 첫 클릭 부터 desc =  false / true / sort 해제 순
		getCoreRowModel: getCoreRowModel(),
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
					<p className="text-base font-bold text-navy-700 dark:text-white">
						{/* 잔여 시간 | {40 - Math.ceil(remainTime)} : {Math.ceil(60 - (remainTime - Math.floor(remainTime)) * 60)} */}
						주간 출결량 | {Math.ceil((remainTime / 40) * 100)} %
					</p>
					<div className="pr-5">
						<Progress width="w-[15rem]" color={40 - Math.ceil(remainTime) < 0 ? 'red' : 'blue'} value={(remainTime / 40) * 100} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default WeeklyAttendanceComponent;
