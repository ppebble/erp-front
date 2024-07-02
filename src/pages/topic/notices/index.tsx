import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { MdLaptopChromebook } from 'react-icons/md';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { BsPlusCircle } from 'react-icons/bs';
import { Button, Card } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import CustomClickableOneLineWidget from '../../../components/widget/CustomOneLineWidget';
import { useScroll } from '../../../store/useScroll';
import ColumnsTable from '../../../components/columnsTable';
import useBoard from '../../../store/useBoard';
import BoardService from '../../../services/boardService';
import useModal from '../../../store/useModal';

const Notices = () => {
	const { isSuccess, refetch } = useQuery('boardList', BoardService().boardList);
	const insert = BoardService().insertBoard;
	const navigate = useNavigate();
	const { openModal } = useModal();
	const columnHelper = createColumnHelper<any>();
	const { divHeight } = useScroll();
	const { board, type, setType, setClear, setClearBoardIndex, title, setTitle } = useBoard();
	const [height, setHeight] = useState(divHeight);

	const addTag = (value: any) => {
		return <p className="text-md font-bold">{value}</p>;
	};

	const columns = [
		columnHelper.accessor('title', {
			id: '제목',
			cell: (info) => addTag(info.getValue()),
			size: 300,
		}),
		columnHelper.accessor('name', {
			id: '작성자',
			cell: (info) => addTag(info.getValue()),
			size: 100,
		}),
		columnHelper.accessor('createDate', {
			id: '작성일',
			cell: (info) => addTag(info.getValue()),
			size: 100,
		}),
		columnHelper.accessor('modifyDate', {
			id: '수정일',
			cell: (info) => addTag(info.getValue()),
			size: 100,
		}),
	];

	const writeClick = (newItem: any, file: any) => {
		const param = { profileNo: 21, authority: 0, title: newItem.title, body: newItem.body };
		const formData = new FormData();
		file.forEach((v: any) => {
			formData.append('uploadFiles', v[0]);
		});
		formData.append('boardDto', JSON.stringify(param));

		insert.mutate(formData);
	};

	const writePopup = () => {
		openModal({ type: 2, title: '글쓰기', closeOnOverlay: false, okClick: writeClick });
	};

	const write = () => {
		navigate('/topic/noticesModify', { state: { isNew: true } });
	};

	useEffect(() => {
		return () => {
			setTitle('공지사항');
			setType('notice');
		};
	}, []);

	useEffect(() => {
		if (type) {
			refetch();
		}
	}, [refetch, type]);

	useEffect(() => {
		setHeight(divHeight);
	}, [divHeight]);

	useEffect(() => {
		setClear();
		return () => setClearBoardIndex();
	}, [setClear, setClearBoardIndex]);

	return (
		<div className="overflow-auto flex min-h-[950px] min-w-[1000px]" style={{ height: `${height}` }}>
			<div className="mt-3 mr-5 min-w-[200px]">
				<CustomClickableOneLineWidget
					icon={<MdLaptopChromebook className="h-7 w-7" />}
					title="공지사항"
					onClickHandler={() => {
						setTitle('공지사항');
						setType('notice');
					}}
					selectedTitle={title}
				/>
				<CustomClickableOneLineWidget
					icon={<HiOutlineDesktopComputer className="h-6 w-6" />}
					title="회사소식"
					onClickHandler={() => {
						setTitle('회사소식');
						setType('news');
					}}
					selectedTitle={title}
				/>
				<CustomClickableOneLineWidget
					icon={<HiOutlineDesktopComputer className="h-6 w-6" />}
					title="게시판"
					onClickHandler={() => {
						setTitle('게시판');
						setType('free');
					}}
					selectedTitle={title}
				/>
			</div>
			<div className="grid grid-cols-1 w-full">
				<Card>
					{title === '공지사항' && (
						<>
							<header className="relative flex items-center justify-between">
								<div className="text-2xl font-bold text-navy-700 dark:text-white ml-1" />
								<Button onClick={() => write()}>
									<BsPlusCircle className="h-6 w-6 bold" />
								</Button>
							</header>

							<div>{isSuccess && <ColumnsTable columns={columns} list={board} show={10} isClick isSearch={false} columnsType="table" />}</div>
						</>
					)}
					{title === '회사소식' && (
						<>
							<header className="relative flex items-center justify-between">
								<div className="text-2xl font-bold text-navy-700 dark:text-white ml-1" />
								<Button onClick={() => write()}>
									<BsPlusCircle className="h-6 w-6 bold" />
								</Button>
							</header>

							<div>{isSuccess && <ColumnsTable columns={columns} list={board} show={10} isClick isSearch={false} columnsType="table" />}</div>
						</>
					)}
					{title === '게시판' && (
						<>
							<header className="relative flex items-center justify-between">
								<div className="text-2xl font-bold text-navy-700 dark:text-white ml-1" />
								<Button onClick={() => write()}>
									<BsPlusCircle className="h-6 w-6 bold" />
								</Button>
							</header>

							<div>{isSuccess && <ColumnsTable columns={columns} list={board} show={10} isClick isSearch={false} columnsType="table" />}</div>
						</>
					)}
				</Card>
			</div>
		</div>
	);
};

export default Notices;
