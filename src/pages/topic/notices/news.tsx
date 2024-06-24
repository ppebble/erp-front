import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Card } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import ColumnsTable from '../../../components/columnsTable';
import { BoardService } from '../../../services/boardService';
import useBoard from '../../../store/useBoard';
import useModal from '../../../store/useModal';

const News = () => {
	const { isSuccess } = useQuery('boardList', BoardService().boardList);
	const { insertBoard } = BoardService();
	const { setType, board } = useBoard();
	const { openModal } = useModal();
	const columnHelper = createColumnHelper<any>();
	const [show] = useState(10);

	const addTag = (value: any) => {
		return <p className="text-md font-bold">{value}</p>;
	};

	const columns = [
		columnHelper.accessor('title', {
			id: '제목',
			cell: (info) => addTag(info.getValue()),
			size: 200,
		}),
		columnHelper.accessor('body', {
			id: '내용',
			cell: (info) => addTag(info.getValue()),
			size: 200,
		}),
		columnHelper.accessor('name', {
			id: '작성자',
			cell: (info) => addTag(info.getValue()),
			size: 200,
		}),
		columnHelper.accessor('createDate', {
			id: '작성일',
			cell: (info) => addTag(info.getValue()),
			size: 200,
		}),
		columnHelper.accessor('modifyDate', {
			id: '수정일',
			cell: (info) => addTag(info.getValue()),
			size: 250,
		}),
	];

	const insert = (str: string) => {
		console.log(str);
	};

	const write = () => {
		openModal({ type: 2, title: '글쓰기', closeOnOverlay: false, updataClick: insert });
	};

	useEffect(() => {
		setType('news');
	}, [setType]);

	return (
		<Card>
			<header className="relative flex items-center justify-between">
				<div className="text-xl font-bold text-navy-700 dark:text-white ml-1">회사소식</div>
			</header>
			{isSuccess && <ColumnsTable columns={columns} list={board} show={show} isClick isSearch={false} addButton={write} columnsType="table" />}
		</Card>
	);
};

export default News;
