/* eslint-disable react/no-danger */
import { useEffect, useRef, useState } from 'react';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Input,
	Text,
	InputGroup,
	InputLeftAddon,
	Tag,
} from '@chakra-ui/react';
import useModal from '../../store/useModal';
import ToastEditor from '../textEditor/toastEditor';
import { CustomAnnualAddModal } from '../../pages/topic/dashboard/components/modal/CustomAnnualAddModal';
import { CustomEquipAddModal } from '../../pages/topic/equipment/modal/CustomEquipAddModal';
import { CustomEquipBookAddModal } from '../../pages/topic/equipment/modal/CustomEquipBookAddModal';
import InputContainer from '../inputContainer';

type ModalProps = {
	change: () => void;
	type: number;
	title?: string;
	contents?: any;
	color?: string;
	okClick: () => void;
	updataClick: (update: any) => void;
	deleteClick: () => void;
};

const SetModal = ({ change, type, title, contents, color, okClick, updataClick, deleteClick }: ModalProps) => {
	const [detailsSize, setDetailsSize] = useState<string[]>(window.innerWidth < 1441 ? ['80%', '80%'] : ['50%', '75%']);
	const [partner, setPartner] = useState({ company: '', name: '', phone: '', email: '' });
	const [newBoard, setNewBoard] = useState({ title: '', body: '' });

	const onChangePartner = (e: any) => {
		const { id, value } = e.target;
		setPartner({ ...partner, [id]: value });
	};

	const onChangeNewBoard = (e: any) => {
		const { id, value } = e.target;
		setNewBoard({ ...newBoard, [id]: value });
	};

	const [fileCount, setFileCount] = useState(0);
	const [fileValue, setFileValue] = useState<any>();

	useEffect(() => {
		// console.log(fileValue);
	}, [fileValue]);

	useEffect(() => {
		const changeSize = () => {
			window.innerWidth < 1441 ? setDetailsSize(['80%', '80%']) : setDetailsSize(['50%', '75%']);
		};
		window.addEventListener('resize', changeSize);
		return () => window.removeEventListener('resize', changeSize);
	}, []);

	const cancelRef = useRef<any>();
	let dialog;
	switch (type) {
		case 0: // 프로젝트 - 파트너 추가
			dialog = (
				<AlertDialogContent minW="20%" minH="20%">
					<AlertDialogHeader>추가</AlertDialogHeader>
					<AlertDialogCloseButton size="lg" />
					<AlertDialogBody>
						<div>
							<Input id="company" className="mb-[10px]" onChange={(e) => onChangePartner(e)} placeholder="회사명" />
							<Input id="name" className="mb-[10px]" onChange={(e) => onChangePartner(e)} placeholder="이름" />
							<Input id="phone" className="mb-[10px]" onChange={(e) => onChangePartner(e)} placeholder="연락처" />
							<Input id="email" onChange={(e) => onChangePartner(e)} placeholder="이메일" />
						</div>
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button colorScheme="blue" onClick={() => updataClick(partner)}>
							등록
						</Button>
						<Button colorScheme="red" ml={3} onClick={change}>
							취소
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			);
			break;
		case 1: // 게시판 글 상세보기
			dialog = (
				<AlertDialogContent minW="50%" minH="50%">
					<AlertDialogHeader>상세보기</AlertDialogHeader>
					<AlertDialogCloseButton size="lg" />

					<AlertDialogBody>
						<div>
							<InputGroup className="mb-2">
								<InputLeftAddon className="!min-w-[120px]">제목</InputLeftAddon>
								<Input id="title" className="pointer-events-none" defaultValue={contents.title || ''} />
							</InputGroup>
							<InputGroup className="mb-2">
								<InputLeftAddon className="!min-w-[120px]">작성일</InputLeftAddon>
								<Input id="createDate" className="pointer-events-none" defaultValue={contents.createDate || ''} />
								<InputLeftAddon className="!min-w-[120px] ml-[20px]">작성자</InputLeftAddon>
								<Input id="name" className="pointer-events-none" defaultValue={contents.name || ''} />
							</InputGroup>
							<Tag size="lg" variant="subtle" colorScheme="gray" className="border border-inherit w-[100px] mb-[10px]">
								내용
							</Tag>
							<Text
								id="body"
								className="border border-[#E2E8F0] border-solid rounded-md px-[10px] py-[5px] !h-[20rem]"
								dangerouslySetInnerHTML={{ __html: contents.body }}
							/>
						</div>
					</AlertDialogBody>

					<AlertDialogFooter>
						<Button colorScheme="green" onClick={updataClick}>
							수정
						</Button>
						<Button colorScheme="red" ml={3} onClick={change}>
							삭제
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			);
			break;
		case 2: // 게시판 글 쓰기
			dialog = (
				<AlertDialogContent minW="50%" minH="50%">
					<AlertDialogHeader>{title}</AlertDialogHeader>
					<AlertDialogCloseButton size="lg" />

					<AlertDialogBody>
						<div>
							<Tag size="lg" variant="subtle" colorScheme="gray" className="border border-inherit w-[100px] mb-[10px]">
								제목
							</Tag>
							<Input id="title" defaultValue={contents?.title || ''} className="mb-[10px]" />
							<InputContainer
								props={{ id: fileCount, file: '' }}
								count={fileCount}
								setCount={setFileCount}
								setValue={setFileValue}
								type="attachment"
								style={'board' || ''}
							/>
							<Tag size="lg" variant="subtle" colorScheme="gray" className="border border-inherit w-[100px] mb-[10px]">
								내용
							</Tag>
							<ToastEditor />
						</div>
					</AlertDialogBody>

					<AlertDialogFooter>
						<Button colorScheme="blue" onClick={() => updataClick('test')}>
							{title === '글쓰기' ? '등록' : '수정'}
						</Button>
						<Button colorScheme="red" ml={3} onClick={change}>
							취소
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			);
			break;
		case 3: // 알림
			dialog = (
				<AlertDialogContent minW="20%" minH="20%">
					<AlertDialogHeader />
					<AlertDialogCloseButton size="lg" />

					<AlertDialogBody className="content-center text-center text-xl">
						<div dangerouslySetInnerHTML={{ __html: contents }} />
					</AlertDialogBody>

					<AlertDialogFooter className="!flow-root w-full text-center">
						<Button className="w-1/2 !ml-0" colorScheme={color || 'blue'} ml={3} onClick={change}>
							확인
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			);
			break;
		case 4: // 수정/삭제
			dialog = (
				<AlertDialogContent minW="20%" minH="20%">
					<AlertDialogHeader />
					<AlertDialogCloseButton size="lg" />

					<AlertDialogBody className="content-center text-center text-xl">
						<div dangerouslySetInnerHTML={{ __html: contents }} />
					</AlertDialogBody>

					<AlertDialogFooter>
						<Button colorScheme={color || 'blue'} onClick={okClick}>
							확인
						</Button>
						<Button ref={cancelRef} ml={3} onClick={change}>
							취소
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			);
			break;
		case 5:
			dialog = <CustomAnnualAddModal onClose={change} />;
			break;
		case 6:
			break;
		case 7:
			dialog = <CustomEquipAddModal title={contents.title} onClose={change} row={contents.row} setOpen={contents.setOpen} />;
			break;
		case 8:
			dialog = <CustomEquipBookAddModal title={contents.title} row={contents.row} onClose={change} setOpen={contents.setOpen} />;
			break;
		case 9:
			dialog = (
				<AlertDialogContent minW="30%" minH="30%">
					<AlertDialogHeader />
					<AlertDialogCloseButton size="lg" />

					<AlertDialogBody className="content-center text-center text-xl">
						<Input />
					</AlertDialogBody>

					<AlertDialogFooter>
						<Button colorScheme="blue" onClick={okClick}>
							확인
						</Button>
						<Button ref={cancelRef} ml={3} onClick={change}>
							취소
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			);
			break;
		default:
			break;
	}
	return dialog;
};

const ModalProvider = () => {
	const { open, title, contents, color, type, closeOnOverlay, okClick, updataClick, deleteClick, closeModal } = useModal();
	const cancelRef = useRef<any>();

	// closeOnOverlayClick 영역밖 클릭시 Dialog 닫히는지
	return (
		<AlertDialog
			motionPreset="slideInBottom"
			closeOnOverlayClick={closeOnOverlay}
			leastDestructiveRef={cancelRef}
			onClose={closeModal}
			isOpen={open}
			isCentered
		>
			<AlertDialogOverlay />
			<SetModal
				change={closeModal}
				type={type}
				title={title}
				contents={contents}
				color={color}
				okClick={okClick}
				updataClick={updataClick}
				deleteClick={deleteClick}
			/>
		</AlertDialog>
	);
};

export default ModalProvider;
