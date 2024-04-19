import { Button, Input, InputGroup, InputLeftAddon, CloseButton } from '@chakra-ui/react';

const Skill = () => {
	return (
		<div>
			<Button className="mb-[10px]">추가</Button>
			<InputGroup className="mb-2 mb-[10px]">
				<InputLeftAddon className="!min-w-[100px]">기술명</InputLeftAddon>
				<Input id="skilName_1" />
				<InputLeftAddon className="!min-w-[100px] ml-[20px]">기술 등급</InputLeftAddon>
				<Input id="skillGrade_1" />
				<InputLeftAddon className="!min-w-[100px] ml-[20px]">분류 기준</InputLeftAddon>
				<Input id="criteria_1" />
				<CloseButton />
			</InputGroup>
			<InputGroup className="mb-2 mb-[10px]">
				<InputLeftAddon className="!min-w-[100px]">기술명</InputLeftAddon>
				<Input id="skilName_2" />
				<InputLeftAddon className="!min-w-[100px] ml-[20px]">기술 등급</InputLeftAddon>
				<Input id="skillGrade_2" />
				<InputLeftAddon className="!min-w-[100px] ml-[20px]">분류 기준</InputLeftAddon>
				<Input id="criteria_2" />
				<CloseButton />
			</InputGroup>
		</div>
	);
};

export default Skill;
