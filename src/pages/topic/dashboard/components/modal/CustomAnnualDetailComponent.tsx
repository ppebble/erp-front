/* eslint-disable react/no-unstable-nested-components */
import {
	AlertDialogContent,
	AlertDialogHeader,
	Button,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogFooter,
	useDisclosure,
	Select,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { EventInput } from '@fullcalendar/react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import {
	useCalendarDialogOpen,
	useCalendarEvnetParam,
	useCalendarParam,
	useEvents,
	useInputEvent,
	useWorkType,
} from '../../../../../store/useCalendar';
import { getEventColor } from '../../../../../components/calendar/utils/event-utils';
import { tableAnnualRow } from '../../../equipment/variables/tableHeapDataColumns';
import Card from '../../../../../components/card';
import { AnnReqProps, AnnualInfo, useAnnRequest, usePersonalAnnual } from '../../../../../store/useAnnual';
import AnnualService from '../../../../../services/annualService';
import useModal from '../../../../../store/useModal';

//     historyNo start end note deny

export const CustomAnnualDetailComponent = () => {
	const refEventStartDate = useRef<HTMLInputElement>(null);

	const [open, setOpen] = useState(false);
	const data = usePersonalAnnual();
	const reqData = useAnnRequest();
	const columnHelper = createColumnHelper<AnnualInfo>();
	const annReqColHelper = createColumnHelper<AnnReqProps>();
	const { openModal } = useModal();
	const annualService = AnnualService();
	const columns = [
		columnHelper.accessor('name', {
			id: 'name',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">사원 명</p>,
			cell: (info: any) => (
				<div className="flex items-center gap-1">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('remainDay', {
			id: 'remainDay',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">남은 연차 갯수</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('january', {
			id: 'january',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">1월</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('febuary', {
			id: 'febuary',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">2월</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('march', {
			id: 'march',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">3월</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('april', {
			id: 'april',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">4월</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('may', {
			id: 'may',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">5월</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('june', {
			id: 'june',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">6월</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('july', {
			id: 'july',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">7월</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('august', {
			id: 'august',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">8월</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('september', {
			id: 'september',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">9월</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('october', {
			id: 'october',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">10월</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('november', {
			id: 'november',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">11월</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('december', {
			id: 'december',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">12월</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
	]; // eslint-disable-next-line
	const annReqColumns = [
		annReqColHelper.accessor('historyNo', {
			id: 'febuary',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">연차 신청 번호</p>,
			cell: (info) => (
				<div className="flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		annReqColHelper.accessor('start', {
			id: 'start',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">연차 시작일</p>,
			cell: (info: any) => (
				<div className="flex items-center gap-1">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		annReqColHelper.accessor('end', {
			id: 'end',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">연차 종료일</p>,
			cell: (info) => (
				<div className="flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		annReqColHelper.accessor('note', {
			id: 'january',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">사유</p>,
			cell: (info) => (
				<div className="flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),

		annReqColHelper.accessor('deny', {
			id: 'deny',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">신청 취소</p>,
			cell: (info) => (
				<div className="flex font-bold">
					<Button
						onClick={() => {
							if (window.confirm('연차 신청을 취소하시겠습니까?')) {
								annualService.calcleAnnual.mutate({ historyNo: info.row.original.historyNo, content: '' });
							}
							console.log(info.row.original.historyNo);
						}}
						colorScheme="red"
					>
						취소
					</Button>
				</div>
			),
		}),
	]; // eslint-disable-next-line
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		debugTable: true,
	});
	const annReqTable = useReactTable({
		data: reqData,
		columns: annReqColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Card extra="w-full p-1 h-full">
			<div className="mt-1 overflow-x-scroll xl:overflow-x-hidden mb-2 ml-2">
				<table className="w-full">
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id} className="!border-px !border-gray-400">
								{headerGroup.headers.map((header) => {
									return (
										<th key={header.id} colSpan={header.colSpan} className="cursor-pointer border-b border-gray-200 pb-2 pr-2 pt-4 text-start">
											<div className="items-center justify-between text-xs text-gray-200">
												{flexRender(header.column.columnDef.header, header.getContext())}
											</div>
										</th>
									);
								})}
							</tr>
						))}
					</thead>
					<tbody>
						{table
							.getRowModel()
							.rows.slice(0, 5)
							.map((row) => {
								return (
									<tr key={row.id}>
										{row.getVisibleCells().map((cell) => {
											return (
												<td key={cell.id} className="min-w-[60px] border-white/0 py-3  pr-2">
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</td>
											);
										})}
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
			{/* <div className="h-px w-full bg-gray-300 dark:bg-white/20 " /> */}
			{/* <div className="text-xl mt-3 font-bold text-navy-700 dark:text-white col-span-3 ml-1"> 연차 신청 목록</div> */}
			{/* <div className="overflow-x-scroll xl:overflow-x-hidden ml-2">
				<table className="w-full">
					<thead>
						{annReqTable.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id} className="!border-px !border-gray-400">
								{headerGroup.headers.map((header) => {
									return (
										<th key={header.id} colSpan={header.colSpan} className="cursor-pointer border-b border-gray-200 pb-2 pr-2 pt-4 text-start">
											<div className="items-center justify-between text-xs text-gray-200">
												{flexRender(header.column.columnDef.header, header.getContext())}
											</div>
										</th>
									);
								})}
							</tr>
						))}
					</thead>
					<tbody>
						{annReqTable
							.getRowModel()
							.rows.slice(0, 5)
							.map((row) => {
								return (
									<tr key={row.id}>
										{row.getVisibleCells().map((cell) => {
											return (
												<td key={cell.id} className="min-w-[60px] border-white/0 py-3 pr-2">
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</td>
											);
										})}
									</tr>
								);
							})}
					</tbody>
				</table>
			</div> */}
		</Card>
	);
};
