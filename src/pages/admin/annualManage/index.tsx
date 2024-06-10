/* eslint-disable react/no-unstable-nested-components */
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import SwiperCore, { Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GoDot, GoDotFill } from 'react-icons/go';

import { Button, Input, Textarea } from '@chakra-ui/react';
import ReactSignatureCanvas from 'react-signature-canvas';
import Card from '../../../components/card';
import { AnnReqProps, useAdminAnnRequest, useAnnRequest } from '../../../store/useAnnual';
import AnnualService from '../../../services/annualService';
import Dropdown from '../../../components/dropdown';

const AnnualManageComponent = () => {
	useQuery(['getAnnApproveList'], AnnualService({ managerNo: 49 }).getAdminAnnualRequest);

	const reqData = useAdminAnnRequest();
	const annReqColHelper = createColumnHelper<AnnReqProps>();
	const refMngNote = useRef<HTMLTextAreaElement>(null);
	const refSignCanvas = useRef() as MutableRefObject<any>;

	const [openSign, setOpenSign] = useState<boolean>(false);

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
				<div className="flex font-bold">
					<Button
						onClick={() => {
							if (window.confirm('연차 신청을 승인하시겠습니까?')) {
								annualService.approveAnnual.mutate({
									historyNo: info.row.original.historyNo,
									expires: info.row.original.start,
									managerSign: refSignCanvas.current?.isEmpty() ? '' : refSignCanvas.current?.toDataURL(),
								});
								// console.log({
								// 	historyNo: info.row.original.historyNo,
								// 	expires: info.row.original.start,
								// 	sign: refSignCanvas.current?.isEmpty() ? '' : refSignCanvas.current?.toDataURL(),
								// });
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
				<div className="flex font-bold">
					<Button
						onClick={() => {
							if (window.confirm('연차 신청을 반려하시겠습니까?')) {
								annualService.rejectAnnual.mutate({
									historyNo: info.row.original.historyNo,
									content: refMngNote.current?.value ? refMngNote.current?.value : '',
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
			cell: (info) => (
				<div className="flex font-bold">
					<Textarea ref={refMngNote} className="text-md font-medium text-gray-900 dark:text-white" />
				</div>
			),
		}),
	];

	const annReqTable = useReactTable({
		data: reqData,
		columns: annReqColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="grid grid-cols-12 gap-2">
			<Card extra={`col-span-12 w-full pl-4 p-2 h-full min-h-[65vh] mt-5 `}>
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
								<Button
									colorScheme="red"
									className="mt-2"
									onClick={() => {
										console.log(refSignCanvas.current?.toDataURL());
									}}
								>
									code
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
													<td key={cell.id} className="min-w-[60px] border-white/0 py-3 pr-2">
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
			</Card>
			{/* <Card extra={`${openSign ? 'w-0 h-0 hidden' : ''} w-full pl-4 p-2 h-full min-h-[65vh] mt-5 col-span-3`}>
				<div className="text-xl mt-3 font-bold text-navy-700 dark:text-white col-span-3 ml-1 mb-3"> 승인자 서명</div>
				<div>
					<ReactSignatureCanvas ref={refSignCanvas} canvasProps={{ className: 'border bg-gray-100' }} />
					<div className="mt-5 flex flex-end">
						<Button
							colorScheme="red"
							className=""
							onClick={() => {
								refSignCanvas.current?.clear();
							}}
						>
							지우기
						</Button>
					</div>
				</div>
			</Card> */}
		</div>
	);
};

export default AnnualManageComponent;
