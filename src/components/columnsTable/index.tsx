import { useMemo, useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { AccessorKeyColumnDef, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Button, Card, CardBody, CardHeader, Heading, Input, InputGroup, Select, SimpleGrid, Text } from '@chakra-ui/react';
import { BsPlusCircle } from 'react-icons/bs';
import { SearchIcon } from '@chakra-ui/icons';
import { ProfileService } from '../../services/profileService';
import useModal from '../../store/useModal';
import BoardService from '../../services/boardService';
import useProject from '../../store/useProject';
import useBoard from '../../store/useBoard';

type searchType = {
	option: string;
	input: string;
};

type ColumnsTableProps = {
	columns?: AccessorKeyColumnDef<any, any>[];
	list: any;
	show: number;
	isClick: boolean;
	isSearch: boolean;
	searchItem?: any;
	search?: searchType;
	setSearch?: (state: searchType) => void;
	filter?: any;
	addButton?: any;
	detailButton?: any;
	columnsType: string;
	type?: string;
	minH?: number;
};

const ColumnsTable = ({
	columns,
	searchItem,
	list,
	isClick,
	isSearch,
	show,
	search,
	setSearch,
	filter,
	addButton,
	detailButton,
	columnsType,
	type,
	minH,
}: ColumnsTableProps) => {
	useQuery('boardDetail', BoardService().boardDetail);
	const [row] = useState(show);
	const { openModal } = useModal();
	const [totalPage, setTotalPage] = useState(0);
	const [customPagination, setCustomPagination] = useState<any[]>();
	const [splitList, setSplitList] = useState<any>(); // 10개(row)씩 나눈 리스트
	const [searchSplit, setSearchSplit] = useState<any>(); // 검색 결과 리스트
	const [data, setData] = useState<any>('');
	const [sorting, setSorting] = useState<SortingState>([]);
	const [currentPage, setCurrentPage] = useState(0);
	const refSearch = useRef<HTMLInputElement>(null);
	const { boardIndex, setBoardIndex } = useBoard();

	const previousPage = () => {
		setCurrentPage(currentPage - 1);
	};

	const nextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	const changePage = (page: number) => {
		setCurrentPage(page);
	};

	const itemClick = (index: any) => {
		setBoardIndex(index);
	};

	useEffect(() => {
		console.log(boardIndex);
	}, [boardIndex]);

	const table =
		columns &&
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useReactTable({
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

	const cardList = () => {
		let cardMap;
		if (data) {
			if (type === '프로젝트') {
				cardMap = data.map((pItem: any) => (
					<Card
						key={pItem.projectNo}
						variant="outline"
						className="cursor-pointer !min-h-[220px] !mt-0 !p-0"
						onClick={() => detailButton(pItem.projectNo)}
					>
						<CardHeader>
							<Heading size="md" className="truncate ...">
								{pItem.projectName}
							</Heading>
						</CardHeader>
						<CardBody>
							<Text className="truncate ...">고객사 : {pItem.client}</Text>
							<Text>상태 : {pItem.status}</Text>
							<Text>단계 : {pItem.step}</Text>
							<Text>시작일 : {pItem.startDate}</Text>
							<Text>종료일 : {pItem.endDate}</Text>
						</CardBody>
					</Card>
				));
			} else {
				cardMap = data.map((bItem: any) => (
					<Card
						key={bItem.businessNo}
						variant="outline"
						className="cursor-pointer !min-h-[220px] !mt-0 !p-0"
						onClick={() => detailButton(bItem.businessNo)}
					>
						<CardHeader>
							<Heading size="md" className="truncate ...">
								{bItem.businessName}
							</Heading>
						</CardHeader>
						<CardBody>
							<Text>시행부처 : {bItem.department}</Text>
							<Text>참여유형 : {bItem.participationType}</Text>
							<Text>시작일 : {bItem.startDate}</Text>
							<Text>종료일 : {bItem.endDate}</Text>
						</CardBody>
					</Card>
				));
			}
		}
		return cardMap;
	};

	const filterbySearch = () => {
		const array = [];
		if (filter?.length >= 10) {
			for (let i = 0; i < Math.ceil(filter.length / row); i += 1) {
				array.push(filter.slice(i * row, (i + 1) * row));
			}
			setSearchSplit(array);
			setData(array[0]);
		} else {
			setSearchSplit(filter);
			setData(filter);
		}
	};

	useEffect(() => {
		if (splitList || searchSplit) {
			if (search?.input) {
				if (searchSplit) {
					setData(searchSplit[currentPage]);
				}
			} else {
				console.log(splitList);
				setData(splitList[currentPage]);
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage]);

	useEffect(() => {
		if (splitList) {
			if (search) {
				setCurrentPage(0);
				if (filter) {
					if (search.input) {
						filterbySearch();
					} else {
						setData(splitList[currentPage]);
					}
					setTotalPage(filter?.length ? Math.ceil(filter.length / row) : 0);
				}
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, filter]);

	useEffect(() => {
		setCurrentPage(0);
		const array = [];
		if (list?.length) {
			for (let i = 0; i < Math.ceil(list.length / row); i += 1) {
				array.push(list.slice(i * row, (i + 1) * row));
			}
		}
		if (search?.input) {
			filterbySearch();
			setTotalPage(filter?.length ? Math.ceil(filter.length / row) : 0);
		} else {
			setTotalPage(array?.length ? array.length : 0);
			const arr = [];
			for (let i = 0; i < array.length; i += 1) {
				arr[i] = i;
			}
			setData(array[0]);
		}
		setSplitList(array);
	}, [list, row]);

	useEffect(() => {
		const arr = [];
		for (let i = 0; i < totalPage; i += 1) {
			arr[i] = i;
		}
		setCustomPagination(arr);
	}, [totalPage]);

	return (
		<div className="w-full">
			{addButton && (
				<div className="flex justify-end">
					<Button onClick={() => addButton()}>
						<BsPlusCircle className="h-6 w-6 bold" />
					</Button>
				</div>
			)}
			<div className={`${type !== '연구과제' ? 'mt-8 mx-[3rem]' : 'mx-[1rem]'}`} style={{ minHeight: `${minH}rem` }}>
				{columnsType === 'table' ? (
					<table className="w-full">
						<thead>
							{table &&
								table.getHeaderGroups().map((headerGroup) => (
									<tr key={headerGroup.id} className="!border-px !border-gray-400">
										{headerGroup.headers.map((header) => {
											return (
												<th
													key={header.id}
													colSpan={header.colSpan}
													onClick={header.column.getToggleSortingHandler()}
													className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
													style={{ minWidth: header.getSize() }}
												>
													<div className="items-center justify-between text-xs text-gray-200">
														<p className="text-lg font-bold text-gray-600">
															{header.id}
															{{
																asc: '  ▲',
																desc: '  ▼',
															}[header.column.getIsSorted() as string] ?? null}
														</p>
													</div>
												</th>
											);
										})}
									</tr>
								))}
						</thead>
						{data && (
							<tbody>
								{table &&
									table.getRowModel()?.rows.map((rows) => {
										return (
											<tr
												key={rows.id}
												className={`${isClick ? 'cursor-pointer' : ''}`}
												onClick={isClick ? () => itemClick(rows.original.postNo) : undefined}
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
						)}
					</table>
				) : (
					<SimpleGrid columns={3} spacing={5}>
						{cardList()}
					</SimpleGrid>
				)}
			</div>
			<div className="mt-8 bottom-0 left-0 right-0 mb-[2rem]">
				{/* 페이지 */}
				{totalPage > 1 && (
					<div className="flex justify-center flex-col sm:flex-row gap-5">
						<ul className="flex justify-center items-center gap-x-[10px] z-30" role="navigation" aria-label="Pagination">
							<li
								className={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${
									currentPage === 0 ? 'bg-[#cccccc] pointer-events-none' : ' cursor-pointer'
								}`}
								onClick={previousPage}
							>
								<MdChevronLeft />
							</li>
							{customPagination &&
								customPagination?.map((_data, index) => (
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
				)}

				{/* 검색 */}
				{isSearch && (
					<InputGroup className="mt-2 justify-center">
						<div className="!w-[8rem]">
							<Select id="option" defaultValue={search?.option} onChange={(e) => onSearch(e)}>
								{searchItem.map((item: any) => (
									<option key={item.option} value={item.option}>
										{item.value}
									</option>
								))}
							</Select>
						</div>
						<Input id="input" className="ml-[1rem] !w-[300px]" defaultValue={search?.input} onChange={(e) => onSearch(e)} ref={refSearch} />
						<SearchIcon className="flex my-auto ml-[1rem]" />
					</InputGroup>
				)}
			</div>
		</div>
	);
};

export default ColumnsTable;
