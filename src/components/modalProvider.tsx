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
	Textarea,
} from '@chakra-ui/react';
import useModal from '../store/useModal';

type ModalProps = {
	change: () => void;
	contents: any;
	open: boolean;
	type: number;
	closeOnOverlay?: boolean;
};

const SetModal = ({ change, contents, open, type }: ModalProps) => {
	const [detailsSize, setDetailsSize] = useState<string[]>(window.innerWidth < 1441 ? ['80%', '80%'] : ['50%', '75%']);

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
		case 1: // 게시판 글 상세보기
			dialog = (
				<AlertDialogContent minW={detailsSize[0]} minH={detailsSize[1]}>
					<AlertDialogHeader>상세보기</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody>
						<div>
							<p>이름 : {contents?.name}</p>
							<p>직책 : {contents?.position}</p>
							<p>직급 : {contents?.rank}</p>
							<p>부서 : {contents?.team}</p>
						</div>
					</AlertDialogBody>
				</AlertDialogContent>
			);
			break;
		case 2: // 게시판 글 쓰기
			dialog = (
				<AlertDialogContent minW="50%" minH="50%">
					<AlertDialogHeader>글쓰기</AlertDialogHeader>
					<AlertDialogCloseButton />

					<AlertDialogBody>
						<div>
							<p>이름</p>
							<Input />
							<p>직책</p>
							<Input />
							<p>직급</p>
							<Input />
							<p>부서</p>
							<Input />
							<p>내용</p>
							<Textarea />
						</div>
					</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={change}>
							취소
						</Button>
						<Button colorScheme="blue" ml={3}>
							확인
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			);
			break;
		case 3: // 알림
			dialog = (
				<AlertDialogContent minW="20%" minH="20%">
					<AlertDialogHeader />
					<AlertDialogCloseButton />

					<AlertDialogBody className="content-center text-center text-xl">
						<div>{contents}</div>
					</AlertDialogBody>

					<AlertDialogFooter className="!flow-root w-full text-center">
						<Button className="w-1/2 !ml-0" colorScheme="blue" ml={3} onClick={change}>
							확인
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			);
			break;
		case 4: // 업데이트
			dialog = (
				<AlertDialogContent minW="50%" minH="50%">
					<AlertDialogHeader />
					<AlertDialogCloseButton />

					<AlertDialogBody>
						<div>
							<div>수정 하시겠습니까?</div>
						</div>
					</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={change}>
							취소
						</Button>
						<Button colorScheme="blue" ml={3}>
							확인
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
	const { open, contents, type, closeOnOverlay, action } = useModal();

	const cancelRef = useRef<any>();

	// closeOnOverlayClick 영역밖 클릭시 Dialog 닫히는지
	return (
		<AlertDialog
			motionPreset="slideInBottom"
			closeOnOverlayClick={closeOnOverlay}
			leastDestructiveRef={cancelRef}
			onClose={action.closeModal}
			isOpen={open}
			isCentered
		>
			<AlertDialogOverlay />
			<SetModal change={action.closeModal} contents={contents} open={open} type={type} />
		</AlertDialog>
	);
};

export default ModalProvider;
