import { useState, useMemo, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { Input, InputGroup, Select, Flex, Tag, Spacer, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { profileList } from '../../../../network/response/profileList';
import useModal from '../../../../store/useModal';
import Card from '../../../../components/card';

type tableProps = {
	tableData: any;
	low: number;
};

const ColumnsTable = ({ tableData, low }: tableProps) => {
	const [option, setOption] = useState('name');
	const [input, setInput] = useState('');

	const [sorting, setSorting] = useState<SortingState>([]);
	const [search, setSearch] = useState({ option: '', input: '' });
	const [currentPage, setCurrentPage] = useState(0);
	const [startIndex, setStartIndex] = useState(0);
	const [endIndex, setEndIndex] = useState(low);
	const [totalPage] = useState(Math.ceil(tableData.length / low));
	const [data] = useState(() => [...tableData]);
	const columnHelper = createColumnHelper<profileList>();
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
		return <p className="text-md font-bold text-navy-700 dark:text-white">{value}</p>;
	};

	const columns = [
		columnHelper.accessor('empNo', {
			id: '사원번호',
			cell: (info: any) => addTag(info.getValue()),
		}),
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
		columnHelper.accessor('task', {
			id: '부서',
			cell: (info) => addTag(info.getValue()),
		}),
		columnHelper.accessor('place', {
			id: '근무지',
			cell: (info) => addTag(info.getValue()),
		}),
		columnHelper.accessor('userEmail', {
			id: '이메일',
			cell: (info) => addTag(info.getValue().concat('@nexmore.co.kr')),
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

	const onSearch = (e: any) => {
		const { id, value } = e.target;
		setSearch({ ...search, [id]: value });
	};

	const updateBoard = () => {
		alert('updateBoard');
	};

	const deleteBoard = () => {
		alert('deleteBoard');
	};

	const details = (con: any) => {
		openModal({ type: 1, contents: con, closeOnOverlay: false, updataClick: updateBoard, deleteClick: deleteBoard });
	};

	return (
		<div className="mt-5 grid">
			<Card extra="w-full pb-10 p-4 h-full">
				<header className="relative flex items-center justify-between">
					<div className="text-xl font-bold text-navy-700 dark:text-white">인력사항</div>
				</header>

				<div className="mt-8 mx-[3rem]">
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
													<p className="text-lg font-bold text-gray-600 dark:text-white">
														{header.id}
														{{
															asc: '▲',
															desc: '▼',
														}[header.column.getIsSorted() as string] ?? null}
													</p>
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
													<td key={cell.id} className="min-w-[150px] border-white/0 py-3  pr-4 cursor-pointer" onClick={() => details(row.original)}>
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

				<Flex className="mt-[2rem] mx-[2rem]">
					<InputGroup className="mb-2">
						<div className="!w-[8rem]">
							<Select id="option" defaultValue="name" onChange={(e) => onSearch(e)}>
								<option value="name">이름</option>
								<option value="position">직책</option>
								<option value="rank">직급</option>
								<option value="task">부서</option>
								<option value="place">근무지</option>
							</Select>
						</div>
						<Input id="input" className="ml-[2rem]" onChange={(e) => onSearch(e)} />
						<InputRightElement>
							<SearchIcon />
						</InputRightElement>
					</InputGroup>
					<Spacer />
					{/* 페이지 */}
					<div className="w-full  flex justify-center sm:justify-end flex-col sm:flex-row gap-5 items-center">
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
				</Flex>
			</Card>
		</div>
	);
};

export default ColumnsTable;
