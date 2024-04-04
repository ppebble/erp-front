import { ReactNode, useRef, useState } from 'react';
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
} from '@chakra-ui/react';

type normalProps = {
	width: string;
	height: string;
	change: () => void;
	open: boolean;
	contents: any;
	type: number;
};

const CaseBody = (contents: any, type: number) => {
	switch (type) {
		case 1:
			return (
				<div>
					<p>이름 : {contents?.name}</p>
					<p>직책 : {contents?.position}</p>
					<p>직급 : {contents?.rank}</p>
					<p>부서 : {contents?.team}</p>
				</div>
			);
		case 2:
			return (
				<div>
					이름 : <Input className="w-3/6" />
					<br />
					직책 : <Input />
					<br />
					직급 : <Input />
					<br />
					부서 : <Input />
					<br />
				</div>
			);
		default:
			return <div>default</div>;
	}
};

const NormalModal = ({ width, height, change, open, contents, type }: normalProps) => {
	const cancelRef = useRef<any>();

	return (
		<AlertDialog size="xl" motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={change} isOpen={open} isCentered>
			<AlertDialogOverlay />

			<AlertDialogContent>
				<AlertDialogHeader>{type === 1 ? '상세보기' : '글쓰기'}</AlertDialogHeader>
				<AlertDialogCloseButton />

				<AlertDialogBody>{CaseBody(contents, type)}</AlertDialogBody>

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
