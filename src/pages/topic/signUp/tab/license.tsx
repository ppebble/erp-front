import { useRef, createElement } from 'react';
import { Button, Input, InputGroup, InputLeftAddon, CloseButton } from '@chakra-ui/react';

const License = () => {
	const divRef = useRef<HTMLDivElement>(null);

	return (
		<div>
			<Button className="mb-[10px]">추가</Button>
			<InputGroup className="mb-2">
				<InputLeftAddon className="!min-w-[100px]">자격증명</InputLeftAddon>
				<Input id="licenseName_1" />
				<InputLeftAddon className="!min-w-[100px] ml-[20px]">발급일</InputLeftAddon>
				<Input id="licenseDate_1" type="date" />
				<CloseButton />
			</InputGroup>
			<InputGroup className="mb-2">
				<InputLeftAddon className="!min-w-[100px]">자격증명</InputLeftAddon>
				<Input id="licenseName_2" />
				<InputLeftAddon className="!min-w-[100px] ml-[20px]">발급일</InputLeftAddon>
				<Input id="licenseDate_2" type="date" />
				<CloseButton />
			</InputGroup>
		</div>
	);
};

export default License;
