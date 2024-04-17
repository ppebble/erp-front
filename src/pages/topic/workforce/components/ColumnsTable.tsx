import { useState, useMemo, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { Button } from '@chakra-ui/react';
import CardMenu from '../../../../components/card/CardMenu';
import Card from '../../../../components/card';
import useModal from '../../../../store/useModal';

type RowObj = {
	name: string;
	position: string;
	rank: string;
	team: string;
};

type tableProps = {
	tableData: any;
	low: number;
};

const ColumnsTable = ({ tableData, low }: tableProps) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [startIndex, setStartIndex] = useState(0);
	const [endIndex, setEndIndex] = useState(low);
	const [totalPage] = useState(Math.ceil(tableData.length / low));
	const [data] = useState(() => [...tableData]);
	const columnHelper = createColumnHelper<RowObj>();
	const { openModal } = useModal();

	const previousPage = () => {
		setCurrentPage(currentPage - 1);
	};

	const nextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	const changePage = (page: number) => {
		setCurrentPage(page);
	};

	const [customPagination, setCustomPagination] = useState<any[]>();

	useMemo(() => {
		const arr = [];
		for (let i = 0; i < totalPage; i += 1) {
			arr[i] = i;
		}
		setCustomPagination(arr);
	}, [totalPage]);

	useEffect(() => {
		setStartIndex(currentPage * low);
		setEndIndex(startIndex + low);
	}, [currentPage, low, startIndex]);

	const addTag = (value: any) => {
		return <p className="text-sm font-bold text-navy-700 dark:text-white">{value}</p>;
	};

	const columns = [
		columnHelper.accessor('name', {
			id: '이름',
			cell: (info: any) => addTag(info.getValue()),
		}),
		columnHelper.accessor('position', {
			id: '직책',
			cell: (info) => addTag(info.getValue()),
		}),
		columnHelper.accessor('rank', {
			id: '직급',
			cell: (info) => addTag(info.getValue()),
		}),
		columnHelper.accessor('team', {
			id: '부서',
			cell: (info) => addTag(info.getValue()),
		}),
	];

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true,
	});

	const details = (con: RowObj) => {
		openModal({ type: 1, contents: con, closeOnOverlay: false });
	};

	const newWrite = () => {
		openModal({ type: 2, closeOnOverlay: false });
	};

	return (
		<div className="mt-5 grid">
			<Card extra="w-full pb-10 p-4 h-full">
				<header className="relative flex items-center justify-between">
					<div className="text-xl font-bold text-navy-700 dark:text-white">인력사항</div>
					<CardMenu />
				</header>

				<div className="mt-8 overflow-x-scroll xl:overflow-x-hidden" style={{ height: '500px' }}>
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
													<p className="text-sm font-bold text-gray-600 dark:text-white">{header.id}</p>
													{/* {flexRender(header.column.columnDef.header, header.getContext())} */}
													{{
														asc: '↑',
														desc: '↓',
													}[header.column.getIsSorted() as string] ?? null}
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
								.rows.slice(startIndex, endIndex)
								.map((row) => {
									return (
										<tr key={row.id}>
											{row.getVisibleCells().map((cell) => {
												return (
													<td key={cell.id} className="min-w-[150px] border-white/0 py-3  pr-4" onClick={() => details(row.original)}>
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

				<div>
					<Button onClick={() => newWrite()}>글쓰기</Button>
				</div>

				<div className="w-full  flex justify-center sm:justify-end flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
					<div className="flex">
						<ul className="flex justify-center items-center gap-x-[10px] z-30" role="navigation" aria-label="Pagination">
							<li
								className={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${
									currentPage === 0 ? 'bg-[#cccccc] pointer-events-none' : ' cursor-pointer'
								}`}
								onClick={previousPage}
							>
								<MdChevronLeft />
							</li>
							{customPagination?.map((_data, index) => (
								<li
									className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${
										currentPage === index ? 'text-blue-600  border-sky-500' : 'border-[#E4E4EB] '
									}`}
									onClick={() => changePage(index)}
									// eslint-disable-next-line react/no-array-index-key
									key={index}
								>
									{index + 1}
								</li>
							))}
							<li
								className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
									currentPage === totalPage - 1 ? 'bg-[#cccccc] pointer-events-none' : ' cursor-pointer'
								}`}
								onClick={nextPage}
							>
								<MdChevronRight />
							</li>
						</ul>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default ColumnsTable;
