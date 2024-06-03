import { useMemo, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import {
	AccessorKeyColumnDef,
	SortingState,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { Flex, Input, InputGroup, InputRightElement, Select, Spacer } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { ProfileService } from '../../services/profileService';
import useModal from '../../store/useModal';
import BoardService from '../../services/boardService';

type searchType = {
	option: string;
	input: string;
};

type ColumnsTableProps = {
	columns: AccessorKeyColumnDef<any, any>[];
	list: any;
	show: number;
	isClick: boolean;
	isSearch: boolean;
	searchItem?: any;
	search?: searchType;
	setSearch?: (state: searchType) => void;
	filter?: any;
};

const ColumnsTable = ({ columns, searchItem, list, isClick, isSearch, show, search, setSearch, filter }: ColumnsTableProps) => {
	useQuery('getProfileList', ProfileService().getProfileList);
	const { updateBoard } = BoardService();
	const [row] = useState(show);
	const { openModal } = useModal();
	const [totalPage, setTotalPage] = useState(Math.ceil(list.length / row));

	const splitList = () => {
		const array = [];
		for (let i = 0; i < totalPage; i += 1) {
			array.push(list.slice(i * row, (i + 1) * row));
		}
		return array;
	};

	const [profileListSplit] = useState<any>(splitList()); // 10개(row)씩 나눈 리스트
	const [searchSplit, setSearchSplit] = useState<any>(); // 검색 결과 리스트

	const [data, setData] = useState(profileListSplit[0]);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [currentPage, setCurrentPage] = useState(0);

	const previousPage = () => {
		setCurrentPage(currentPage - 1);
	};

	const nextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	const changePage = (page: number) => {
		setCurrentPage(page);
	};

	const update = () => {
		openModal({ type: 10, title: '글수정', closeOnOverlay: false });
	};

	const itemClick = (index: any) => {
		const contents = { title: '제목', body: '<p>내용1</p><br/><p>내용2</p>' };
		openModal({ type: 11, contents, updataClick: update });
	};

	const [customPagination, setCustomPagination] = useState<any[]>();

	useMemo(() => {
		const arr = [];
		for (let i = 0; i < totalPage; i += 1) {
			arr[i] = i;
		}
		setCustomPagination(arr);
	}, [totalPage]);

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
		if (search && setSearch) {
			const { id, value } = e.target;
			setSearch({ ...search, [id]: value });
		}
	};

	useEffect(() => {
		if (search?.input) {
			if (searchSplit) {
				setData(searchSplit[currentPage]);
			}
		} else {
			setData(profileListSplit[currentPage]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage]);

	useEffect(() => {
		if (search) {
			setCurrentPage(0);
			if (filter) {
				if (search.input) {
					const array = [];
					if (filter.length >= 10) {
						for (let i = 0; i < Math.ceil(filter.length / row); i += 1) {
							array.push(filter.slice(i * row, (i + 1) * row));
						}
						setSearchSplit(array);
						setData(array[0]);
					} else {
						setSearchSplit(filter);
						setData(filter);
					}
				} else {
					setData(profileListSplit[currentPage]);
				}

				setTotalPage(Math.ceil(filter.length / row));
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, filter]);

	return (
		<div>
			<div className="mt-8 mx-[3rem] min-h-[600px]">
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
											style={{ width: header.getSize() }}
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
						{table.getRowModel().rows.map((rows) => {
							return (
								<tr
									key={rows.id}
									className={`${isClick ? 'cursor-pointer' : ''}`}
									onClick={isClick ? () => itemClick(rows.original.newsNo) : undefined}
								>
									{rows.getVisibleCells().map((cell) => {
										return (
											<td key={cell.id} className="border-white/0 py-3 pr-4">
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
				{/* 검색 */}
				{isSearch && (
					<InputGroup className="mb-2">
						<div className="!w-[8rem]">
							<Select id="option" defaultValue={search?.option} onChange={(e) => onSearch(e)}>
								{searchItem.map((item: any) => (
									<option key={item.option} value={item.option}>
										{item.value}
									</option>
								))}
							</Select>
						</div>
						<Input id="input" className="ml-[2rem]" defaultValue={search?.input} onChange={(e) => onSearch(e)} />
						<InputRightElement>
							<SearchIcon />
						</InputRightElement>
					</InputGroup>
				)}
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
									key={_data}
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
		</div>
	);
};

export default ColumnsTable;
