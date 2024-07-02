import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input, InputGroup, InputLeftAddon, Tag, Text } from '@chakra-ui/react';
import useBoard from '../../../store/useBoard';
import InputContainer from '../../../components/inputContainer';
import useModal from '../../../store/useModal';
import BoardService from '../../../services/boardService';

const NoticesDetail = () => {
	const del = BoardService().delBoard;
	const { detail, title } = useBoard();
	const navigate = useNavigate();
	const { openModal, closeModal } = useModal();
	const [fileValue, setFileValue] = useState<any>();
	const [fileCount, setFileCount] = useState(0);

	const updateBoard = () => {
		navigate('/topic/noticesModify', { state: { isNew: false } });
	};

	const deleteOk = () => {
		del.mutate({ seqNo: detail.boardVo.boardNo });
		closeModal();
	};

	const deleteBoard = () => {
		openModal({ type: 4, contents: `<p className='text-xl'>삭제 하시겠습니까?</p>`, color: 'red', okClick: deleteOk });
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
						<Input id="title" className="pointer-events-none" defaultValue={detail?.boardVo.title || ''} />
					</InputGroup>
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">작성일</InputLeftAddon>
						<Input id="createDate" className="pointer-events-none" defaultValue={detail?.boardVo.createDate || ''} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">작성자</InputLeftAddon>
						<Input id="name" className="pointer-events-none" defaultValue={detail?.boardVo.name || ''} />
					</InputGroup>
					<Tag size="lg" variant="subtle" colorScheme="gray" className="border border-inherit !min-w-[120px] !h-[40px]">
						내용
					</Tag>
					<Text
						id="body"
						className="border border-[#E2E8F0] border-solid rounded-md px-[10px] py-[5px] !h-[20rem] mb-4"
						dangerouslySetInnerHTML={{ __html: detail?.boardVo.body }}
					/>

					{/* 첨부파일 */}
					<InputContainer
						props={{ id: fileCount }}
						count={fileCount}
						setCount={setFileCount}
						setValue={setFileValue}
						type="attachment"
						style={'board' || ''}
						readOnly
					/>
					<div className="flex justify-end">
						<Button colorScheme="green" onClick={() => updateBoard()}>
							수정
						</Button>
						<Button colorScheme="red" ml={3} onClick={() => deleteBoard()}>
							삭제
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default NoticesDetail;
