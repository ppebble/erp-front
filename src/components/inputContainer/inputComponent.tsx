import {
	InputGroup,
	InputLeftAddon,
	Input,
	CloseButton,
	Button,
	AccordionItem,
	AccordionButton,
	Box,
	AccordionPanel,
	Flex,
	Spacer,
	FormLabel,
	Badge,
	Tag,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useProfile from '../../store/useProfile';

type InputComponentprops = {
	inputItems: any;
	addInput: any;
	addDetail: any;
	InputDelete: (id: number) => void;
	detailDelete?: (id: number) => void;
	onChange: (e: any, id: any) => void;
	onDetailChange?: (e: any, id: any) => void;
	type: string;
};

const InputComponent = ({ inputItems, addInput, addDetail, InputDelete, detailDelete, onChange, onDetailChange, type }: InputComponentprops) => {
	const { careerIndex, setCareerIndex } = useProfile();

	const changeSelect = (index: number) => {
		setCareerIndex(index);
	};

	const inputComponent = () => {
		let component;
		switch (type) {
			case 'career':
				component = (
					<>
						{inputItems.map((item: any, index: any) => {
							return (
								<div key={`career_${item.id ? item.id : item.careerNo}`}>
									{index === 0 && (
										<Button className="mb-[10px]" onClick={() => addInput()}>
											추가
										</Button>
									)}
									<AccordionItem className="mb-[10px]">
										{index > 0 && inputItems[index - 1] ? <CloseButton onClick={() => InputDelete(index)} /> : ''}
										<AccordionButton className="!w-[100%] bg-[#E6E6FA]" onClick={() => changeSelect(index)}>
											<Box as="span" flex="1" textAlign="left">
												<InputGroup className="mb-2">
													<InputLeftAddon>회사명</InputLeftAddon>
													<Input
														id="companyName"
														className="!min-w-[100px] !bg-white"
														defaultValue={item.companyName}
														onChange={(e) => onChange(e, index)}
													/>
													<InputLeftAddon className="ml-[20px]">직무분류</InputLeftAddon>
													<Input
														id="jobClassification"
														className="!min-w-[100px] !bg-white"
														defaultValue={item.jobClassification}
														onChange={(e) => onChange(e, index)}
													/>
													<InputLeftAddon className="ml-[20px]">입사일</InputLeftAddon>
													<Input
														id="employmentDate"
														className="!min-w-[150px] !bg-white"
														type="date"
														defaultValue={item.employmentDate}
														onChange={(e) => onChange(e, index)}
													/>
													<InputLeftAddon className="ml-[20px]">퇴사일</InputLeftAddon>
													<Input
														id="resignationDate"
														className="!min-w-[150px] !bg-white"
														type="date"
														defaultValue={item.resignationDate}
														onChange={(e) => onChange(e, index)}
													/>
												</InputGroup>
											</Box>
										</AccordionButton>
										<AccordionPanel>
											{item.careerDetail.map((detailItem: any, detailIndex: any) => {
												return (
													<div key={`careerDetail_${careerIndex}_${detailItem.id ? detailItem.id : detailItem.carDetailNo}`}>
														{detailIndex === 0 && (
															<Button className="mb-[10px]" onClick={() => addDetail()}>
																추가
															</Button>
														)}
														<InputGroup className={`mb-2 ${detailIndex === 0 ? 'pr-[32px]' : ''}`}>
															<InputLeftAddon>프로젝트명</InputLeftAddon>
															<Input
																id="projectName"
																className="!min-w-[100px]"
																name={`projectName_${detailItem.id}`}
																defaultValue={detailItem.projectName}
																onChange={(e) => onDetailChange && onDetailChange(e, detailIndex)}
															/>
															<InputLeftAddon className="ml-[20px]">수행업무</InputLeftAddon>
															<Input
																id="task"
																className="!min-w-[100px]"
																name={`task_${detailItem.id}`}
																defaultValue={detailItem.task}
																onChange={(e) => onDetailChange && onDetailChange(e, detailIndex)}
															/>
															<InputLeftAddon className="ml-[20px]">프로젝트 수행일수</InputLeftAddon>
															<Input
																id="term"
																className="!min-w-[100px]"
																name={`term_${detailItem.id}`}
																defaultValue={detailItem.term}
																onChange={(e) => onDetailChange && onDetailChange(e, detailIndex)}
															/>
															{detailIndex > 0 ? <CloseButton onClick={() => detailDelete && detailDelete(detailIndex)} /> : ''}
														</InputGroup>
													</div>
												);
											})}
										</AccordionPanel>
									</AccordionItem>
								</div>
							);
						})}
					</>
				);
				break;
			case 'license':
				component = (
					<>
						{inputItems.map((item: any, index: any) => {
							return (
								<div key={`license_${item.id ? item.id : item.licenseNo}`}>
									{index === 0 && (
										<Button className="mb-[10px]" onClick={() => addInput()}>
											추가
										</Button>
									)}
									<InputGroup className={`mb-2 ${index === 0 ? 'pr-[32px]' : ''}`}>
										<InputLeftAddon className="!min-w-[100px]">자격증명</InputLeftAddon>
										<Input id="licenseName" defaultValue={item.licenseName} onChange={(e) => onChange(e, index)} />
										<InputLeftAddon className="!min-w-[100px] ml-[20px]">발급일</InputLeftAddon>
										<Input id="licenseDate" type="date" defaultValue={item.licenseDate} onChange={(e) => onChange(e, index)} />
										{index > 0 && inputItems[index - 1] ? <CloseButton onClick={() => InputDelete(index)} /> : ''}
									</InputGroup>
								</div>
							);
						})}
					</>
				);
				break;
			case 'cursework':
				component = (
					<>
						{inputItems.map((item: any, index: any) => {
							return (
								<div key={`cursework_${item.id ? item.id : item.eduNo}`}>
									{index === 0 && (
										<Button className="mb-[10px]" onClick={() => addInput()}>
											추가
										</Button>
									)}
									<InputGroup className={`mb-2 ${index === 0 ? 'pr-[32px]' : ''}`}>
										<InputLeftAddon className="!min-w-[100px]">과정명</InputLeftAddon>
										<Input id="eduName" defaultValue={item.eduName} onChange={(e) => onChange(e, index)} />
										<InputLeftAddon className="!min-w-[100px] ml-[20px]">시작일</InputLeftAddon>
										<Input id="eduStartDate" type="date" defaultValue={item.eduStartDate} onChange={(e) => onChange(e, index)} />
										<InputLeftAddon className="!min-w-[100px] ml-[20px]">종료일</InputLeftAddon>
										<Input id="eduEndDate" type="date" defaultValue={item.eduEndDate} onChange={(e) => onChange(e, index)} />
										<InputLeftAddon className="!min-w-[100px] ml-[20px]">교육 기관명</InputLeftAddon>
										<Input id="institution" defaultValue={item.institution} onChange={(e) => onChange(e, index)} />
										{index > 0 && inputItems[index - 1] ? <CloseButton onClick={() => InputDelete(index)} /> : ''}
									</InputGroup>
								</div>
							);
						})}
					</>
				);
				break;
			case 'skill':
				component = (
					<>
						{inputItems.map((item: any, index: any) => {
							return (
								<div key={`skill_${item.id ? item.id : item.skillNo}`}>
									{index === 0 && (
										<Button className="mb-[10px]" onClick={() => addInput()}>
											추가
										</Button>
									)}
									<InputGroup className={`mb-2 ${index === 0 ? 'pr-[32px]' : ''}`}>
										<InputLeftAddon className="!min-w-[100px]">기술명</InputLeftAddon>
										<Input id="skillName" defaultValue={item.skillName} onChange={(e) => onChange(e, index)} />
										<InputLeftAddon className="!min-w-[100px] ml-[20px]">기술 등급</InputLeftAddon>
										<Input id="skillGrade" defaultValue={item.skillGrade} onChange={(e) => onChange(e, index)} />
										<InputLeftAddon className="!min-w-[100px] ml-[20px]">분류 기준</InputLeftAddon>
										<Input id="criteria" defaultValue={item.criteria} onChange={(e) => onChange(e, index)} />
										{index > 0 && inputItems[index - 1] ? <CloseButton onClick={() => InputDelete(index)} /> : ''}
									</InputGroup>
								</div>
							);
						})}
					</>
				);
				break;
			case 'project':
				component = (
					<>
						<div>
							<Flex className="mb-[10px]">
								<Tag size="lg" borderRadius="full" variant="solid" colorScheme="teal">
									산출물
								</Tag>
								<Spacer />
								<Button onClick={() => addInput()}>추가</Button>
							</Flex>
						</div>
						{inputItems.map((item: any, index: any) => {
							return (
								<div key={`project_${item.id}`}>
									<InputGroup className="mb-2">
										<Input id={`file_${item.id}`} type="file" onChange={(e) => onChange(e, index)} />
										<CloseButton onClick={() => InputDelete(index)} />
									</InputGroup>
								</div>
							);
						})}
					</>
				);
				break;
			case 'member':
				component = (
					<>
						<div>
							<Flex className="mb-[10px]">
								<Tag size="lg" borderRadius="full" variant="solid" colorScheme="teal">
									팀원
								</Tag>
								<Spacer />
								<Button onClick={() => addInput()}>추가</Button>
							</Flex>
						</div>
						{inputItems.map((item: any, index: any) => {
							return (
								<div key={`member_${item.id}`}>
									<InputGroup className={`mb-2 ${index === 0 ? 'pr-[32px]' : ''}`}>
										<InputLeftAddon className="!min-w-[100px]">이름</InputLeftAddon>
										<Input id="licenseName" defaultValue={item.member} onChange={(e) => onChange(e, index)} />
										<InputLeftAddon className="!min-w-[100px] ml-[20px]">직책</InputLeftAddon>
										<Input id="licenseDate" defaultValue={item.role} onChange={(e) => onChange(e, index)} />
										<InputLeftAddon className="!min-w-[100px] ml-[20px]">업무</InputLeftAddon>
										<Input id="licenseDate" defaultValue={item.task} onChange={(e) => onChange(e, index)} />
										{index > 0 && inputItems[index - 1] ? <CloseButton onClick={() => InputDelete(index)} /> : ''}
									</InputGroup>
								</div>
							);
						})}
					</>
				);
				break;
			default:
				break;
		}
		return component;
	};

	return inputComponent();
};

export default InputComponent;
