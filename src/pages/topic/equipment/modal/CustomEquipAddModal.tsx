import {
	AlertDialogContent,
	AlertDialogHeader,
	Button,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogFooter,
	Select,
	Switch,
	Textarea,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import Tags from '@yaireo/tagify/dist/react.tagify';
import EquipService from '../../../../services/equipService';
import { useEquipAction, useEquipDetail } from '../../../../store/useEquip';

import { useMemberTags } from '../../../../store/useCalendar';
import CalendarService from '../../../../services/calendarService';
import { VmInfo } from './CustomEquipServerVm';
import useModal from '../../../../store/useModal';
import { DDR3Hz, DDR4Hz, DDR5Hz, EquipType, RamType, taskColor } from '../../../../store/common/useCommon';

export type AddEquipParam = {
	equipType: string;
	equipment: {
		equipmentNo?: number;
		type: number;
		status: string;
		price?: string;
		note?: string;
		assetCode: string;
		place?: string;
		createDate?: string;
		modifyDate?: string;
	};
	book?: {
		bookNo?: number;
		bookGroup: string;
		bookName: string;
		publisher: string;
		author: string;
		bookCover: string;
	};
	hardware?: {
		hwNo?: number;
		brandName: string; // vendor
		modelName: string; // model
		serialNo: string; // sn
		profileNo?: number;
		user?: string;
	};
	mobile?: {
		mbNo?: number;
		inch: string;
		os: string;
		osVersion: string;
		volume: string;
		ramSize: string;
	};
	pc?: {
		pcNo?: number;
		type: number;
		os: string;
		osVersion: string;
		cpu: string;
		gpu: string;
		ssd: string;
		hdd: string;
		ram: string;
		ramSize: string;
		isExpansion: number;
	};
	monitor?: {
		moNo?: number;
		resolution: string;
		inch: string;
	};
	server?: {
		serverNo?: number;
		ip: string;
		os: string;
		osVersion: string;
		cpu: string;
		gpu: string;
		hdd: string;
		ssd: string;
		ram: string;
		ramSize: string;
		isExpansion: number;
		vmList: VmInfo[];
	};
};

export const CustomEquipAddModal = ({ title, row, onClose, setOpen }: any) => {
	const createEquip = EquipService().createEquipMutation;
	const modifyEquip = EquipService().updateEquipMutation;
	const deleteEquip = EquipService().deleteEquipMutation;
	/**
	 *  n = notebook
	 *  d = desktop
	 *  s = server
	 *  m = mobile
	 *  m = monitor
            자산코드 가격 모델명 상태 sn 제조사 소지자 입고일 비고  | 공통

            os hdd/ssd ram  | 노트북 데탑 서버 모바일

            ram 확장가능여부 cpu gpu ip | 노트북 데탑 서버

            크기(inch) | 모니터 모바일
	 */
	const [ndsm, setNdsm] = useState<boolean>(false);
	const [nds, setNds] = useState<boolean>(true);
	const [mm, setMm] = useState<boolean>(false);
	const [monitor, setMonitor] = useState<boolean>(false);
	const [userName, setUserName] = useState<string>('');
	const [curTitle, setCurTitle] = useState<string>(title.type === 'notebook' ? 'pc' : title.type);
	const [eqType, setEqType] = useState<string>(title.type === 'notebook' ? 'pc' : title.type);
	const [isEditable, setIsEditable] = useState<boolean>(false);

	const refAssetCode = useRef<HTMLInputElement>(null);
	const refPrice = useRef<HTMLInputElement>(null);
	const refModel = useRef<HTMLInputElement>(null);
	const refStatus = useRef<HTMLSelectElement>(null);
	const refSn = useRef<HTMLInputElement>(null);
	const refVendor = useRef<HTMLInputElement>(null);
	const refResolution = useRef<HTMLInputElement>(null);
	const refIp = useRef<HTMLInputElement>(null);
	const refNote = useRef<HTMLTextAreaElement>(null);
	const refEquipType = useRef<HTMLSelectElement>(null);
	const refOs = useRef<HTMLSelectElement>(null);
	const refOsVer = useRef<HTMLInputElement>(null);
	const refHdd = useRef<HTMLInputElement>(null);
	const refSsd = useRef<HTMLInputElement>(null);
	const refRamType = useRef<HTMLSelectElement>(null);
	const refRamHz = useRef<HTMLSelectElement>(null);
	const refRamSize = useRef<HTMLInputElement>(null);
	const refRamIsExpand = useRef<HTMLSelectElement>(null);
	const refCpu = useRef<HTMLInputElement>(null);
	const refGpu = useRef<HTMLInputElement>(null);
	const refInch = useRef<HTMLInputElement>(null);
	const refCreateTime = useRef<HTMLInputElement>(null);
	const refEditableSwitch = useRef<any>(null);
	const refUpdateTime = useRef<HTMLInputElement>(null);
	const equipDtl = useEquipDetail();

	let equipNoParam;
	const memberTags = useMemberTags();

	const refTags = useRef<any>();

	useQuery(['getMembers'], CalendarService().availableProfile);

	const { openModal } = useModal();

	const [assetCode, setAssetCode] = useState<string>('');
	const [model, setModel] = useState<string>('');
	const [sn, setSn] = useState<string>('');
	const [vendor, setVendor] = useState<string>('');
	const [user, setUser] = useState<any>(['']);
	const [price, setPrice] = useState<string>('');
	const [note, setNote] = useState<string>('');
	const [os, setOs] = useState<string>('');
	const [osVer, setOsVer] = useState<string>('');
	const [ramType, setRamType] = useState<string>('DDR3');
	const [ramHz, setRamHz] = useState<string>('');
	const [cpu, setCpu] = useState<string>('');
	const [gpu, setGpu] = useState<string>('');
	const [inch, setInch] = useState<string>('');
	const [resolution, setResolution] = useState<string>('');
	const [hdd, setHdd] = useState<string>('');
	const [ssd, setSsd] = useState<string>('');
	const [createTime, setCreateTime] = useState<string>('');
	const [updateTime, setUpdateTime] = useState<string>('');
	const [status, setStatus] = useState<string>('');
	const [ramSize, setRamSize] = useState<string>('');
	const [ramIsExpand, setRamIsExpand] = useState<number>(0);

	const equipAction = useEquipAction();
	const onEquipClose = () => {
		setUser(['']);
		refTags.current.tagify.removeAllTags();
		equipAction.setEquipClear();
		setOpen(false);
		onClose();
	};
	const handleChange = (e: any) => {
		if (e.type === 'add') {
			if (memberTags) {
				setUser(e.detail.tagify.value[0].value);
			}
		}
		if (e.type === 'click') {
			if (memberTags) {
				refTags.current?.tagify.dropdown.select;
			}
		}
		if (e.type === 'remove') {
			setUserName('');
			setUser('');
		}
	};
	const settings = {
		whitelist: memberTags,
		maxTags: 1,
		enforceWhitelist: true,
		editTags: {
			keepInvalid: true,
		},
		dropdown: {
			enabled: 2,
			closeOnSelect: true,
		},
		callbacks: {
			add: handleChange,
			remove: handleChange,
			blur: handleChange,
			edit: handleChange,
			invalid: handleChange,
			click: handleChange,
			focus: handleChange,
			input: handleChange,
		},
	};
	const onAddEquip = () => {
		const param = {} as AddEquipParam;
		if (!refEquipType.current?.value) {
			openModal({ type: 3, closeOnOverlay: true, contents: '물자 타입 누락' });
			return;
		}
		if (!refModel.current?.value) {
			openModal({ type: 3, closeOnOverlay: true, contents: '모델명 누락' });
			return;
		}
		if (!refStatus.current?.value) {
			openModal({ type: 3, closeOnOverlay: true, contents: '물자 상태 누락' });
			return;
		}
		if (!refSn.current?.value) {
			openModal({ type: 3, closeOnOverlay: true, contents: 'S/N 누락' });
			return;
		}
		if (!refVendor.current?.value) {
			openModal({ type: 3, closeOnOverlay: true, contents: '제조사 누락' });
			return;
		}
		if (ndsm) {
			if (!refOs.current?.value) {
				openModal({ type: 3, closeOnOverlay: true, contents: 'OS 누락' });
				return;
			}
			if (!refSsd.current?.value && !refHdd.current?.value) {
				openModal({ type: 3, closeOnOverlay: true, contents: '저장장치 용량(SSD/HDD) 누락' });
				return;
			}
			if (!refRamSize.current?.value) {
				openModal({ type: 3, closeOnOverlay: true, contents: 'RAM 용량 누락' });
				return;
			}
			if (!refRamType.current?.value) {
				openModal({ type: 3, closeOnOverlay: true, contents: 'RAM 타입 누락' });
				return;
			}
		}
		if (nds) {
			if (!refRamIsExpand.current?.value) {
				openModal({ type: 3, closeOnOverlay: true, contents: 'RAM 확장 가능 여부 누락' });
				return;
			}
			if (!refCpu.current?.value) {
				openModal({ type: 3, closeOnOverlay: true, contents: 'CPUI 누락' });
				return;
			}
			if (!refGpu.current?.value) {
				openModal({ type: 3, closeOnOverlay: true, contents: 'GPU 누락' });
				return;
			}
		}
		if (mm) {
			if (!refInch.current?.value) {
				openModal({ type: 3, closeOnOverlay: true, contents: '사이즈(inch) 누락' });
				return;
			}
		}
		if (monitor) {
			if (!refResolution.current?.value) {
				openModal({ type: 3, closeOnOverlay: true, contents: '해상도 누락' });
				return;
			}
		}
		const ram = `${refRamType.current?.value}-${refRamHz.current?.value}`;
		if (eqType === 'notebook' || eqType === 'desktop') {
			param.equipType = 'pc';
		} else {
			param.equipType = eqType;
		}
		param.equipment = {
			assetCode: refAssetCode.current?.value || '',
			status: refStatus.current?.value,
			note: refNote.current?.value || '',
			price: refPrice.current?.value || '',
			place: '',
			type: 1,
			createDate: refCreateTime.current?.value || '',
			modifyDate: refUpdateTime.current?.value || '',
		};

		param.hardware = {
			brandName: refVendor.current.value,
			modelName: refModel.current.value,
			serialNo: refSn.current.value,
			user,
		};

		if (eqType === 'mobile') {
			param.mobile = {
				inch: refInch.current?.value || '0',
				os: refOs.current?.value || '',
				osVersion: refOsVer.current?.value || '',
				ramSize: refRamSize.current?.value || '',
				volume: refHdd.current?.value || '',
			};
			if (row) {
				param.mobile = {
					...param.mobile,
					mbNo: equipDtl.mobile?.mbNo,
				};
			}
		} else if (eqType === 'desktop' || eqType === 'notebook') {
			const type = eqType === 'notebook' ? 0 : 1;
			param.pc = {
				cpu: refCpu.current?.value || '',
				gpu: refGpu.current?.value || '',
				hdd: refHdd.current?.value || '',
				ssd: refSsd.current?.value || '',
				isExpansion: Number.parseInt(refRamIsExpand.current?.value || '0', 10),
				os: refOs.current?.value || '',
				osVersion: refOsVer.current?.value || '',
				ram: ram || '',
				ramSize: refRamSize.current?.value || '',
				type,
			};
			if (row) {
				param.pc = {
					...param.pc,
					pcNo: equipDtl.pc?.pcNo,
				};
			}
		} else if (eqType === 'monitor') {
			param.monitor = {
				inch: refInch.current?.value || '',
				resolution: refResolution.current?.value || '',
			};
			if (row) {
				param.monitor = {
					...param.monitor,
					moNo: equipDtl.monitor?.moNo,
				};
			}
		} else if (eqType === 'server') {
			param.server = {
				cpu: refCpu.current?.value || '',
				gpu: refGpu.current?.value || '',
				hdd: refHdd.current?.value || '',
				ssd: refSsd.current?.value || '',
				isExpansion: Number.parseInt(refRamIsExpand.current?.value || '0', 10),
				os: refOs.current?.value || '',
				osVersion: refOsVer.current?.value || '',
				ram: ram || '',
				ramSize: refRamSize.current?.value || '',
				ip: refIp.current?.value || '',
				vmList: [],
			};
		}

		if (row) {
			param.equipment = {
				...param.equipment,
				equipmentNo: equipDtl.equipment.equipmentNo,
			};
			param.hardware = {
				...param.hardware,
				hwNo: equipDtl.hardware?.hwNo,
				profileNo: equipDtl.hardware?.profileNo,
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
		let type;
		if (title.type === 'notebook' || title.type === 'desktop') {
			type = 'pc';
		} else {
			type = title.type;
		}
		equipNoParam = {
			equipmentNo: row.equipmentNo,
			equipType: type,
		};
		refEquipType.current?.setAttribute('disabled', 'true');
	}

	const { isSuccess } = useQuery(['getEquipsDtl', equipNoParam?.equipmentNo], EquipService(equipNoParam).getEquipDetail);
	useEffect(() => {
		setCurTitle(curTitle);
		if (refEquipType.current) {
			setEqType(refEquipType.current.value);
		}
		if (eqType === 'pc' || eqType === 'notebook' || eqType === 'desktop' || eqType === 'server' || eqType === 'mobile') {
			setNdsm(true);
		} else {
			setNdsm(false);
		}
		if (eqType === 'pc' || eqType === 'notebook' || eqType === 'desktop' || eqType === 'server') {
			setNds(true);
		} else {
			setNds(false);
		}
		if (eqType === 'mobile' || eqType === 'monitor') {
			setMm(true);
		} else {
			setMm(false);
		}
		if (eqType === 'monitor') {
			setMonitor(true);
		} else {
			setMonitor(false);
		}
	}, [curTitle]);
	const onDeleteEquip = () => {
		const equipNo = equipDtl.equipment.equipmentNo;
		deleteEquip.mutate({ seqNo: equipNo });

		onEquipClose();
	};

	useEffect(() => {
		if (equipDtl.equipment && isSuccess && row && row.assetCode === equipDtl.equipment.assetCode) {
			if (equipDtl.hardware?.profileNo !== -700) {
				setUser(memberTags.filter((e) => e.profileNo === equipDtl.hardware?.profileNo)[0].value || ['']);
				refTags.current.tagify.addTags(memberTags.filter((e) => e.profileNo === equipDtl.hardware?.profileNo)[0].value || '');
			}
			setAssetCode(equipDtl.equipment.assetCode || '');
			setPrice(equipDtl.equipment.price || '');
			setModel(equipDtl.hardware?.modelName || '');
			setStatus(equipDtl.equipment.status || '');
			setSn(equipDtl.hardware?.serialNo || '');
			setVendor(equipDtl.hardware?.brandName || '');
			setNote(equipDtl.equipment.note || '');
			setCreateTime(equipDtl.equipment.createDate || '');
			setUpdateTime(equipDtl.equipment.modifyDate || '');
			if (eqType === 'notebook' || eqType === 'desktop' || eqType === 'pc') {
				setOs(equipDtl.pc?.os || '');
				setOsVer(equipDtl.pc?.osVersion || '');
				setRamType(equipDtl.pc?.ram?.slice(0, 4) || '');
				setRamHz(equipDtl.pc?.ram.slice(-4) || '');
				setRamIsExpand(equipDtl.pc?.isExpansion || 0);
				setRamSize(equipDtl.pc?.ramSize || '');
				setCpu(equipDtl.pc?.cpu || '');
				setGpu(equipDtl.pc?.gpu || '');
				setHdd(equipDtl.pc?.hdd || '');
				setSsd(equipDtl.pc?.ssd || '');
			}
			if (eqType === 'mobile') {
				setOs(equipDtl.mobile?.os || '');
				setOsVer(equipDtl.mobile?.osVersion || '');
				setRamSize(equipDtl.mobile?.ramSize || '');
				setInch(equipDtl.mobile?.inch || '');
				setHdd(equipDtl.mobile?.volume || '');
			}
			if (eqType === 'monitor') {
				setInch(equipDtl.monitor?.inch || '');
				setResolution(equipDtl.monitor?.resolution || '');
			}
			refTags.current.tagify.loading(false);
		}
	}, [isSuccess, equipDtl]);
	return (
		<AlertDialogContent className="min-w-[60vw] ">
			<AlertDialogHeader>
				<div className="flex justify-between">
					<p>물자 등록</p>
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
									id="eqAssetCode"
									readOnly={!isEditable}
									ref={refAssetCode}
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
									id="eqPrice"
									readOnly={!isEditable}
									ref={refPrice}
									disabled={false}
									defaultValue={price || ''}
									className="ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>
						<div className="flex mt-2 mb-2 start justify-start">
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">모델명 :</p>
							</div>
							<div className="">
								<input
									type="text"
									id="eqModel"
									readOnly={!isEditable}
									ref={refModel}
									disabled={false}
									defaultValue={model || ''}
									className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>
						<div className={`${nds ? '' : 'hidden invisible h-0 w-0'}  flex mt-2 mb-2 start justify-start`}>
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">상태 :</p>
							</div>
							<div className="">
								<Select
									id="eqStatus"
									className="ml-2 !max-w-[100px] flex justify"
									ref={refStatus}
									value={status}
									disabled={!isEditable}
									onChange={(e) => {
										setStatus(e.target.value);
									}}
								>
									<option value="사용중">사용중</option>
									<option value="유휴">유휴</option>
									<option value="불량">불량</option>
									<option value="폐기">폐기</option>
								</Select>
							</div>
						</div>
						<div className="flex mt-2 mb-2 start justify-start">
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">S/N :</p>
							</div>
							<div className="">
								<input
									type="text"
									id="eqSn"
									readOnly={!isEditable}
									defaultValue={sn || ''}
									disabled={false}
									ref={refSn}
									className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>
						<div className="flex mt-2 mb-2 start justify-start">
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">제조사 :</p>
							</div>
							<div className="">
								<input
									type="text"
									id="eqVendor"
									readOnly={!isEditable}
									disabled={false}
									defaultValue={vendor || ''}
									ref={refVendor}
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
									id="eqCreateTime"
									disabled={false}
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
									id="eqUpdateTime"
									disabled={false}
									defaultValue={updateTime || ''}
									ref={refUpdateTime}
									className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>

						<div className={`${isEditable ? '' : 'hidden invisible h-0 w-0'}flex mt-2 mb-2 justify-star h-[5vh]`}>
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">소지자 :</p>
							</div>
							<div className="self-center !border !border-navy-800 w-[15vw] h-[5vh]">
								<Tags className="customLook mt-1" initialValue={isSuccess ? user : ['']} ref={refTags} settings={settings} />
							</div>
						</div>
						<div className={`${isEditable ? 'hidden invisible h-0 w-0' : ''}flex mt-2 mb-2 justify-star h-[5vh]`}>
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">소지자 :</p>
							</div>
							<div className="self-center border-b border-gray-700 w-[15vw] h-[5vh]">
								<p className="mt-1">{isSuccess ? user : ''}</p>
							</div>
						</div>
						<div className="flex mt-2 mb-2 justify-star h-[15vh]">
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">비고 :</p>
							</div>
							<div className="w-[22vw] h-[15vh]">
								<Textarea
									id="eqNote"
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
						<div className={`${ndsm ? '' : 'hidden invisible h-0 w-0'}  flex mt-2 mb-2 start justify-start`}>
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">OS :</p>
							</div>
							<div className="flex items-start">
								<Select
									id="eqOs"
									className="!max-w-[130px]"
									ref={refOs}
									value={os}
									disabled={!isEditable}
									onChange={(e) => {
										setOs(e.target.value);
									}}
								>
									<option value="LINUX">LINUX</option>
									<option value="Window">Window</option>
									<option value="Android">Android</option>
									<option value="IOS">iOS</option>
								</Select>
								<input
									type="text"
									id="eqOsVer"
									readOnly={!isEditable}
									ref={refOsVer}
									defaultValue={osVer || ''}
									disabled={false}
									placeholder="OS Version"
									className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>
						<div className={`${ndsm ? '' : 'hidden invisible h-0 w-0'}  flex mt-2 mb-2 start justify-start`}>
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">HDD/SSD :</p>
							</div>
							<div className="flex items-start">
								<input
									type="text"
									id="eqHdd"
									readOnly={!isEditable}
									defaultValue={hdd}
									ref={refHdd}
									disabled={false}
									placeholder="ex) 512GB/1TB"
									className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
								<input
									type="text"
									id="eqSsd"
									readOnly={!isEditable}
									disabled={eqType === 'mobile'}
									ref={refSsd}
									defaultValue={ssd}
									placeholder={`${eqType === 'mobile' ? 'none' : 'ex) 512GB/1TB'}`}
									className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>
						{/* right */}
						<div className={`${nds ? '' : 'hidden invisible h-0 w-0'}  flex mt-2 mb-2 start justify-start`}>
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">RAM :</p>
							</div>
							<div className="flex items-start">
								<Select
									id="eqRamType"
									className="!max-w-[120px]"
									ref={refRamType}
									disabled={!isEditable}
									value={ramType}
									onChange={(e) => {
										setRamType(e.target.value);
									}}
								>
									{Object.entries(RamType).map((e, idx) => {
										return (
											// eslint-disable-next-line react/no-array-index-key
											<option key={idx} value={e[0]}>
												{e[0]}
											</option>
										);
									})}
									{/* <option value={RamType.DDR3}>{RamType.DDR3}</option>
									<option value={RamType.DDR4}>{RamType.DDR4}</option>
									<option value={RamType.DDR5}>{RamType.DDR5}</option> */}
								</Select>
								<p className="text-base items-center flex font-bold text-navy-700 ml-5 mr-5 mt-1"> - </p>
								<Select
									id="eqRamHz"
									className="!max-w-[120px]"
									ref={refRamHz}
									disabled={!isEditable}
									value={ramHz}
									onChange={(e) => {
										setRamHz(e.target.value);
									}}
								>
									{ramType === 'DDR3' &&
										Object.entries(DDR3Hz).map((e, idx) => {
											return (
												// eslint-disable-next-line react/no-array-index-key
												<option key={idx} value={e[1]}>
													{e[1]}
												</option>
											);
										})}
									{ramType === 'DDR4' &&
										Object.entries(DDR4Hz).map((e, idx) => {
											return (
												// eslint-disable-next-line react/no-array-index-key
												<option key={idx} value={e[1]}>
													{e[1]}
												</option>
											);
										})}
									{ramType === 'DDR5' &&
										Object.entries(DDR5Hz).map((e, idx) => {
											return (
												// eslint-disable-next-line react/no-array-index-key
												<option key={idx} value={e[1]}>
													{e[1]}
												</option>
											);
										})}
								</Select>
							</div>
						</div>
						<div className={`${ndsm ? '' : 'hidden invisible h-0 w-0'}  flex mt-2 mb-2 start justify-start`}>
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">RAM 용량 :</p>
							</div>
							<div className="flex items-start">
								<input
									type="text"
									ref={refRamSize}
									id="eqRamSize"
									defaultValue={ramSize}
									disabled={false}
									placeholder="16GB"
									className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>
						<div className={`${nds ? '' : 'hidden invisible h-0 w-0'}  flex mt-2 mb-2 start justify-start`}>
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">RAM 확장가능 여부 :</p>
							</div>
							<div className={`${nds ? '' : ''}`}>
								<Select id="eqIsExpand" className="ml-5 !max-w-[100px]" defaultValue={ramIsExpand} ref={refRamIsExpand} disabled={!isEditable}>
									<option value="1">예</option>
									<option value="0">아니오</option>
								</Select>
							</div>
						</div>
						<div className={`${nds ? '' : 'hidden invisible h-0 w-0'}  flex mt-2 mb-2 start justify-start`}>
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">CPU :</p>
							</div>
							<div className="">
								<input
									ref={refCpu}
									type="text"
									id="eqCpu"
									readOnly={!isEditable}
									defaultValue={cpu}
									placeholder="ex) AMD Ryzen 7 5700U with Radeon"
									disabled={false}
									className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>
						<div className={`${nds ? '' : 'hidden invisible h-0 w-0'}  flex mt-2 mb-2 start justify-start`}>
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">GPU :</p>
							</div>
							<div className="">
								<input
									ref={refGpu}
									type="text"
									id="eqGpu"
									readOnly={!isEditable}
									defaultValue={gpu}
									placeholder="ex) AMD Radeon(TM) Graphics"
									disabled={false}
									className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>
						<div className={`${eqType === 'server' ? '' : 'hidden invisible h-0 w-0'}  flex mt-2 mb-2 start justify-start`}>
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">IP :</p>
							</div>
							<div className="">
								<input
									type="text"
									readOnly={!isEditable}
									ref={refIp}
									defaultValue=""
									placeholder="ex) 192.168.0.1"
									disabled={false}
									className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>
						<div className={`${mm ? '' : 'hidden invisible h-0 w-0'} max-h-[50px] flex mt-2 mb-2 start justify-start`}>
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">크기(inch) :</p>
							</div>
							<div className="self-start">
								<input
									ref={refInch}
									type="text"
									id="eqInch"
									readOnly={!isEditable}
									defaultValue={inch}
									disabled={false}
									placeholder="24"
									className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>
						<div className={`${monitor ? '' : 'hidden invisible h-0 w-0'}  max-h-[50px] flex mt-2 mb-2 start justify-start`}>
							<div className="flex items-start">
								<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">해상도 :</p>
							</div>
							<div className="self-start">
								<input
									ref={refResolution}
									type="text"
									id="eqResolution"
									readOnly={!isEditable}
									disabled={false}
									placeholder="24"
									defaultValue={resolution}
									className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
								/>
							</div>
						</div>
					</div>
				</div>
			</AlertDialogBody>
			<div className="h-px w-full bg-gray-300 dark:bg-white/20 " />
			<AlertDialogFooter>
				<Select
					id="eqType"
					disabled={!isEditable}
					className="!min-w-[120px]"
					ref={refEquipType}
					defaultValue={eqType}
					onChange={(e) => {
						setCurTitle(e.target[e.target.selectedIndex].label);
						setEqType(e.target.value);
					}}
				>
					{Object.entries(EquipType).map((e, idx) => {
						console.log(e);
						return (
							// eslint-disable-next-line react/no-array-index-key
							<option key={idx} value={e[0]}>
								{e[1]}
							</option>
						);
					})}
					{/* <option value="notebook">노트북</option>
					<option value="desktop">데스크탑</option>
					<option value="monitor">모니터</option>
					<option value="server">서버장비</option>
					<option value="mobile">모바일</option>
					<option value="etc">기타장비</option> */}
				</Select>
				<Button
					colorScheme="blue"
					className="mr-3 ml-3"
					onClick={() => {
						onAddEquip();
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
