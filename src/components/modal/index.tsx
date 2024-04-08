import { useRef } from 'react';
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

type ModalProps = {
	change: () => void;
	contents: any;
	open: boolean;
	type: number;
};

const SetModal = ({ change, contents, open, type }: ModalProps) => {
	const cancelRef = useRef<any>();
	let dialog;
	switch (type) {
		case 1:
			dialog = (
				<AlertDialogContent minW="50%" minH="75%">
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
		case 2:
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
		default:
			break;
	}
	return dialog;
};

const NormalModal = ({ change, contents, open, type }: ModalProps) => {
	const cancelRef = useRef<any>();

	return (
		<AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={change} isOpen={open} isCentered>
			<AlertDialogOverlay />
			<SetModal change={change} contents={contents} open={open} type={type} />
		</AlertDialog>
	);
};

export default NormalModal;
