import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Input,
	InputGroup,
	InputLeftAddon,
	CloseButton,
} from '@chakra-ui/react';

const Career = () => {
	return (
		<div>
			<Button className="mb-[10px]">추가</Button>

			<Accordion defaultIndex={[0]}>
				<AccordionItem className="mb-[10px]">
					<h2>
						<AccordionButton className="bg-[#E6E6FA]">
							<Box as="span" flex="1" textAlign="left">
								<InputGroup className="mb-2">
									<InputLeftAddon className="!min-w-[100px]">회사명</InputLeftAddon>
									<Input id="companyName_1" className="!min-w-[200px] !bg-white" style={{ zIndex: '10' }} />
									<InputLeftAddon className="!min-w-[100px] ml-[20px]">직무분류</InputLeftAddon>
									<Input id="jobClassification_1" className="!min-w-[200px] !bg-white" />
									<InputLeftAddon className="!min-w-[100px] ml-[20px]">입사일</InputLeftAddon>
									<Input id="employmentDate_1" type="date" className="!min-w-[200px] !bg-white" />
									<InputLeftAddon className="!min-w-[100px] ml-[20px]">퇴사일</InputLeftAddon>
									<Input id="resignationDate_1" type="date" className="!min-w-[200px] !bg-white" />
								</InputGroup>
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel id="panel_1">
						<InputGroup className="mb-2">
							<InputLeftAddon className="!min-w-[100px]">프로젝트명</InputLeftAddon>
							<Input id="projectName_1_1" className="!min-w-[200px]" />
							<InputLeftAddon className="!min-w-[100px] ml-[20px]">수행 업무</InputLeftAddon>
							<Input id="task_1_1" className="!min-w-[200px]" />
							<InputLeftAddon className="!min-w-[100px] ml-[20px]">프로젝트 수행 일수</InputLeftAddon>
							<Input id="term_1_1" className="!min-w-[200px]" />
							<CloseButton id="delete_1_1" />
						</InputGroup>
						<InputGroup className="mb-2">
							<InputLeftAddon className="!min-w-[100px]">프로젝트명</InputLeftAddon>``
							<Input id="projectName_1_2" className="!min-w-[200px]" />
							<InputLeftAddon className="!min-w-[100px] ml-[20px]">수행 업무</InputLeftAddon>
							<Input id="task_1_2" className="!min-w-[200px]" />
							<InputLeftAddon className="!min-w-[100px] ml-[20px]">프로젝트 수행 일수</InputLeftAddon>
							<Input id="term_1_2" className="!min-w-[200px]" />
							<CloseButton id="delete_1_2" />
						</InputGroup>
					</AccordionPanel>
				</AccordionItem>
				<AccordionItem className="mb-[10px]">
					<h2>
						<AccordionButton className="bg-[#E6E6FA]">
							<Box as="span" flex="1" textAlign="left">
								<InputGroup className="mb-2">
									<InputLeftAddon className="!min-w-[100px]">회사명</InputLeftAddon>
									<Input id="companyName_2" className="!min-w-[200px] !bg-white" style={{ zIndex: '10' }} />
									<InputLeftAddon className="!min-w-[100px] ml-[20px]">직무분류</InputLeftAddon>
									<Input id="jobClassification_2" className="!min-w-[200px] !bg-white" />
									<InputLeftAddon className="!min-w-[100px] ml-[20px]">입사일</InputLeftAddon>
									<Input id="employmentDate_2" type="date" className="!min-w-[200px] !bg-white" />
									<InputLeftAddon className="!min-w-[100px] ml-[20px]">퇴사일</InputLeftAddon>
									<Input id="resignationDate_2" type="date" className="!min-w-[200px] !bg-white" />
								</InputGroup>
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel id="panel_2">
						<InputGroup className="mb-2">
							<InputLeftAddon className="!min-w-[100px]">프로젝트명</InputLeftAddon>
							<Input id="projectName_2_1" className="!min-w-[200px]" />
							<InputLeftAddon className="!min-w-[100px] ml-[20px]">수행 업무</InputLeftAddon>
							<Input id="task_2_1" className="!min-w-[200px]" />
							<InputLeftAddon className="!min-w-[100px] ml-[20px]">프로젝트 수행 일수</InputLeftAddon>
							<Input id="term_2_1" className="!min-w-[200px]" />
							<CloseButton id="delete_2_1" />
						</InputGroup>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default Career;
