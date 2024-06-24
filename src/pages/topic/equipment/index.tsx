import { useEffect, useMemo, useState } from 'react';
import { Card } from '@chakra-ui/react';
import { MdGrid3X3, MdLaptopChromebook } from 'react-icons/md';
import { FaBook, FaMobileAlt, FaServer } from 'react-icons/fa';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { FiMonitor } from 'react-icons/fi';
import { createColumnHelper } from '@tanstack/react-table';

import { BsPlusCircle } from 'react-icons/bs';
import { useQuery } from 'react-query';
import CustomClickableOneLineWidget from '../../../components/widget/CustomOneLineWidget';
import useModal from '../../../store/useModal';
import EquipService from '../../../services/equipService';
import useEquip, { useEquipAction } from '../../../store/useEquip';
import CustomEquipPagingTable from './components/CustomEquipPagingTable';
import CustomServerEquipComponent from './components/CustomServerEquipComponent';
import ColumnsTable from '../../../components/columnsTable';
import { useScroll } from '../../../store/useScroll';

type EquipTitleProp = {
	type: string;
	name: string;
};

const Equipment = () => {
	const [title, setTitle] = useState<EquipTitleProp>({ type: 'notebook', name: '노트북' });
	const allList = useEquip().allEquipList;
	const [data, setData] = useState<any[]>([]);
	// useEffect(() => {}, [data]);
	const columnHelper = createColumnHelper<any>();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const equipAction = useEquipAction();
	const [table, setTable] = useState();
	const { openModal } = useModal();
	const { divHeight } = useScroll();
	const [height, setHeight] = useState(divHeight);
	const { isSuccess, data: result } = useQuery(['getEquips'], EquipService().getEquipList);

	const columns = [
		columnHelper.accessor('equipmentName', {
			id: 'equipmentName',
			header: title.type === 'book' ? '도서 명' : '장비 모델 명',
			enableColumnFilter: true,
			enableGlobalFilter: true,
			filterFn: 'includesString',
		}),
		// columnHelper.accessor('equipmentNo', {
		// 	id: 'equipmentNo',
		// 	header: title.type === 'book' ? '도서 번호' : '장비 번호',
		// 	filterFn: 'includesString',
		// 	enableGlobalFilter: true,
		// }),
		columnHelper.accessor('user', {
			id: 'user',
			header: '사용자',
			filterFn: 'includesString',
			enableGlobalFilter: true,
		}),
		columnHelper.accessor('assetCode', {
			id: 'assetCode',
			header: '자산코드',
			filterFn: 'includesString',
			enableGlobalFilter: true,
		}),

		columnHelper.accessor('status', {
			id: 'status',
			header: '상태',
			enableColumnFilter: true,
			enableGlobalFilter: true,
			filterFn: 'includesString',
		}),
		columnHelper.accessor('createDate', {
			id: 'createDate',
			header: '등록날짜',
		}),
	];

	const serverColumns = [
		columnHelper.accessor('equipmentName', {
			id: 'equipmentName',
			header: title.type === 'book' ? '도서 명' : '장비 모델 명',
			enableColumnFilter: true,
			enableGlobalFilter: true,
			filterFn: 'includesString',
		}),
		// columnHelper.accessor('equipmentNo', {
		// 	id: 'equipmentNo',
		// 	header: title.type === 'book' ? '도서 번호' : '장비 번호',

		// 	filterFn: 'includesString',
		// 	enableGlobalFilter: true,
		// }),
		columnHelper.accessor('user', {
			id: 'user',
			header: '사용자',
			filterFn: 'includesString',
			enableGlobalFilter: true,
		}),
		columnHelper.accessor('assetCode', {
			id: 'assetCode',
			header: '자산코드',
			filterFn: 'includesString',
			enableGlobalFilter: true,
		}),

		columnHelper.accessor('status', {
			id: 'status',
			header: '상태',
			enableColumnFilter: true,
			enableGlobalFilter: true,
			filterFn: 'includesString',
		}),
	];

	const vmColumns = [
		columnHelper.accessor('ip', {
			id: 'vmIp',
			header: 'VM IP',
			filterFn: 'includesString',
			enableGlobalFilter: true,
		}),
		columnHelper.accessor('name', {
			id: 'name',
			header: 'VM 명',
			filterFn: 'includesString',
			enableGlobalFilter: true,
		}),
		columnHelper.accessor('vmId', {
			id: 'vmId',
			header: 'VM ID',
			enableColumnFilter: true,
			enableGlobalFilter: true,
			filterFn: 'includesString',
		}),
	];

	const OpenDetail = (row: any) => {
		if (row) {
			if (title.type === 'book') {
				openModal({ type: 8, closeOnOverlay: false, contents: { title, row, setOpen: setIsOpen } });
			} else {
				openModal({ type: 7, closeOnOverlay: false, contents: { title, row, setOpen: setIsOpen } });
			}
			setIsOpen(true);
		}
	};

	useEffect(() => {
		setData(allList.notebook);
	}, [isSuccess]);

	useEffect(() => {
		setHeight(divHeight);
	}, [divHeight]);

	useEffect(() => {
		// 추가, 수정, 삭제 처리 후 테이블 리패칭
		if (isSuccess && !isOpen) {
			if (title.type === 'notebook') {
				setData(allList.notebook);
			}
			if (title.type === 'desktop') {
				setData(allList.desktop);
			}
			if (title.type === 'monitor') {
				setData(allList.monitor);
			}
			if (title.type === 'server') {
				setData(allList.server);
			}
			if (title.type === 'mobile') {
				setData(allList.mobile);
			}
			if (title.type === 'book') {
				setData(allList.book);
			}
			if (title.type === 'etc') {
				setData(allList.etc);
			}
		}
	}, [result]);

	useEffect(() => {
		setData(allList.notebook);
	}, []);

	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<div className="overflow-auto flex min-h-[950px] min-w-[1000px]" style={{ height: `${height}` }}>
			<div className="mt-3 mr-5 min-w-[200px]">
				<CustomClickableOneLineWidget
					icon={<MdLaptopChromebook className="h-7 w-7" />}
					title="노트북"
					onClickHandler={() => {
						setTitle({ type: 'notebook', name: '노트북' });
						setData(allList.notebook);
						equipAction.setEquipClear();
					}}
					selectedTitle={title.name}
				/>
				<CustomClickableOneLineWidget
					icon={<HiOutlineDesktopComputer className="h-6 w-6" />}
					onClickHandler={() => {
						setData(allList.desktop);
						setTitle({ type: 'desktop', name: '데스크탑' });
						equipAction.setEquipClear();
					}}
					title="데스크탑"
					selectedTitle={title.name}
				/>
				<CustomClickableOneLineWidget
					icon={<FiMonitor className="h-7 w-7" />}
					title="모니터"
					onClickHandler={() => {
						setTitle({ type: 'monitor', name: '모니터' });
						setData(allList.monitor);
						equipAction.setEquipClear();
					}}
					selectedTitle={title.name}
				/>
				<CustomClickableOneLineWidget
					icon={<FaServer className="h-6 w-6" />}
					title="서버장비"
					onClickHandler={() => {
						setData(allList.server);
						setTitle({ type: 'server', name: '서버장비' });
						equipAction.setEquipClear();
					}}
					selectedTitle={title.name}
				/>
				<CustomClickableOneLineWidget
					icon={<FaMobileAlt className="h-7 w-7" />}
					title="모바일"
					onClickHandler={() => {
						setData(allList.mobile);
						setTitle({ type: 'mobile', name: '모바일' });
						equipAction.setEquipClear();
					}}
					selectedTitle={title.name}
				/>
				<CustomClickableOneLineWidget
					icon={<FaBook className="h-6 w-6" />}
					title="도서"
					onClickHandler={() => {
						setData(allList.book);
						setTitle({ type: 'book', name: '도서' });
						equipAction.setEquipClear();
					}}
					selectedTitle={title.name}
				/>
				<CustomClickableOneLineWidget
					icon={<MdGrid3X3 className="h-6 w-6" />}
					title="기타 장비"
					onClickHandler={() => {
						setData(allList.etc);
						setTitle({ type: 'etc', name: '기타 장비' });
						equipAction.setEquipClear();
					}}
					selectedTitle={title.name}
				/>
			</div>

			<div className="w-full">
				<Card className="!p-3 max-h-[10vh]">
					<div className="flex justify-between items-center">
						<h4 className="text-2xl font-bold text-navy-700 dark:text-white">{title.name}</h4>
						<button
							onClick={() => {
								if (title.type === 'book') {
									openModal({ type: 8, closeOnOverlay: false, contents: { title, setOpen: setIsOpen } });
									setIsOpen(true);
								} else {
									openModal({ type: 7, closeOnOverlay: false, contents: { title, setOpen: setIsOpen } });
									setIsOpen(true);
								}
							}}
							className="dark:active-bg-white-20 linear col-span-2 rounded-md bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
						>
							<BsPlusCircle className="h-6 w-6 bold" />
						</button>
					</div>
				</Card>
				{data && (
					<>
						<div className={`${title.type === 'server' ? 'hidden' : ''}`}>
							<CustomEquipPagingTable tableData={data} columns={columns} onClick={OpenDetail} />
							{/* <Card>
								<ColumnsTable columns={columns} list={data} show={10} columnsType="table" isClick isSearch={false} />
							</Card> */}
						</div>
						<div className={`${title.type !== 'server' ? 'hidden' : ''}`}>
							<CustomServerEquipComponent tableData={data} vmColumns={vmColumns} columns={serverColumns} />
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Equipment;
