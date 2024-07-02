import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Card, Input, InputGroup, InputLeftAddon, Tag } from '@chakra-ui/react';
import InputContainer from '../../../components/inputContainer';
import ToastEditor from '../../../components/textEditor/toastEditor';
import useBoard from '../../../store/useBoard';
import BoardService from '../../../services/boardService';

const NoticesModify = () => {
	const insert = BoardService().insertBoard;
	const update = BoardService().updateBoard;
	const { detail, newBoard, setNewBoard, title } = useBoard();
	const { state } = useLocation();
	const { isNew } = state;
	const [fileValue, setFileValue] = useState<any>();
	const [fileCount, setFileCount] = useState(0);

	const onChangeNewBoard = (id: string, value: any) => {
		setNewBoard({ ...newBoard, [id]: value });
	};

	const writeClick = () => {
		const param = { profileNo: 21, authority: 0, title: newBoard.title, body: newBoard.body };
		const formData = new FormData();
		fileValue.forEach((v: any) => {
			formData.append('uploadFiles', v[0]);
		});
		formData.append('boardDto', JSON.stringify(param));
		if (isNew) {
			insert.mutate(formData);
		} else {
			update.mutate(formData);
		}
	};

	return (
		<div className="mt-5 grid">
			<Card className="w-full h-full pt-[20px] pb-10 sm:px-[20px]">
				<div className="mt-5 overflow-x-scroll xl:overflow-x-hidden xl:pl-[20%] xl:pr-[20%] md:pl-[10%] md:pr-[10%]">
					<header className="relative flex items-center justify-between mb-4">
						<div className="text-2xl font-bold text-navy-700 dark:text-white ml-1">{title}</div>
					</header>
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">제목</InputLeftAddon>
						<Input
							id="title"
							defaultValue={detail?.boardVo.title || ''}
							className="mb-[10px]"
							onChange={(e) => onChangeNewBoard(e.target.id, e.target.value)}
						/>
					</InputGroup>
					<Tag size="lg" variant="subtle" colorScheme="gray" className="border border-inherit !min-w-[120px] !h-[40px]">
						내용
					</Tag>
					<ToastEditor onChange={onChangeNewBoard} defaultValue={detail?.boardVo.body || ''} />
					{/* 첨부파일 */}
					<InputContainer
						props={{ id: fileCount }}
						count={fileCount}
						setCount={setFileCount}
						setValue={setFileValue}
						type="attachment"
						style={'board' || ''}
					/>
					<div className="flex justify-end">
						<Button colorScheme="blue" onClick={() => writeClick()}>
							{isNew ? '등록' : '수정'}
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default NoticesModify;
