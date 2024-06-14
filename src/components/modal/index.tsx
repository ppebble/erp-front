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
	Textarea,
} from '@chakra-ui/react';
import useModal from '../../store/useModal';
import { CustomCalendarModal } from '../calendar/modal/CustomCalendarModal';
import { CustomAnnualAddModal } from '../../pages/topic/dashboard/components/modal/CustomAnnualAddModal';
import { CustomEquipAddModal } from '../../pages/topic/equipment/modal/CustomEquipAddModal';
import { CustomEquipBookAddModal } from '../../pages/topic/equipment/modal/CustomEquipBookAddModal';

type ModalProps = {
	change: () => void;
	type: number;
	contents: any;
	color?: string;
	okClick: () => void;
	updataClick: () => void;
	deleteClick: () => void;
};

const SetModal = ({ change, type, contents, color, okClick, updataClick, deleteClick }: ModalProps) => {
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
					<AlertDialogCloseButton size="lg" />
					<AlertDialogBody>
						<div>
							<p>이름 : {contents?.name}</p>
							<p>직책 : {contents?.position}</p>
							<p>직급 : {contents?.rank}</p>
							<p>부서 : {contents?.team}</p>
						</div>
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button colorScheme={color || 'green'} ref={cancelRef} onClick={updataClick}>
							수정
						</Button>
						<Button colorScheme={color || 'red'} ml={3} onClick={deleteClick}>
							삭제
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			);
			break;
		case 2: // 게시판 글 쓰기
			dialog = (
				<AlertDialogContent minW="50%" minH="50%">
					<AlertDialogHeader>글쓰기</AlertDialogHeader>
					<AlertDialogCloseButton size="lg" />

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
						<Button colorScheme={color || 'blue'} ml={3} onClick={okClick}>
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
		case 4: // 업데이트
			dialog = (
				<AlertDialogContent minW="50%" minH="50%">
					<AlertDialogHeader />
					<AlertDialogCloseButton size="lg" />

					<AlertDialogBody>
						<div>
							<div>수정 하시겠습니까?</div>
						</div>
					</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={change}>
							취소
						</Button>
						<Button colorScheme="blue" ml={3} onClick={okClick}>
							확인
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
		default:
			break;
	}
	return dialog;
};

const ModalProvider = () => {
	const { open, contents, color, type, closeOnOverlay, okClick, updataClick, deleteClick, closeModal } = useModal();
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
