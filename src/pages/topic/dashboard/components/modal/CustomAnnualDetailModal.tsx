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

export const CustomAnnualDetailModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	// const [size, setSize] = useState('md');
	const isDialogOpen = useCalendarDialogOpen();
	const addEventParam = useInputEvent();
	const [isConfirm, setIsConfirm] = useState<boolean>(false);
	const events = useEvents();
	const refAllDaySwitch = useRef<HTMLInputElement>(null);
	const selectedEvent = useCalendarEvnetParam();
	// const isAdd = useAddEventFlag();
	const [eventParam, setEventParam] = useState<EventInput>(addEventParam);

	const [defStart, setDefStart] = useState<string | undefined>('');
	const [defEnd, setDefEnd] = useState<string | undefined>('');

	const refEventName = useRef<HTMLInputElement>(null);
	const refEventStartDate = useRef<HTMLInputElement>(null);
	const refEventEndDate = useRef<HTMLInputElement>(null);
	const refEventStartDateTime = useRef<HTMLInputElement>(null);
	const refEventEndDateTime = useRef<HTMLInputElement>(null);
	const refRegistUser = useRef<HTMLInputElement>(null);
	const refEventDetail = useRef<HTMLInputElement>(null);

	const [open, setOpen] = useState(false);
	const currentEventParam = useCalendarParam();
	type AnnualRow = {
		name: string;
		enterDate: string;
		restAnn: number;
		january: number;
		febuary: number;
		march: number;
		april: number;
		may: number;
		june: number;
		july: number;
		august: number;
		september: number;
		october: number;
		november: number;
		december: number;
	};
	const data = tableAnnualRow;
	const annList = [
		{ id: 'sc', name: 'SC사업부' },
		{ id: 'sf', name: 'SF&신사업부' },
		{ id: 'manage', name: '경영팀' },
		{ id: 'dev', name: '기술개발본부' },
		{ id: 'sb', name: '전략사업본부' },
		{ id: 'personal', name: '개인일정' },
		// { id: 'myPersonal', name: '나의 개인일정', color: taskColor.myPersonal },
	] as const;
	const columnHelper = createColumnHelper<AnnualRow>();
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
		columnHelper.accessor('enterDate', {
			id: 'enterDate',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">입사일</p>,
			cell: (info) => <p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>,
		}),
		columnHelper.accessor('restAnn', {
			id: 'restAnn',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">남은 연차 갯수</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('january', {
			id: 'jan',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">1월</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('febuary', {
			id: 'feb',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">2월</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('march', {
			id: 'mar',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">3월</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('april', {
			id: 'apr',
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
			id: 'jun',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">6월</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('july', {
			id: 'jul',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">7월</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('august', {
			id: 'aug',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">8월</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('september', {
			id: 'sep',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">9월</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('october', {
			id: 'oct',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">10월</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('november', {
			id: 'nom',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">11월</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor('december', {
			id: 'dec',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">12월</p>,
			cell: (info) => (
				<div className="mx-2 flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
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

	useEffect(() => {
		if (refAllDaySwitch.current) {
			if (refAllDaySwitch.current?.checked) {
				refEventStartDate.current?.setAttribute('defaultValue', refEventStartDateTime.current?.value?.slice(0, 10) || '');
				refEventEndDate.current?.setAttribute('defaultValue', refEventEndDateTime.current?.value?.slice(0, 10) || '');
			} else {
				refEventStartDateTime.current?.setAttribute('defaultValue', `${refEventStartDate.current?.value}T00:00:00` || '');
				refEventEndDateTime.current?.setAttribute('defaultValue', `${refEventEndDate.current?.value}T23:59:59` || '');
			}
		}
	}, [refEventStartDate.current]);

	useEffect(() => {
		if (isDialogOpen) {
			onOpen();
			// console.log(defStart);
			// console.log(defEnd);
		} else {
			setDefEnd('');
			setDefStart('');
			onClose();
		}
	}, [isDialogOpen]);

	return (
		<AlertDialogContent maxW="100rem">
			<AlertDialogHeader>
				<div className="flex justify-between">
					<p>연차 테이블</p>
				</div>
			</AlertDialogHeader>
			<div className="h-px w-full bg-gray-300 dark:bg-white/20 " />
			<AlertDialogCloseButton
				onClick={() => {
					onClose;
				}}
			/>
			<AlertDialogBody>
				<div className="mt-1 overflow-x-scroll xl:overflow-x-hidden">
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
			</AlertDialogBody>
		</AlertDialogContent>
	);
};
