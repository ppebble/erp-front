/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from 'react';
import { flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import CardMenu from '../../../../components/card/CardMenu';
import Card from '../../../../components/card';

const EquipTable = (props: { tableData: any; columns: any }) => {
	const { tableData, columns } = props;
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const defaultData = tableData;

	useEffect(() => {
		console.log(sorting);
	}, [sorting]);

	const [data, setData] = React.useState(() => [...defaultData]);
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
		},
		// sorting :: 정렬되는 객체, asc|desc   :: 첫 클릭 부터 desc =  false / true / sort 해제 순
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true,
	});
	// console.log(data);
	return (
		<Card extra="w-full pb-10 p-4 h-full">
			<header className="relative flex items-center justify-between">
				<div className="text-xl font-bold text-navy-700 dark:text-white">4-Columns Table</div>
				<CardMenu />
			</header>

			<div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
				<table className="w-full">
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id} className="!border-px !border-gray-400">
								{headerGroup.headers.map((header) => {
									return (
										<th
											key={header.id}
											colSpan={header.colSpan}
											onClick={header.column.getToggleSortingHandler()}
											className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
										>
											<div className="items-center justify-between text-xs text-gray-200">
												<p className="text-sm font-bold text-gray-600 dark:text-white">
													{flexRender(header.column.columnDef.header, header.getContext())}
												</p>
												,
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
		</Card>
	);
};

export default EquipTable;
