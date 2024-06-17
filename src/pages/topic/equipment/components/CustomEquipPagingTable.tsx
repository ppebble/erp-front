/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo, useState } from 'react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, PaginationState, useReactTable } from '@tanstack/react-table';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Card from '../../../../components/card';
import DebouncedInput from '../../../../components/table/CustomTableFilterComponent';

const CustomEquipPagingTable = (props: { tableData: any; columns: any; title?: string; onClick?: any }) => {
	const { tableData, columns, title, onClick } = props;
	const defaultData = useMemo(() => tableData, []);

	// selectedIndex   >> 선택한 ROW에 음영 넣는 기능 ... 현재 주석처리 (line 84)
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	const [globalFilter, setGlobalFilter] = useState('');

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const [data, setData] = useState(() => [...defaultData]);
	useEffect(() => {
		setData(tableData);
		setSelectedIndex(null);
	}, [tableData]);

	const table = useReactTable({
		data,
		columns,
		globalFilterFn: 'includesString',
		enableGlobalFilter: true,
		enableFilters: true,
		state: {
			pagination,
			globalFilter,
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onPaginationChange: setPagination,
		onGlobalFilterChange: setGlobalFilter,
	});

	return (
		<Card extra="w-full pl-4 p-2 h-full min-h-[65vh]">
			{title && (
				<header className="relative flex items-center justify-between pt-5 pb-5">
					<div className="text-xl font-bold text-navy-700 dark:text-white py-1.5">{title}</div>
				</header>
			)}
			<div className="overflow-x-scroll xl:overflow-x-hidden h-full">
				<table className="w-full ">
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id} className="!border-px !border-gray-400">
								{headerGroup.headers.map((header) => {
									return (
										<th
											key={header.id}
											colSpan={header.colSpan}
											onClick={header.column.getToggleSortingHandler()}
											className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-2 text-start"
										>
											<div className="items-center justify-between text-xs text-gray-200">
												<p className="text-lg font-bold text-gray-700 dark:text-white">
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
								// <tr key={row.id} className={`${selectedIndex === row.index ? 'bg-gray-200' : ''}`}>
								<tr key={row.id}>
									{row.getVisibleCells().map((cell) => {
										return (
											<td
												key={cell.id}
												className="max-w-[150px] border-b-[1px] border-gray-400 py-3  pr-4"
												onClick={() => {
													onClick(row.original);
													setSelectedIndex(row.index);
												}}
											>
												<p className="text-sm font-bold text-navy-700 dark:text-white">{flexRender(cell.column.columnDef.cell, cell.getContext())}</p>
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div className="flex mt-5">
				<div className="w-full" />
				<div className="w-[50%] flex justify-center mr-5 sm:justify-center flex-col sm:flex-row mb-1.5 mt-1.5 px-1 items-center">
					<div className="flex">
						<DebouncedInput
							value={globalFilter ?? ''}
							onChange={(value) => setGlobalFilter(String(value))}
							className="p-2 font-sm shadow border border-block"
							placeholder="Search All . . ."
						/>
					</div>
				</div>
				<div className="w-[50%]  flex justify-center sm:justify-center flex-col sm:flex-row mt-1.5 px-1 items-center">
					<div className="flex">
						<ul className="flex justify-center items-center gap-x-[1px]" role="navigation" aria-label="Pagination">
							<li
								className={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${
									table.getState().pagination.pageIndex === 0 ? 'bg-[#cccccc] pointer-events-none' : ' cursor-pointer'
								}`}
								onClick={() => table.previousPage()}
							>
								<MdChevronLeft />
							</li>
							{Array.from({ length: table.getPageCount() || 0 }).map((_, index) => (
								<li
									className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${
										table.getState().pagination.pageIndex === index ? 'text-blue-600  border-sky-500' : 'border-[#E4E4EB] '
									}`}
									onClick={() => table.setPageIndex(index)}
									// eslint-disable-next-line react/no-array-index-key
									key={index}
								>
									{index + 1}
								</li>
							))}
							<li
								className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
									table.getState().pagination.pageIndex === table.getPageCount() - 1 ? 'bg-[#cccccc] pointer-events-none' : ' cursor-pointer'
								}`}
								onClick={() => table.nextPage()}
							>
								<MdChevronRight />
							</li>
						</ul>
					</div>
				</div>
				<div className="w-full" />
			</div>
		</Card>
	);
};

export default CustomEquipPagingTable;
