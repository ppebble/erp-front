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
} from '@chakra-ui/react';

type normalProps = {
	width: string;
	height: string;
	change: () => void;
	open: boolean;
	contents: any;
};

const NormalModal = ({ width, height, change, open, contents }: normalProps) => {
	const cancelRef = useRef<any>();

	return (
		<AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={change} isOpen={open} isCentered>
			<AlertDialogOverlay />

			<AlertDialogContent minW={width} minH={height}>
				<AlertDialogHeader>상세보기</AlertDialogHeader>
				<AlertDialogCloseButton />
				<AlertDialogBody>
					<p>이름 : {contents?.name}</p>
					<p>직책 : {contents?.position}</p>
					<p>직급 : {contents?.rank}</p>
					<p>부서 : {contents?.team}</p>
				</AlertDialogBody>
				<AlertDialogFooter>
					<Button ref={cancelRef} onClick={change}>
						No
					</Button>
					<Button colorScheme="red" ml={3}>
						Yes
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default NormalModal;
