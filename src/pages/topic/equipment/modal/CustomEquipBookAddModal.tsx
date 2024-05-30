import {
	AlertDialogContent,
	AlertDialogHeader,
	Button,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogFooter,
	Select,
	Textarea,
	Switch,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import EquipService from '../../../../services/equipService';
import { useEquipAction, useEquipDetail } from '../../../../store/useEquip';
import { AddEquipParam } from './CustomEquipAddModal';
import useModal from '../../../../store/useModal';

export const CustomEquipBookAddModal = ({ title, onClose, row, setOpen }: any) => {
	const createEquip = EquipService().createEquipMutation;

	const [isEditable, setIsEditable] = useState<boolean>(false);

	const [eqType, setEqType] = useState<string>(title.type === '도서' ? 'book' : title.type);

	const refAssetCode = useRef<HTMLInputElement>(null);
	const refPrice = useRef<HTMLInputElement>(null);
	const refStatus = useRef<HTMLSelectElement>(null);
	const refNote = useRef<HTMLTextAreaElement>(null);
	const refPlace = useRef<HTMLInputElement>(null);
	const refEquipType = useRef<HTMLSelectElement>(null);

	const refBookGroup = useRef<HTMLInputElement>(null);
	const refBookName = useRef<HTMLTextAreaElement>(null);
	const refPublisher = useRef<HTMLInputElement>(null);
	const refAuthor = useRef<HTMLInputElement>(null);
	const refBookCover = useRef<HTMLInputElement>(null);
	const refEditableSwitch = useRef<any>(null);

	const equipDtl = useEquipDetail();

	const modifyEquip = EquipService().updateEquipMutation;
	const deleteEquip = EquipService().deleteEquipMutation;

	let equipNoParam;

	const [assetCode, setAssetCode] = useState<string>('');
	const [status, setStatus] = useState<string>('');

	const [bookName, setBookName] = useState<string>('');
	const [publisher, setPublisher] = useState<any>(['']);
	const [price, setPrice] = useState<string>('');
	const [note, setNote] = useState<string>('');
	const [author, setAuthor] = useState<string>('');
	const [bookCover, setBookCover] = useState<string>('');
	const [bookGroup, setBookGroup] = useState<string>('');
	const [createTime, setCreateTime] = useState<string>('');
	const [updateTime, setUpdateTime] = useState<string>('');
	const { openModal } = useModal();

	const refCreateTime = useRef<HTMLInputElement>(null);
	const refUpdateTime = useRef<HTMLInputElement>(null);
	const [place, setPlace] = useState<string>('');

	const equipAction = useEquipAction();
	const onEquipClose = () => {
		equipAction.setEquipClear();
		setOpen(false);
		onClose();
	};
	const onDeleteEquip = () => {
		const equipNo = equipDtl.equipment.equipmentNo;
		deleteEquip.mutate({ seqNo: equipNo });
		onEquipClose();
	};
	const addBook = () => {
		const param = {} as AddEquipParam;
		if (!refEquipType.current?.value) {
			openModal({ type: 3, closeOnOverlay: true, contents: '물자타입 누락' });
			return;
		}
		if (!refBookName.current?.value) {
			openModal({ type: 3, closeOnOverlay: true, contents: '도서명 누락' });
			return;
		}
		if (!refStatus.current?.value) {
			openModal({ type: 3, closeOnOverlay: true, contents: '도서 상태 누락' });
			return;
		}
		if (!refBookGroup.current?.value) {
			openModal({ type: 3, closeOnOverlay: true, contents: '도서 분류 누락' });
			return;
		}
		if (!refPublisher.current?.value) {
			openModal({ type: 3, closeOnOverlay: true, contents: '출판사 누락' });
			return;
		}

		if (!refAuthor.current?.value) {
			openModal({ type: 3, closeOnOverlay: true, contents: '작가 누락' });
			return;
		}
		if (!refPlace.current?.value) {
			openModal({ type: 3, closeOnOverlay: true, contents: '위치 누락' });
			return;
		}
		param.equipType = eqType;
		param.equipment = {
			assetCode: refAssetCode.current?.value || '',
			status: refStatus.current?.value,
			note: refNote.current?.value || '',
			price: refPrice.current?.value || '',
			place: refPlace.current?.value || '',
			createDate: refCreateTime.current?.value || '',
			modifyDate: refUpdateTime.current?.value || '',
			type: 0,
		};
		param.book = {
			bookGroup: refBookGroup.current.value,
			bookName: refBookName.current.value,
			publisher: refPublisher.current.value,
			author: refAuthor.current.value,
			bookCover: refBookCover.current?.value || '',
		};
		if (row) {
			param.equipment = {
				...param.equipment,
				equipmentNo: equipDtl.equipment.equipmentNo,
			};
			param.book = {
				...param.book,
				bookNo: equipDtl.book?.bookNo,
			};
		}

		if (row) {
			modifyEquip.mutate(param);
		} else {
			createEquip.mutate(param);
		}
		onEquipClose();
	};
	if (row) {
		equipNoParam = {
			equipmentNo: row.equipmentNo,
			equipType: 'book',
		};
		refEquipType.current?.setAttribute('disabled', 'true');
	}
	const { isSuccess } = useQuery(['getEquipsDtl', equipNoParam?.equipmentNo], EquipService(equipNoParam).getEquipDetail);

	useEffect(() => {
		if (isSuccess && equipDtl.equipment) {
			setAssetCode(equipDtl.equipment.assetCode || '');
			setPrice(equipDtl.equipment.price || '');
			setStatus(equipDtl.equipment.status || '');
			setPlace(equipDtl.equipment?.place || '');
			setNote(equipDtl.equipment?.note || '');
			setCreateTime(equipDtl.equipment.createDate || '');
			setUpdateTime(equipDtl.equipment.modifyDate || '');
			if (eqType === 'book') {
				setAuthor(equipDtl.book?.author || '');
				setBookCover(equipDtl.book?.bookCover || '');
				setBookGroup(equipDtl.book?.bookGroup || '');
				setBookName(equipDtl.book?.bookName || '');
				setPublisher(equipDtl.book?.publisher || '');
			}
		}
	}, [isSuccess, equipDtl]);

	return (
		<AlertDialogContent className="min-w-[40vw] ">
			<AlertDialogHeader>
				<div className="flex justify-between">
					<p>도서 등록</p>
					<div className="mr-5 items-center flex">
						<p className="text-sm mr-3">수정 </p>
						<Switch
							id="switch5"
							ref={refEditableSwitch}
							defaultChecked={isEditable}
							onChange={() => {
								setIsEditable(!isEditable);
							}}
						/>
					</div>
				</div>
			</AlertDialogHeader>
			<div className="h-px w-full bg-gray-300 dark:bg-white/20 " />
			<AlertDialogCloseButton
				onClick={() => {
					onEquipClose();
				}}
			/>
			<AlertDialogBody>
				<div className="grid h-full grid-cols-2">
					<div className="grid col-span-1">
						<div className="flex mt-2 mb-2 start justify-start">
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">자산 코드 :</p>
							</div>
							<div className="">
								<input
									type="text"
									id="bookAsset"
									ref={refAssetCode}
									readOnly={!isEditable}
									disabled={false}
									defaultValue={assetCode || ''}
									className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>
						<div className="flex mt-2 mb-2 start justify-start">
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">가격 :</p>
							</div>
							<div className="">
								<input
									type="text"
									id="bookPrice"
									ref={refPrice}
									readOnly={!isEditable}
									disabled={false}
									defaultValue={price || ''}
									className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>
						<div className="flex mt-2 mb-2 start justify-start">
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">상태 :</p>
							</div>
							<div className="">
								<Select
									id="bookStatus"
									className="ml-2 !max-w-[100px] flex justify"
									onChange={(e) => {
										setStatus(e.target.value);
									}}
									ref={refStatus}
									disabled={!isEditable}
									value={status}
								>
									<option value="비치중">비치중</option>
									<option value="유휴">유휴</option>
									<option value="불량">불량</option>
									<option value="폐기">폐기</option>
								</Select>
							</div>
						</div>
						<div className="flex mt-2 mb-2 start justify-start">
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">위치 :</p>
							</div>
							<div className="">
								<input
									type="text"
									id="bookPlace"
									disabled={false}
									defaultValue={place || ''}
									ref={refPlace}
									readOnly={!isEditable}
									className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>
						<div className="flex mt-2 mb-2 start justify-start">
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">입고일 :</p>
							</div>
							<div className="">
								<input
									type="datetime-local"
									id="bookCreate"
									disabled={false}
									readOnly={!isEditable}
									defaultValue={createTime || ''}
									ref={refCreateTime}
									className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>
						<div className="flex mt-2 mb-2 start justify-start">
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">최종 수정일 :</p>
							</div>
							<div className="">
								<input
									type="datetime-local"
									id="bookUpdate"
									disabled={false}
									readOnly={!isEditable}
									defaultValue={updateTime || ''}
									ref={refUpdateTime}
									className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>
						<div className="flex mt-2 mb-2 justify-star h-[15vh]">
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">비고 :</p>
							</div>
							<div className="w-[11vw] h-[15vh]">
								<Textarea
									id="bookNote"
									ref={refNote}
									readOnly={!isEditable}
									disabled={false}
									defaultValue={note || ''}
									className="read-only ml-2 flex h-10 w-full h-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>
					</div>
					<div className="grid col-span-1">
						<div className="flex mt-2 mb-2 start justify-start">
							<div className="flex">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">책 이름 :</p>
							</div>
							<div className="self-center">
								<Textarea
									id="bookName"
									ref={refBookName}
									readOnly={!isEditable}
									defaultValue={bookName || ''}
									disabled={false}
									className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>
						<div className="flex mt-2 mb-2 start justify-start">
							<div className="flex">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">출판사 :</p>
							</div>
							<div className="">
								<input
									type="text"
									id="bookPub"
									readOnly={!isEditable}
									ref={refPublisher}
									defaultValue={publisher || ''}
									disabled={false}
									className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>
						<div className="flex mt-2 mb-2 start justify-start">
							<div className="flex">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">책 분류 :</p>
							</div>
							<div className="">
								<input
									type="text"
									id="bookGrp"
									readOnly={!isEditable}
									ref={refBookGroup}
									defaultValue={bookGroup || ''}
									disabled={false}
									className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>
						<div className="flex mt-2 mb-2 start justify-start">
							<div className="flex">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">작가 :</p>
							</div>
							<div className="">
								<input
									type="text"
									readOnly={!isEditable}
									id="bookAuthor"
									ref={refAuthor}
									defaultValue={author || ''}
									disabled={false}
									className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>
						<div className="flex mt-2 mb-2 start justify-start">
							<div className="flex">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">표지 사진 :</p>
							</div>
							<div className="">
								<input
									type="text"
									ref={refBookCover}
									id="bookCover"
									readOnly={!isEditable}
									defaultValue={bookCover || ''}
									disabled={false}
									className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>
					</div>
				</div>
			</AlertDialogBody>
			<div className="h-px w-full bg-gray-300 dark:bg-white/20 " />
			<AlertDialogFooter>
				<Select id="bookType" className="!min-w-[120px]" ref={refEquipType}>
					<option value="book">도서</option>
				</Select>
				<Button
					colorScheme="blue"
					className="mr-3 ml-3"
					onClick={() => {
						addBook();
					}}
				>
					확인
				</Button>
				<Button
					colorScheme="red"
					onClick={() => {
						onDeleteEquip();
					}}
				>
					삭제
				</Button>
				<Button
					colorScheme="red"
					className="ml-3"
					onClick={() => {
						onEquipClose();
					}}
				>
					취소
				</Button>
			</AlertDialogFooter>
		</AlertDialogContent>
	);
};
