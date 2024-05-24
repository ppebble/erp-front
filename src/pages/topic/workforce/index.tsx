import { useMemo, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { SortingState, createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Flex, Input, InputGroup, InputRightElement, Select, Spacer } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { ProfileService } from '../../../services/profileService';
import useProfile from '../../../store/useProfile';
import { profileList as profileListType } from '../../../network/response/profileList';
import Card from '../../../components/card';

const Workforce = () => {
	useQuery('getProfileList', ProfileService().getProfileList);
	const { profileList } = useProfile(); // 전체 리스트
	const row = 10;

	const [totalPage, setTotalPage] = useState(Math.ceil(profileList.length / row));

	const splitList = () => {
		const array = [];
		for (let i = 0; i < totalPage; i += 1) {
			array.push(profileList.slice(i * row, (i + 1) * row));
		}
		return array;
	};

	const [profileListSplit] = useState<any>(splitList()); // 10개(row)씩 나눈 리스트
	const [searchSplit, setSearchSplit] = useState<any>(); // 검색 결과 리스트

	const [data, setData] = useState(profileListSplit[0]);

	const [search, setSearch] = useState({ option: 'name', input: '' });
	const [sorting, setSorting] = useState<SortingState>([]);
	const [currentPage, setCurrentPage] = useState(0);
	const columnHelper = createColumnHelper<profileListType>();

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

	const addTag = (value: any) => {
		return <p className="text-md font-bold">{value}</p>;
	};

	const columns = [
		columnHelper.accessor('name', {
			id: '이름',
			cell: (info) => addTag(info.getValue()),
			size: 200,
		}),
		columnHelper.accessor('position', {
			id: '직책',
			cell: (info) => addTag(info.getValue()),
			size: 200,
		}),
		columnHelper.accessor('rank', {
			id: '직급',
			cell: (info) => addTag(info.getValue()),
			size: 200,
		}),
		columnHelper.accessor('task', {
			id: '부서',
			cell: (info) => addTag(info.getValue()),
			size: 250,
		}),
		columnHelper.accessor('place', {
			id: '근무지',
			cell: (info) => addTag(info.getValue()),
			size: 200,
		}),
		columnHelper.accessor('userEmail', {
			id: '이메일',
			cell: (info) => addTag(`${info.getValue()}@nexmore.co.kr`),
			size: 300,
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

	useEffect(() => {
		if (search.input) {
			setData(searchSplit[currentPage]);
		} else {
			setData(profileListSplit[currentPage]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage]);

	useEffect(() => {
		let filter;
		switch (search.option) {
			case 'name':
				filter = profileList.filter((item) => item.name.includes(search.input));
				break;
			case 'position':
				filter = profileList.filter((item) => item.position.includes(search.input));
				break;
			case 'rank':
				filter = profileList.filter((item) => item.rank.includes(search.input));
				break;
			case 'task':
				filter = profileList.filter((item) => item.task.includes(search.input));
				break;
			case 'place':
				filter = profileList.filter((item) => item.place.includes(search.input));
				break;
			default:
				break;
		}
		if (filter) {
			setCurrentPage(0);
			if (search.input) {
				const array = [];
				for (let i = 0; i < Math.ceil(filter.length / row); i += 1) {
					array.push(filter.slice(i * row, (i + 1) * row));
				}
				setSearchSplit(array);
				setData(array[0]);
			} else {
				setData(profileListSplit[currentPage]);
			}

			setTotalPage(Math.ceil(filter.length / row));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	return (
		<div className="mt-5 grid">
			<Card extra="w-full pb-10 p-4 h-full">
				<header className="relative flex items-center justify-between">
					<div className="text-xl font-bold text-navy-700 dark:text-white">인력사항</div>
				</header>

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
							{table.getRowModel().rows.map((row) => {
								return (
									<tr key={row.id}>
										{row.getVisibleCells().map((cell) => {
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
			</Card>
		</div>
	);
};

export default Workforce;
