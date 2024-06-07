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

export const CustomAnnualDetailExternalComponent = () => {
	const reqData = useAnnRequest();
	const annReqColHelper = createColumnHelper<AnnReqProps>();
	const annualService = AnnualService();

	const annReqColumns = [
		annReqColHelper.accessor('register', {
			id: 'febuary',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">연차 신청자</p>,
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

	const annReqTable = useReactTable({
		data: reqData,
		columns: annReqColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Card extra="w-full p-1 h-full">
			<div className="text-xl mt-3 font-bold text-navy-700 dark:text-white col-span-3 ml-1"> 연차 신청 목록</div>
			<div className="overflow-x-scroll xl:overflow-x-hidden ml-2">
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
			</div>
		</Card>
	);
};
