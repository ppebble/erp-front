/* eslint-disable react/no-unstable-nested-components */
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, PaginationState, useReactTable } from '@tanstack/react-table';
import { LegacyRef, MutableRefObject, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import SwiperCore, { Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GoDot, GoDotFill } from 'react-icons/go';

import { Button, Input, Textarea } from '@chakra-ui/react';
import ReactSignatureCanvas from 'react-signature-canvas';
import { MdChevronLeft, MdChevronRight, MdFormatListBulleted, MdLaptopChromebook, MdOutlineCheck } from 'react-icons/md';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/card';
import { AnnReqProps, useAdminAnnRequest, useAnnRequest, useAnnualAction } from '../../../store/useAnnual';
import AnnualService from '../../../services/annualService';
import Dropdown from '../../../components/dropdown';
import CustomClickableOneLineWidget from '../../../components/widget/CustomOneLineWidget';
import useModal from '../../../store/useModal';
import { ModalList } from '../../../store/common/useCommon';
import AuthService from '../../../services/authService';

const ANNUAL_STRING = {
	reqMng: '신청 연차 관리',
	aprMng: '연차 승인 관리',
};

const AnnualManageComponent = () => {
	const reqData = useAdminAnnRequest();
	const annReqColHelper = createColumnHelper<AnnReqProps>();
	const refSignCanvas = useRef() as MutableRefObject<any>;
	const [title, setTitle] = useState<string>(ANNUAL_STRING.reqMng);
	const [openSign, setOpenSign] = useState<boolean>(false);
	const [data, setData] = useState<any>(reqData.items);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [totalPage, setTotalPage] = useState<number>(reqData.totalPages);
	const dateValidation = (date: string) => {
		const today = moment().format('YYYY-MM-DD HH:mm');
		return moment(date).isAfter(today);
	};

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 5,
	});
	const navigate = useNavigate();
	const { isSuccess } = useQuery(
		['getAnnApproveList', currentPage + 1],
		AnnualService({ managerNo: 49, currentPage: currentPage + 1, pageSize: pagination.pageSize }).getAdminAnnualRequest,
	);
	const { data: isAdmin } = useQuery(['adminCheck'], AuthService().checkAdmin);
	useEffect(() => {
		if (title === ANNUAL_STRING.aprMng) {
			setData(reqData.items.filter((e) => e.signType === 0 || dateValidation(e.start)));
			setCurrentPage(0);
		} else if (title === ANNUAL_STRING.reqMng) {
			setTotalPage(reqData.totalPages);
			setData(reqData.items);
			setCurrentPage(0);
		}
	}, [title]);
	useEffect(() => {
		if (isAdmin && !isAdmin.result) {
			navigate('/topic/dashboard');
		}
	}, [isAdmin]);
	useEffect(() => {
		if (title === ANNUAL_STRING.aprMng) {
			setData(reqData.items.filter((e) => e.signType === 0 || dateValidation(e.start)));
		} else if (title === ANNUAL_STRING.reqMng) {
			setTotalPage(reqData.totalPages);
			setData(reqData.items);
		}
	}, [reqData]);
	useEffect(() => {
		if (title === ANNUAL_STRING.aprMng) {
			console.log(`TOTAL INDEX === ${Math.ceil(reqData && reqData.totalApproveElements / 5)}`);
			setTotalPage(Math.ceil(reqData && reqData.totalApproveElements / 5));
		} else if (title === ANNUAL_STRING.reqMng) {
			setTotalPage(reqData.totalPages);
		}
	}, [data]);
	useEffect(() => {
		if (title === ANNUAL_STRING.aprMng) {
			setData(reqData.items.filter((e) => e.signType === 0 || dateValidation(e.start)));
		} else if (title === ANNUAL_STRING.reqMng) {
			setTotalPage(reqData.totalPages);
			setData(reqData.items);
		}
	}, [currentPage]);
	const NoteCell = ({ getValue, row, column, table }: any) => {
		const initValue = getValue();
		const [value, setValue] = useState<string>(initValue);
		useEffect(() => {
			setValue(initValue);
		}, [initValue]);
		const onBlur = () => {
			table.options.meta?.updateData(row.index, column.id, value);
		};
		return (
			<div className="flex font-bold">
				<Textarea
					disabled={!dateValidation(row.original.start) && row.original.signType !== 0}
					defaultValue={value}
					onChange={(e) => {
						setValue(e.target.value);
					}}
					onMouseDown={(e) => {
						e.currentTarget.focus();
					}}
					onBlur={onBlur}
					className="read-only ml-2 flex h-10 w-full h-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
				/>
			</div>
		);
	};
	const annualService = AnnualService();
	const annReqColumns = [
		annReqColHelper.accessor('register', {
			id: 'register',
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
			id: 'note',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">사유</p>,
			cell: (info) => (
				<div className="flex font-bold">
					<p className="text-md font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
				</div>
			),
		}),
		annReqColHelper.accessor('approval', {
			id: 'approval',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">승인</p>,
			cell: (info) => (
				<div className={`${dateValidation(info.row.original.start) || info.row.original.signType === 0 ? '' : 'hidden'} flex font-bold`}>
					<Button
						onClick={() => {
							if (window.confirm('연차 신청을 승인하시겠습니까?')) {
								annualService.approveAnnual.mutate({
									approvalNo: info.row.original.approvalNo,
									managerSign: refSignCanvas.current?.isEmpty() ? '' : refSignCanvas.current?.toDataURL(),
								});
							}
						}}
						colorScheme="blue"
					>
						승인
					</Button>
				</div>
			),
		}),

		annReqColHelper.accessor('reject', {
			id: 'reject',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">반려</p>,
			cell: (info) => (
				<div className={`${dateValidation(info.row.original.start) || info.row.original.signType === 0 ? '' : 'hidden'} flex font-bold`}>
					<Button
						onClick={() => {
							if (window.confirm('연차 신청을 반려하시겠습니까?')) {
								annualService.rejectAnnual.mutate({
									approvalNo: info.row.original.approvalNo,
									content: info.row.renderValue('manageNote') || ' ',
								});
							}
						}}
						colorScheme="red"
					>
						반려
					</Button>
				</div>
			),
		}),
		annReqColHelper.accessor('manageNote', {
			id: 'manageNote',
			header: () => <p className="text-sm font-bold text-gray-900 dark:text-white">반려 사유</p>,
			cell: NoteCell,
		}),
		annReqColHelper.accessor('approvalNo', {
			id: 'approvalNo',
			header: () => <p className="hidden" />,
			cell: (info) => <p className="hidden">{info.getValue()}</p>,
		}),
	];

	const annReqTable = useReactTable({
		data: data || reqData.items || '',
		columns: annReqColumns,
		state: {
			pagination,
		},
		meta: {
			updateData: (rowIndex: number, columnId: string, value: string) => {
				setData((old: any) =>
					old.map((row: any, index: any) => {
						if (index === rowIndex) {
							return {
								...old[rowIndex],
								[columnId]: value,
							};
						}
						return row;
					}),
				);
			},
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
	});
	const { openModal } = useModal();

	return (
		<div className="grid grid-cols-12 gap-2">
			<div className="mt-5 col-span-2">
				<CustomClickableOneLineWidget
					icon={<MdFormatListBulleted className="h-7 w-7" />}
					title="신청 연차 관리"
					onClickHandler={() => {
						setTitle(ANNUAL_STRING.reqMng);
					}}
					selectedTitle={title}
				/>
				<CustomClickableOneLineWidget
					icon={<MdOutlineCheck className="h-7 w-7" />}
					title="연차 승인 관리"
					onClickHandler={() => {
						setTitle(ANNUAL_STRING.aprMng);
					}}
					selectedTitle={title}
				/>
			</div>
			<Card extra={`col-span-10 w-full pl-4 p-2 h-full min-h-[65vh] mt-5 `}>
				<div className="flex justify-between">
					<div className="text-xl mt-3 font-bold text-navy-700 dark:text-white col-span-3 ml-1"> 연차 신청 목록</div>
					<Dropdown
						button={
							<Button
								colorScheme="blue"
								onClick={() => {
									setOpenSign(!openSign);
								}}
							>
								서명 수정
							</Button>
						}
						animation="origin-top-right transition-all duration-300 ease-in-out"
						classNames="top-8 right-0 w-max"
					>
						<div className="z-50 w-max rounded-xl bg-white py-3 px-4 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
							<div className="mt-2 ml-4">
								<ReactSignatureCanvas ref={refSignCanvas} canvasProps={{ className: 'border bg-gray-100' }} />
								<div className="mt-2 h-px w-full bg-gray-200 dark:bg-white/20 " />
								<Button
									colorScheme="red"
									className="mt-2"
									onClick={() => {
										refSignCanvas.current?.clear();
									}}
								>
									지우기
								</Button>
							</div>
						</div>
					</Dropdown>
				</div>
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
													<td
														onClick={() => {
															if (cell.id.includes('register') || cell.id.includes('start') || cell.id.includes('end') || cell.id.includes('note')) {
																openModal({
																	type: ModalList.ANNUAL_REQUEST,
																	closeOnOverlay: false,
																	contents: { approvalNo: row.original.approvalNo },
																});
															}
														}}
														key={cell.id}
														className="min-w-[60px] border-white/0 py-3 pr-2"
													>
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
				<div className="flex mt-5">
					<div className="w-full" />
					<div className="w-[50%]  flex justify-center sm:justify-center flex-col sm:flex-row mt-1.5 px-1 items-center">
						<div className="flex">
							<ul className="flex justify-center items-center gap-x-[1px]" role="navigation" aria-label="Pagination">
								<li
									className={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${
										currentPage === 0 ? 'bg-[#cccccc] pointer-events-none' : ' cursor-pointer'
									}`}
									onClick={() => {
										setCurrentPage(currentPage - 1);
									}}
								>
									<MdChevronLeft />
								</li>
								{Array.from({ length: totalPage || 0 }).map((_, index) => (
									<li
										className={`${
											index + 1 > currentPage - 5 && currentPage + 5 > index + 1 ? '' : 'hidden'
										} flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${
											currentPage === index ? 'text-blue-600  border-sky-500' : 'border-[#E4E4EB] '
										}`}
										onClick={() => {
											setCurrentPage(index);
										}}
										// eslint-disable-next-line react/no-array-index-key
										key={index}
									>
										{index + 1}
									</li>
								))}
								<li
									className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
										currentPage + 1 === totalPage ? 'bg-[#cccccc] pointer-events-none' : ' cursor-pointer'
									}`}
									onClick={() => {
										setCurrentPage(currentPage + 1);
									}}
								>
									<MdChevronRight />
								</li>
							</ul>
						</div>
					</div>
					<div className="w-full" />
				</div>
			</Card>
		</div>
	);
};

export default AnnualManageComponent;
