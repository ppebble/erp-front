import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { createColumnHelper } from '@tanstack/react-table';
import ColumnsTable from '../../../components/columnsTable';
import { BoardService } from '../../../services/boardService';
import useBoard from '../../../store/useBoard';
import Card from '../../../components/card';
import useModal from '../../../store/useModal';

const News = () => {
	const { isSuccess } = useQuery('boardList', BoardService().boardList);
	const { insertBoard } = BoardService();
	const { setType, board: news } = useBoard();
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

	const insert = () => {
		console.log('???');
	};

	const write = () => {
		openModal({ type: 2, title: '글쓰기', closeOnOverlay: false, okClick: insert });
	};

	useEffect(() => {
		setType('news');
	}, [setType]);

	return (
		<div className="mt-5 grid">
			<Card extra="w-full pb-10 p-4 h-full">
				<header className="relative flex items-center justify-between">
					<div className="text-xl font-bold text-navy-700 dark:text-white">회사소식</div>
				</header>
				{isSuccess && <ColumnsTable columns={columns} list={news} show={show} isClick isSearch={false} addButton={write} type="table" />}
			</Card>
		</div>
	);
};

export default News;
