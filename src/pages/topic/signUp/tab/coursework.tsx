import { Button, Input, InputGroup, InputLeftAddon, CloseButton } from '@chakra-ui/react';

const Coursework = () => {
	return (
		<div>
			<Button className="mb-[10px]">추가</Button>
			<InputGroup className="mb-2 mb-[10px]">
				<InputLeftAddon className="!min-w-[100px]">과정명</InputLeftAddon>
				<Input id="eduName_1" />
				<InputLeftAddon className="!min-w-[100px] ml-[20px]">시작일</InputLeftAddon>
				<Input id="eduStartDate_1" type="date" />
				<InputLeftAddon className="!min-w-[100px] ml-[20px]">종료일</InputLeftAddon>
				<Input id="eduEndDate_1" type="date" />
				<InputLeftAddon className="!min-w-[100px] ml-[20px]">교육 기관명</InputLeftAddon>
				<Input id="institutation_1" />
				<CloseButton />
			</InputGroup>
			<InputGroup className="mb-2 mb-[10px]">
				<InputLeftAddon className="!min-w-[100px]">과정명</InputLeftAddon>
				<Input id="eduName_2" />
				<InputLeftAddon className="!min-w-[100px] ml-[20px]">시작일</InputLeftAddon>
				<Input id="eduStartDate_2" type="date" />
				<InputLeftAddon className="!min-w-[100px] ml-[20px]">종료일</InputLeftAddon>
				<Input id="eduEndDate_2" type="date" />
				<InputLeftAddon className="!min-w-[100px] ml-[20px]">교육 기관명</InputLeftAddon>
				<Input id="institutation_2" />
				<CloseButton />
			</InputGroup>
		</div>
	);
};

export default Coursework;
