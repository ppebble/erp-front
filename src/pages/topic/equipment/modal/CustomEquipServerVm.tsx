import {
	AlertDialogContent,
	AlertDialogHeader,
	Button,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogFooter,
	useDisclosure,
	Select,
	Switch,
	TabList,
	Tab,
	TabPanel,
	TabPanels,
	Tabs,
	Textarea,
} from '@chakra-ui/react';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import Tags from '@yaireo/tagify/dist/react.tagify';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, PaginationState, useReactTable } from '@tanstack/react-table';
import { BsPlusCircle } from 'react-icons/bs';
import EquipService from '../../../../services/equipService';
import { useEquipAction, useEquipDetail } from '../../../../store/useEquip';

import { useMemberTags } from '../../../../store/useCalendar';
import CalendarService from '../../../../services/calendarService';
import Card from '../../../../components/card';
import CustomPagingViewTable from '../../../../components/table/CustomPagingViewTable';
import { AddEquipParam } from './CustomEquipAddModal';
import DebouncedInput from '../../../../components/table/CustomTableFilterComponent';
import CustomEquipPagingTable from '../components/CustomEquipPagingTable';
import useModal from '../../../../store/useModal';
import { DDR3Hz, DDR4Hz, DDR5Hz, RamType } from '../../../../store/common/useCommon';

export type VmInfo = {
	vmNo?: number | undefined;
	serverNo: number;
	ip: string;
	os: string;
	osVersion: string;
	name: string;
	vmId: string;
	vmPw: string;
	vmNote: string;
};

export const CustomEquipServerVm = ({ title, columns }: any) => {
	const createEquip = EquipService().createEquipMutation;
	const modifyEquip = EquipService().updateEquipMutation;
	const deleteEquip = EquipService().deleteEquipMutation;
	const deleteVm = EquipService().deleteVmMutation;

	const createVm = EquipService().createVmMutation;
	const updateVm = EquipService().updateVmMutation;

	const [eqType, setEqType] = useState<string>('server');
	const [isEditable, setIsEditable] = useState<boolean>(false);

	const refAssetCode = useRef<HTMLInputElement>(null);
	const refPrice = useRef<HTMLInputElement>(null);
	const refModel = useRef<HTMLInputElement>(null);
	const refStatus = useRef<HTMLSelectElement>(null);
	const refSn = useRef<HTMLInputElement>(null);
	const refVendor = useRef<HTMLInputElement>(null);
	const refIp = useRef<HTMLInputElement>(null);
	const refNote = useRef<HTMLTextAreaElement>(null);
	const refOs = useRef<HTMLSelectElement>(null);
	const refOsVer = useRef<HTMLInputElement>(null);
	const refHdd = useRef<HTMLInputElement>(null);
	const refSsd = useRef<HTMLInputElement>(null);
	const refRamType = useRef<HTMLSelectElement>(null);
	const refRamHz = useRef<HTMLSelectElement>(null);
	const refUser = useRef<HTMLParagraphElement>(null);
	const refRamSize = useRef<HTMLInputElement>(null);
	const refRamIsExpand = useRef<HTMLSelectElement>(null);
	const refCpu = useRef<HTMLInputElement>(null);
	const refGpu = useRef<HTMLInputElement>(null);
	const refCreateTime = useRef<HTMLInputElement>(null);
	const refEditableSwitch = useRef<any>(null);
	const refUpdateTime = useRef<HTMLInputElement>(null);
	const equipDtl = useEquipDetail();

	const refVmName = useRef<HTMLInputElement>(null);
	const refVmId = useRef<HTMLInputElement>(null);
	const refVmPw = useRef<HTMLInputElement>(null);
	const refVmOs = useRef<HTMLSelectElement>(null);
	const refVmOsVer = useRef<HTMLInputElement>(null);
	const refVmIp = useRef<HTMLInputElement>(null);
	const refVmNote = useRef<HTMLTextAreaElement>(null);

	const memberTags = useMemberTags();

	const refTags = useRef<any>();

	useQuery(['getMembers'], CalendarService().availableProfile);

	const [assetCode, setAssetCode] = useState<string>('');
	const [model, setModel] = useState<string>('');
	const [sn, setSn] = useState<string>('');
	const [vendor, setVendor] = useState<string>('');
	const [user, setUser] = useState<any>(['']);
	const [price, setPrice] = useState<string>('');
	const [note, setNote] = useState<string>('');
	const [os, setOs] = useState<string>('');
	const [osVer, setOsVer] = useState<string>('');
	const [ramType, setRamType] = useState<string>('');
	const [ramHz, setRamHz] = useState<string>('');
	const [cpu, setCpu] = useState<string>('');
	const [gpu, setGpu] = useState<string>('');
	const [hdd, setHdd] = useState<string>('');
	const [ssd, setSsd] = useState<string>('');
	const [createTime, setCreateTime] = useState<string>('');
	const [updateTime, setUpdateTime] = useState<string>('');
	const [status, setStatus] = useState<string>('');
	const [ramSize, setRamSize] = useState<string>('');
	const [ip, setIp] = useState<string>('');
	const [ramIsExpand, setRamIsExpand] = useState<number>(0);
	const [vmList, setVmList] = useState<VmInfo[]>([]);
	const [vmInfo, setVmInfo] = useState<VmInfo>({} as VmInfo);

	const [vmId, setVmId] = useState<string>('');
	const [vmPw, setVmPw] = useState<string>('');
	const [vmOsVer, setVmOsVer] = useState<string>('');
	const [vmOs, setVmOs] = useState<string>('');
	const [vmName, setVmName] = useState<string>('');
	const [vmNote, setVmNote] = useState<string>('');
	const [vmIp, setVmIp] = useState<string>('');

	const [tab, setTab] = useState<number>(0);
	const [vmEdit, setVmEdit] = useState<boolean>(false);

	const { openModal, closeModal } = useModal();

	useEffect(() => {
		if (vmInfo) {
			setVmId(vmInfo.vmId);
			setVmPw(vmInfo.vmPw);
			setVmOsVer(vmInfo.osVersion);
			setVmOs(vmInfo.os);
			setVmName(vmInfo.name);
			setVmNote(vmInfo.vmNote);
			setVmIp(vmInfo.ip);
		}
	}, [vmInfo]);

	const handleChange = (e: any) => {
		if (e.type === 'add') {
			if (memberTags) {
				setUser(e.detail.tagify.value[0].value);
			}
		}
		if (e.type === 'remove') {
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
	const onVmInputClear = () => {
		if (refVmId.current) {
			refVmId.current.defaultValue = '';
			refVmId.current.value = '';
		}
		if (refVmPw.current) {
			refVmPw.current.defaultValue = '';
			refVmPw.current.value = '';
		}
		if (refVmName.current) {
			refVmName.current.defaultValue = '';
			refVmName.current.value = '';
		}
		if (refVmOsVer.current) {
			refVmOsVer.current.defaultValue = '';
			refVmOsVer.current.value = '';
		}
		if (refVmNote.current) {
			refVmNote.current.defaultValue = '';
			refVmNote.current.value = '';
		}
		if (refVmIp.current) {
			refVmIp.current.defaultValue = '';
			refVmIp.current.value = '';
		}
		setVmInfo({} as VmInfo);
	};
	const equipAction = useEquipAction();
	const onEquipClose = () => {
		equipAction.setEquip({} as AddEquipParam);
		setUser('');
		refTags.current.tagify.removeAllTags();
	};
	const onAddVm = () => {
		const vmParam = {} as VmInfo;
		if (!refVmId.current?.value) {
			openModal({ type: 3, closeOnOverlay: true, contents: 'VM ID 누락' });
			return;
		}
		if (!refVmPw.current?.value) {
			openModal({ type: 3, closeOnOverlay: true, contents: 'VM PW 누락' });
			return;
		}
		if (!refVmName.current?.value) {
			openModal({ type: 3, closeOnOverlay: true, contents: 'VM 명 누락' });
			return;
		}
		if (!refVmIp.current?.value) {
			openModal({ type: 3, closeOnOverlay: true, contents: 'VM IP 누락' });
			return;
		}
		vmParam.vmId = refVmId.current.value;
		vmParam.vmPw = refVmPw.current.value;
		vmParam.name = refVmName.current.value;
		vmParam.os = refVmOs.current?.value || '';
		vmParam.osVersion = refVmOsVer.current?.value || '';
		vmParam.vmNote = refVmNote.current?.value || '';
		vmParam.ip = refVmIp.current.value;
		if (!equipDtl.server?.serverNo) {
			openModal({ type: 3, closeOnOverlay: true, contents: 'Server No 정보가 없습니다.' });
		}
		vmParam.serverNo = equipDtl.server?.serverNo || 0;
		if (vmEdit) {
			vmParam.vmNo = vmInfo.vmNo;
			updateVm.mutate(vmParam);
		} else {
			createVm.mutate(vmParam);
		}
	};
	const onAddEquip = () => {
		const param = {} as AddEquipParam;
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

		param.equipType = eqType;
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

		if (eqType === 'server') {
			const ram = `${refRamType.current?.value}-${refRamHz.current?.value}`;
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
				vmList,
			};
			if (equipDtl) {
				param.server = {
					...param.server,
					serverNo: equipDtl.server?.serverNo,
				};
			}
		}

		if (equipDtl) {
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
		if (equipDtl) {
			modifyEquip.mutate(param);
		} else {
			createEquip.mutate(param);
		}
	};
	const onDeleteEquip = () => {
		const equipNo = equipDtl.equipment.equipmentNo;
		deleteEquip.mutate({ seqNo: equipNo });
		onEquipClose();
	};
	const onDeleteVm = () => {
		const { vmNo } = vmInfo;
		deleteVm.mutate({ seqNo: vmNo });
		onEquipClose();
	};

	useEffect(() => {
		setUser('');
		refTags.current.tagify.removeAllTags();
		if (equipDtl.equipment) {
			if (equipDtl.hardware?.profileNo !== -700) {
				setUser(memberTags.filter((e) => e.profileNo === equipDtl.hardware?.profileNo)[0].value || ['']);
				refTags.current.tagify.addTags(memberTags.filter((e) => e.profileNo === equipDtl.hardware?.profileNo)[0].value);
			} else {
				setUser('');
				refTags.current.tagify.removeAllTags();
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
			if (eqType === 'server') {
				setOs(equipDtl.server?.os || '');
				setOsVer(equipDtl.server?.osVersion || '');
				setRamType(equipDtl.server?.ram?.slice(0, 4) || '');
				setRamHz(equipDtl.server?.ram.slice(-4) || '');
				setRamIsExpand(equipDtl.server?.isExpansion || 0);
				setRamSize(equipDtl.server?.ramSize || '');
				setCpu(equipDtl.server?.cpu || '');
				setGpu(equipDtl.server?.gpu || '');
				setHdd(equipDtl.server?.hdd || '');
				setSsd(equipDtl.server?.ssd || '');
				setIp(equipDtl.server?.ip || '');
				setVmList(equipDtl.server?.vmList || []);
			}
		}
	}, [equipDtl]);
	const onClickVmRow = (row: any) => {
		if (row.vmNo !== vmInfo.vmNo) {
			setVmEdit(true);
			setVmInfo(row);
		}
	};
	return (
		<Card className="min-w-[60vw] ">
			<div>
				<Tabs
					onChange={(index) => {
						setTab(index);
					}}
				>
					<TabList>
						<Tab>Server</Tab>
						<Tab>VM</Tab>
						<div className="flex justify-end">
							<div className="flex mr-5 items-center">
								<p className="text-sm mr-3">수정 </p>
								<Switch
									ref={refEditableSwitch}
									defaultChecked={isEditable}
									onChange={() => {
										setIsEditable(!isEditable);
									}}
								/>
							</div>
						</div>
					</TabList>
					<TabPanels>
						<TabPanel>
							<div className="grid h-full grid-cols-2">
								<div className="grid col-span-1">
									<div className="flex mt-2 mb-2 start justify-start">
										<div className="flex items-start">
											<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">자산 코드 :</p>
										</div>
										<div className="">
											<input
												type="text"
												readOnly={!isEditable}
												ref={refAssetCode}
												disabled={false}
												value={assetCode || ''}
												onChange={(e) => {
													setAssetCode(e.target.value);
												}}
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
												readOnly={!isEditable}
												ref={refPrice}
												disabled={false}
												value={price || ''}
												onChange={(e) => {
													setPrice(e.target.value);
												}}
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
												readOnly={!isEditable}
												ref={refModel}
												disabled={false}
												value={model || ''}
												onChange={(e) => {
													setModel(e.target.value);
												}}
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
												readOnly={!isEditable}
												value={sn || ''}
												onChange={(e) => {
													setSn(e.target.value);
												}}
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
												readOnly={!isEditable}
												disabled={false}
												value={vendor || ''}
												onChange={(e) => {
													setVendor(e.target.value);
												}}
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
												disabled={false}
												value={createTime || ''}
												ref={refCreateTime}
												onChange={(e) => {
													setCreateTime(e.target.value);
												}}
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
												disabled={false}
												value={updateTime || ''}
												onChange={(e) => {
													setUpdateTime(e.target.value);
												}}
												ref={refUpdateTime}
												className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
											/>
										</div>
									</div>
									<div className={`${isEditable ? '' : 'hidden invisible h-0 w-0'}flex mt-2 mb-2 justify-star h-[5vh]`}>
										<div className="flex items-start">
											<p className="min-w-[3vw] flex items-center text-base font-bold text-navy-700 dark:text-white">소지자 :</p>
										</div>
										<div className="self-center !border !border-navy-800 w-[12vw] h-[5vh]">
											<Tags className="customLook mt-1" initialValue={equipDtl ? user : ['']} ref={refTags} settings={settings} />
										</div>
									</div>
									<div className={`${isEditable ? 'hidden invisible h-0 w-0' : ''}flex mt-2 mb-2 justify-star h-[5vh]`}>
										<div className="flex items-start">
											<p className="min-w-[4vw] flex items-center text-base font-bold text-navy-700dark:text-white">소지자 :</p>
										</div>
										<div className="self-center border-b border-gray-700 w-[10vw] h-[5vh]">
											<p className="mt-1" ref={refUser}>
												{equipDtl ? user : '-'}
											</p>
										</div>
									</div>
									<div className="flex mt-2 mb-2 justify-star h-[10vh]">
										<div className="flex items-start">
											<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">비고 :</p>
										</div>
										<div className="w-[12vw] h-[10vh]">
											<Textarea
												ref={refNote}
												readOnly={!isEditable}
												disabled={false}
												value={note || ''}
												onChange={(e) => {
													setNote(e.target.value);
												}}
												className="read-only ml-2 flex h-10 w-full h-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
											/>
										</div>
									</div>
								</div>

								<div className="grid col-span-1">
									<div className="flex mt-2 mb-2 start justify-start">
										<div className="flex items-start">
											<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">OS :</p>
										</div>
										<div className="flex items-start">
											<Select
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
												{/* <option value="Android">Android</option>
												<option value="IOS">iOS</option> */}
											</Select>
											<input
												type="text"
												readOnly={!isEditable}
												ref={refOsVer}
												value={osVer || ''}
												onChange={(e) => {
													setOsVer(e.target.value);
												}}
												disabled={false}
												placeholder="OS Version"
												className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
											/>
										</div>
									</div>
									<div className="flex mt-2 mb-2 start justify-start">
										<div className="flex items-start">
											<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">HDD/SSD :</p>
										</div>
										<div className="flex items-start">
											<input
												type="text"
												readOnly={!isEditable}
												value={hdd}
												onChange={(e) => {
													setHdd(e.target.value);
												}}
												ref={refHdd}
												disabled={false}
												placeholder="ex) 512GB/1TB"
												className="read-only ml-2 flex h-10 w-[6vw] items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
											/>
											<input
												type="text"
												readOnly={!isEditable}
												disabled={eqType === 'mobile'}
												ref={refSsd}
												onChange={(e) => {
													setSsd(e.target.value);
												}}
												value={ssd}
												placeholder="ex) 512GB/1TB"
												className="read-only ml-2 flex h-10 w-[6vw] items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
											/>
										</div>
									</div>
									<div className="flex mt-2 mb-2 start justify-start">
										<div className="flex items-start">
											<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">RAM :</p>
										</div>
										<div className="flex items-start">
											<Select
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
									<div className="flex mt-2 mb-2 start justify-start">
										<div className="flex items-start">
											<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">RAM 용량 :</p>
										</div>
										<div className="flex items-start">
											<input
												type="text"
												ref={refRamSize}
												value={ramSize}
												onChange={(e) => {
													setRamSize(e.target.value);
												}}
												disabled={false}
												placeholder="16GB"
												className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
											/>
										</div>
									</div>
									<div className="flex mt-2 mb-2 start justify-start">
										<div className="flex items-start">
											<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">RAM 확장가능 여부 :</p>
										</div>
										<div className="">
											<Select
												className="ml-5 !max-w-[100px]"
												value={ramIsExpand.toString()}
												ref={refRamIsExpand}
												disabled={!isEditable}
												onChange={(e) => {
													setRamIsExpand(Number.parseInt(e.target.value, 10));
												}}
											>
												<option value="1">예</option>
												<option value="0">아니오</option>
											</Select>
										</div>
									</div>
									<div className="flex mt-2 mb-2 start justify-start">
										<div className="flex items-start">
											<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">CPU :</p>
										</div>
										<div className="">
											<input
												ref={refCpu}
												type="text"
												readOnly={!isEditable}
												value={cpu}
												onChange={(e) => {
													setCpu(e.target.value);
												}}
												placeholder="ex) AMD Ryzen 7 5700U with Radeon"
												disabled={false}
												className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
											/>
										</div>
									</div>
									<div className="flex mt-2 mb-2 start justify-start">
										<div className="flex items-start">
											<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">GPU :</p>
										</div>
										<div className="">
											<input
												ref={refGpu}
												type="text"
												readOnly={!isEditable}
												value={gpu}
												onChange={(e) => {
													setGpu(e.target.value);
												}}
												placeholder="ex) AMD Radeon(TM) Graphics"
												disabled={false}
												className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
											/>
										</div>
									</div>
									<div className="flex mt-2 mb-2 start justify-start">
										<div className="flex items-start">
											<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">IP :</p>
										</div>
										<div className="">
											<input
												type="text"
												readOnly={!isEditable}
												ref={refIp}
												value={ip}
												onChange={(e) => {
													setIp(e.target.value);
												}}
												placeholder="ex) 192.168.0.1"
												disabled={false}
												className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
											/>
										</div>
									</div>
								</div>
							</div>
						</TabPanel>
						<TabPanel>
							{/* VM */}
							<div className="grid h-full grid-cols-2">
								<div className="grid col-span-1 mr-2">
									<CustomEquipPagingTable tableData={vmList} columns={columns} onClick={onClickVmRow} />
								</div>
								<Card>
									<div className="grid col-span-1 ml-4 mt-2">
										<div className="flex mt-2 mb-2 start justify-start">
											<div className="flex items-start">
												<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">VM 명 :</p>
											</div>
											<div className="flex items-start">
												<input
													type="text"
													readOnly={!isEditable}
													ref={refVmName}
													// defaultValue={vmName || ''}
													value={vmName || ''}
													onChange={(e) => {
														setVmName(e.target.value);
													}}
													disabled={false}
													placeholder="VM 명"
													className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
												/>
											</div>
										</div>
										<div className="flex mt-2 mb-2 start justify-start">
											<div className="flex items-start">
												<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">VM ID / PW :</p>
											</div>
											<div className="flex items-start">
												<input
													type="text"
													readOnly={!isEditable}
													// defaultValue={vmId}
													value={vmId || ''}
													onChange={(e) => {
														setVmId(e.target.value);
													}}
													ref={refVmId}
													disabled={false}
													placeholder="ID"
													className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
												/>
												<input
													type="text"
													readOnly={!isEditable}
													ref={refVmPw}
													value={vmPw || ''}
													onChange={(e) => {
														setVmPw(e.target.value);
													}}
													placeholder="VM PW"
													className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
												/>
											</div>
										</div>
										<div className="flex mt-2 mb-2 start justify-start">
											<div className="flex items-start">
												<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">VM OS :</p>
											</div>
											<div className="flex items-start">
												<Select
													className="!max-w-[130px]"
													ref={refVmOs}
													value={vmOs || ''}
													disabled={!isEditable}
													onChange={(e) => {
														setVmOs(e.target.value);
													}}
												>
													<option value="LINUX">LINUX</option>
													<option value="Window">Window</option>
												</Select>
												<input
													type="text"
													readOnly={!isEditable}
													ref={refVmOsVer}
													value={vmOsVer || ''}
													onChange={(e) => {
														setVmOsVer(e.target.value);
													}}
													disabled={false}
													placeholder="VM OS Version"
													className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
												/>
											</div>
										</div>
										<div className="flex mt-2 mb-2 start justify-start">
											<div className="flex items-start">
												<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">VM 비고 :</p>
											</div>
											<div className="flex items-start">
												<Textarea
													readOnly={!isEditable}
													disabled={false}
													value={vmNote || ''}
													onChange={(e) => {
														setVmNote(e.target.value);
													}}
													ref={refVmNote}
													placeholder="VM 비고"
													className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
												/>
											</div>
										</div>
										<div className="flex mt-2 mb-2 start justify-start">
											<div className="flex items-start">
												<p className="min-w-[5vw] flex items-center text-base font-bold text-navy-700 dark:text-white">VM IP :</p>
											</div>
											<div className="flex items-start">
												<input
													type="text"
													ref={refVmIp}
													value={vmIp || ''}
													onChange={(e) => {
														setVmIp(e.target.value);
													}}
													disabled={false}
													readOnly={!isEditable}
													placeholder="192.168.0.1"
													className="read-only ml-2 flex h-10 w-full items-center border bg-white/0 p-1 border-b-gray-500 border-white/10 text-sm outline-none"
												/>
											</div>
										</div>
									</div>
									<button
										onClick={() => {
											setVmEdit(false);
											onVmInputClear();
										}}
										className="max-w-[5vw] self-center rounded-md bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
									>
										<BsPlusCircle className="h-6 w-6 bold" />
									</button>
								</Card>
							</div>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</div>
			<div className="flex justify-between">
				<div className={`pt-2 ${tab === 0 ? '' : 'hidden'}`}>
					<Button
						colorScheme="blue"
						className="mr-3 ml-3"
						onClick={() => {
							onAddEquip();
						}}
					>
						서버 수정
					</Button>
					<Button
						colorScheme="red"
						onClick={() => {
							onDeleteEquip();
						}}
					>
						삭제
					</Button>
				</div>
				<div className={`pt-2 ${tab === 1 ? '' : 'hidden'}`}>
					<Button
						colorScheme="blue"
						className="mr-3 ml-3"
						onClick={() => {
							onAddVm();
						}}
					>
						{vmEdit ? 'VM 수정' : 'VM 추가'}
					</Button>
					<Button
						colorScheme="red"
						onClick={() => {
							onDeleteVm();
						}}
					>
						VM 삭제
					</Button>
				</div>
			</div>
		</Card>
	);
};
