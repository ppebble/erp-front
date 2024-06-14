import { AlertDialogContent, AlertDialogHeader, Button, AlertDialogBody, AlertDialogCloseButton, AlertDialogFooter, Select } from '@chakra-ui/react';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import ReactSignatureCanvas from 'react-signature-canvas';
import { useCalendarEvnetParam } from '../../../../../store/useCalendar';
import { annualProps, scheduleResult } from '../../../../../network/response/scheduleResult';
import AnnualService from '../../../../../services/annualService';
import { useAnnualAction, useManagerList } from '../../../../../store/useAnnual';
import useModal from '../../../../../store/useModal';
import { AnnualType, SignType } from '../../../../../store/common/useCommon';

export const CustomAnnualAddModal = ({ onClose }: any) => {
	const [annType, setAnnType] = useState<string>('연차');
	const selectedEvent = useCalendarEvnetParam();
	const [manager, setManager] = useState<number>(0);

	const [defStart, setDefStart] = useState<string | undefined>('');
	const [defEnd, setDefEnd] = useState<string | undefined>('');

	const refEventDesc = useRef<HTMLInputElement>(null);
	const refEventStartDate = useRef<HTMLInputElement>(null);
	const refEventEndDate = useRef<HTMLInputElement>(null);
	const refAnnHalfDate = useRef<HTMLInputElement>(null);

	const refSignCanvas = useRef() as MutableRefObject<any>;

	const managerList = useManagerList();
	const { openModal } = useModal();

	const createAnnual = AnnualService().createAnnualMutation;

	const onCloseAnn = () => {
		setDefEnd('');
		setDefStart('');
		onClose();
	};

	const setEvnet = async () => {
		const annualParam = {} as annualProps;

		if (!refEventDesc.current?.value) {
			openModal({ type: 3, closeOnOverlay: true, contents: '사유 누락' });
			return;
		}
		if (annType.includes('반차')) {
			if (!refAnnHalfDate.current?.value) {
				openModal({ type: 3, closeOnOverlay: true, contents: '날짜 입력 누락' });
				return;
			}
		} else {
			if (!refEventStartDate.current?.value) {
				openModal({ type: 3, closeOnOverlay: true, contents: '시작 날짜 입력 누락' });
				return;
			}
			if (!refEventEndDate.current?.value) {
				openModal({ type: 3, closeOnOverlay: true, contents: '종료 날짜 입력 누락' });
				return;
			}
		}

		if (annType.includes('반차')) {
			if (annType === '오전반차') {
				annualParam.start = `${refAnnHalfDate.current?.value.slice(0, 10)}T09:00`;
				annualParam.end = `${refAnnHalfDate.current?.value.slice(0, 10)}T14:00`;
			} else if (annType === '오후반차') {
				annualParam.start = `${refAnnHalfDate.current?.value.slice(0, 10)}T13:00`;
				annualParam.end = `${refAnnHalfDate.current?.value.slice(0, 10)}T18:00`;
			}
		} else {
			annualParam.start = `${refEventStartDate.current?.value}T09:00` || '';
			annualParam.end = `${refEventEndDate.current?.value}T18:00` || '';
		}

		annualParam.sign = refSignCanvas.current?.toDataURL();
		annualParam.annType = annType.includes('반차') ? AnnualType.반차 : AnnualType.연차;
		annualParam.managerNo = manager;
		annualParam.signType = SignType.self;
		if (refEventDesc.current?.value) {
			annualParam.note = refEventDesc.current.value;
		}

		// 연차 신청서 작성
		createAnnual.mutate(annualParam);

		onCloseAnn();
	};
	const onClickConfirm = () => {
		setEvnet();
	};

	return (
		<AlertDialogContent>
			<AlertDialogHeader>
				<div className="flex justify-between">
					<p>휴가 신청</p>
				</div>
			</AlertDialogHeader>
			<div className="h-px w-full bg-gray-300 dark:bg-white/20 " />
			<AlertDialogCloseButton
				onClick={() => {
					onCloseAnn();
				}}
			/>
			<AlertDialogBody>
				<div className="grid h-full grid-cols-1">
					<div className="mt-5 start justify-start">
						<div className="flex justify-start">
							<p className="text-base font-bold text-navy-700 dark:text-white">사유 :</p>
						</div>
						<div className="flex justify-start">
							<input
								type="text"
								ref={refEventDesc}
								id="eventName"
								disabled={false}
								defaultValue={selectedEvent?.title}
								className="mt-2 read-only flex h-12 w-full items-center border bg-white/0 p-3 border-b-gray-500 border-white/10 text-sm outline-none dark:!border-white/10 dark:text-white"
							/>
						</div>
					</div>
					<div className="mt-5 start justify-start">
						<div className="flex justify-start">
							<p className="text-base font-bold text-navy-700 dark:text-white">날짜 선택 :</p>
						</div>
						<div className={`${annType.includes('반차') ? 'invisible h-0 mb-0' : ''}`}>
							<div className="flex justify-start">
								<input
									type="date"
									ref={refEventStartDate}
									id="eventName"
									disabled={false}
									defaultValue={defStart}
									className="mt-2 mr-3 read-only flex h-12 w-full items-center justify-center  border bg-white/0 p-3 text-sm outline-none border-b-gray-500 border-white/10 dark:!border-white/10 dark:text-white"
								/>
								<div className="justify-center items-center flex">
									<p className="tex-base font-bold text-xl">-</p>
								</div>
								<input
									type="date"
									ref={refEventEndDate}
									id="eventName"
									disabled={false}
									defaultValue={defEnd}
									className="mt-2 ml-3 read-only flex h-12 w-full items-center justify-center  border bg-white/0 p-3 text-sm outline-none border-b-gray-500 border-white/10 dark:!border-white/10 dark:text-white"
								/>
							</div>
						</div>
						<div className={`${annType.includes('반차') ? '' : 'invisible h-0 mb-0'}`}>
							<div className="flex justify-start">
								<input
									type="date"
									ref={refAnnHalfDate}
									id="eventName"
									disabled={false}
									defaultValue={defStart}
									className="mt-2 mr-3 read-only flex h-12 w-full items-center justify-center  border bg-white/0 p-3 text-sm outline-none border-b-gray-500 border-white/10 dark:!border-white/10 dark:text-white"
								/>
							</div>
						</div>
					</div>
					<div className="mt-5 start justify-start">
						<div className="flex justify-start">
							<p className="text-base font-bold text-navy-700 dark:text-white">승인 :</p>
						</div>
						<div className="flex justify-start mb-5">
							<Select
								id="task"
								className="!min-w-[120px]"
								onChange={(e) => {
									setManager(Number.parseInt(e.target.value, 10));
								}}
							>
								{managerList.length > 0 &&
									managerList.map((e) => {
										return (
											<option key={e.profileNo} value={e.profileNo}>
												{e.name}
											</option>
										);
									})}
							</Select>
						</div>
					</div>
					<div className="mt-5 start justify-start">
						<div className="flex justify-start">
							<p className="text-base font-bold text-navy-700 dark:text-white">서명 :</p>
						</div>
						<div className="flex justify-start mb-5">
							<ReactSignatureCanvas ref={refSignCanvas} canvasProps={{ className: 'border bg-gray-100' }} />
							<Button
								colorScheme="red"
								className="ml-3"
								onClick={() => {
									refSignCanvas.current?.clear();
								}}
							>
								지우기
							</Button>
						</div>
					</div>
				</div>
			</AlertDialogBody>
			<div className="h-px w-full bg-gray-300 dark:bg-white/20 " />
			<AlertDialogFooter>
				<Select
					onChange={(e) => {
						setAnnType(e.target.value);
					}}
					id="task"
					className="!min-w-[120px]"
				>
					<option value="연차">연차</option>
					<option value="오전반차">오전 반차</option>
					<option value="오후반차">오후 반차</option>
					<option value="경조">경조</option>
					<option value="결근">결근</option>
					<option value="하기휴가">하기휴가</option>
				</Select>
				<Button
					colorScheme="blue"
					className="mr-3 ml-3"
					onClick={() => {
						onClickConfirm();
					}}
				>
					확인
				</Button>
				<Button
					colorScheme="red"
					onClick={() => {
						onCloseAnn();
					}}
				>
					취소
				</Button>
			</AlertDialogFooter>
		</AlertDialogContent>
	);
};
