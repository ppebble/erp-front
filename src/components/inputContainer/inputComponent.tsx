import { useState } from 'react';
import { InputGroup, InputLeftAddon, Input, CloseButton, Button, AccordionItem, AccordionButton, Box, AccordionPanel } from '@chakra-ui/react';
import useProfile from '../../store/useProfile';
import CareerDetail from '../../pages/topic/signUp/tab/careerDetail';

type InputComponentprops = {
	inputItems: any;
	addInput: any;
	InputDelete: (id: number) => void;
	onChange: (e: any, id: any) => void;
	type: string;
};

const InputComponent = ({ inputItems, addInput, InputDelete, onChange, type }: InputComponentprops) => {
	const { careerIndex, setCareerIndex } = useProfile();

	const changeSelect = (index: number) => {
		setCareerIndex(index);
	};

	const inputComponent = () => {
		let component;
		switch (type) {
			case 'career':
				component = (
					<div>
						{inputItems.map((item: any, index: any) => {
							return (
								<div key={`career_${item.id}`}>
									{index === 0 && (
										<Button className="mb-[10px]" onClick={() => addInput()}>
											추가
										</Button>
									)}
									<AccordionItem className="mb-[10px]">
										<AccordionButton className="bg-[#E6E6FA]" onClick={() => changeSelect(index)}>
											<Box as="span" flex="1" textAlign="left">
												<InputGroup className={`mb-2 ${index === 0 ? 'pr-[32px]' : ''}`}>
													<InputLeftAddon className="!min-w-[100px]">회사명</InputLeftAddon>
													<Input
														id="companyName"
														className="!min-w-[200px] !bg-white"
														defaultValue={item.licenseName}
														onChange={(e) => onChange(e, index)}
													/>
													<InputLeftAddon className="!min-w-[100px] ml-[20px]">직무분류</InputLeftAddon>
													<Input
														id="jobClassification"
														className="!min-w-[200px] !bg-white"
														defaultValue={item.licenseDate}
														onChange={(e) => onChange(e, index)}
													/>
													<InputLeftAddon className="!min-w-[100px] ml-[20px]">입사일</InputLeftAddon>
													<Input
														id="employmentDate"
														className="!min-w-[200px] !bg-white"
														type="date"
														defaultValue={item.licenseDate}
														onChange={(e) => onChange(e, index)}
													/>
													<InputLeftAddon className="!min-w-[100px] ml-[20px]">퇴사일</InputLeftAddon>
													<Input
														id="resignationDate"
														className="!min-w-[200px] !bg-white"
														type="date"
														defaultValue={item.licenseDate}
														onChange={(e) => onChange(e, index)}
													/>
												</InputGroup>
											</Box>
										</AccordionButton>
										{index > 0 && inputItems[index - 1] ? <CloseButton onClick={() => InputDelete(index)} /> : ''}
										<CareerDetail />
									</AccordionItem>
								</div>
							);
						})}
					</div>
				);
				break;
			case 'careerDetail':
				component = (
					<div>
						{inputItems.map((item: any, index: any) => {
							return (
								<div key={`careerDetail_${careerIndex}_${item.id}`}>
									{index === 0 && (
										<Button className="mb-[10px]" onClick={() => addInput(index)}>
											추가
										</Button>
									)}
									<InputGroup className={`mb-2 ${index === 0 ? 'pr-[32px]' : ''}`}>
										<InputLeftAddon className="!min-w-[100px]">프로젝트명</InputLeftAddon>
										<Input id="projectName" name={`projectName_${item.id}`} defaultValue={item.licenseName} onChange={(e) => onChange(e, index)} />
										<InputLeftAddon className="!min-w-[100px] ml-[20px]">수행업무</InputLeftAddon>
										<Input id="projectTask" name={`task_${item.id}`} defaultValue={item.licenseDate} onChange={(e) => onChange(e, index)} />
										<InputLeftAddon className="!min-w-[100px] ml-[20px]">프로젝트 수행일수</InputLeftAddon>
										<Input id="projectTerm" name={`term_${item.id}`} defaultValue={item.licenseDate} onChange={(e) => onChange(e, index)} />
										{index > 0 && inputItems[index - 1] ? <CloseButton onClick={() => InputDelete(index)} /> : ''}
									</InputGroup>
								</div>
							);
						})}
					</div>
				);
				break;
			case 'license':
				component = (
					<div>
						{inputItems.map((item: any, index: any) => {
							return (
								<div key={item.id}>
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
					</div>
				);
				break;
			case 'cursework':
				component = (
					<div>
						{inputItems.map((item: any, index: any) => {
							return (
								<div key={item.id}>
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
										<Input id="institutation" defaultValue={item.institutation} onChange={(e) => onChange(e, index)} />
										{index > 0 && inputItems[index - 1] ? <CloseButton onClick={() => InputDelete(index)} /> : ''}
									</InputGroup>
								</div>
							);
						})}
					</div>
				);
				break;
			case 'skill':
				component = (
					<div>
						{inputItems.map((item: any, index: any) => {
							return (
								<div key={item.id}>
									{index === 0 && (
										<Button className="mb-[10px]" onClick={() => addInput()}>
											추가
										</Button>
									)}
									<InputGroup className={`mb-2 ${index === 0 ? 'pr-[32px]' : ''}`}>
										<InputLeftAddon className="!min-w-[100px]">기술명</InputLeftAddon>
										<Input id="skilName" defaultValue={item.skilName} onChange={(e) => onChange(e, index)} />
										<InputLeftAddon className="!min-w-[100px] ml-[20px]">기술 등급</InputLeftAddon>
										<Input id="skillGrade" defaultValue={item.skillGrade} onChange={(e) => onChange(e, index)} />
										<InputLeftAddon className="!min-w-[100px] ml-[20px]">분류 기준</InputLeftAddon>
										<Input id="criteria" defaultValue={item.criteria} onChange={(e) => onChange(e, index)} />
										{index > 0 && inputItems[index - 1] ? <CloseButton onClick={() => InputDelete(index)} /> : ''}
									</InputGroup>
								</div>
							);
						})}
					</div>
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
