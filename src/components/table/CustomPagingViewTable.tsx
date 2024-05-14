/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback, useEffect, useState } from 'react';
import {
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	GlobalFiltering,
	OnChangeFn,
	PaginationState,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Card from '../card';
import CardMenu from '../card/CardMenu';
import Search from './CustomTableFilterComponent';
import DebouncedInput from './CustomTableFilterComponent';

const CustomPagingViewTable = (props: { tableData: any; columns: any; title?: string }) => {
	const { tableData, columns, title } = props;
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const defaultData = tableData;

	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = React.useState('');

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const [data, setData] = React.useState(() => [...defaultData]);
	useEffect(() => {
		setData(tableData);
	}, [tableData]);

	const table = useReactTable({
		data,
		columns,
		filterFns: {},
		state: {
			sorting,
			pagination,
			columnFilters,
		},
		// sorting :: 정렬되는 객체, asc|desc   :: 첫 클릭 부터 desc =  false / true / sort 해제 순
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		onGlobalFilterChange: setColumnFilters,
		debugTable: true,
	});
	// console.log(data);
	return (
		<Card extra="w-full pl-4 p-2 h-full min-h-[17.5rem]">
			{title && (
				<header className="relative flex items-center justify-between pt-5 pb-5">
					<div className="text-xl font-bold text-navy-700 dark:text-white py-1.5">{title}</div>
				</header>
			)}
			<div className="overflow-x-scroll xl:overflow-x-hidden h-full">
				<table className="w-full h-full">
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
								<tr key={row.id}>
									{row.getVisibleCells().map((cell) => {
										return (
											<td key={cell.id} className="min-w-[150px] border-white/0 py-3  pr-4">
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
			<div className="h-[150px]" />
			<div className="w-full  flex justify-center sm:justify-center flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
				<div className="flex">
					<ul className="flex justify-center items-center gap-x-[10px] z-30" role="navigation" aria-label="Pagination">
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
			<div className="w-full  flex justify-center sm:justify-center flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
				<div className="flex">
					<ul className="flex justify-center items-center gap-x-[10px] z-30" role="navigation" aria-label="Pagination">
						<li
							className={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled]`}
						>
							<DebouncedInput
								value={globalFilter ?? ''}
								onChange={(value) => setGlobalFilter(String(value))}
								className="p-2 font-lg shadow border border-block"
								placeholder="Search all columns..."
							/>
						</li>
					</ul>
				</div>
			</div>
		</Card>
	);
};

export default CustomPagingViewTable;
