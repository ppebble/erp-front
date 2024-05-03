import { useEffect } from 'react';
import { InputGroup, InputLeftAddon, Input, CloseButton, Button, AccordionItem, AccordionButton, Box } from '@chakra-ui/react';
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
	const { careerIndex, setCareerIndex, license } = useProfile();

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
								<div key={`career_${item.id}`}>
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
														defaultValue={item.licenseName}
														onChange={(e) => onChange(e, index)}
													/>
													<InputLeftAddon className="ml-[20px]">직무분류</InputLeftAddon>
													<Input
														id="jobClassification"
														className="!min-w-[100px] !bg-white"
														defaultValue={item.licenseDate}
														onChange={(e) => onChange(e, index)}
													/>
													<InputLeftAddon className="ml-[20px]">입사일</InputLeftAddon>
													<Input
														id="employmentDate"
														className="!min-w-[150px] !bg-white"
														type="date"
														defaultValue={item.licenseDate}
														onChange={(e) => onChange(e, index)}
													/>
													<InputLeftAddon className="ml-[20px]">퇴사일</InputLeftAddon>
													<Input
														id="resignationDate"
														className="!min-w-[150px] !bg-white"
														type="date"
														defaultValue={item.licenseDate}
														onChange={(e) => onChange(e, index)}
													/>
												</InputGroup>
											</Box>
										</AccordionButton>
										<CareerDetail />
									</AccordionItem>
								</div>
							);
						})}
					</>
				);
				break;
			case 'careerDetail':
				component = (
					<>
						{inputItems.map((item: any, index: any) => {
							return (
								<div key={`careerDetail_${careerIndex}_${item.id}`}>
									{index === 0 && (
										<Button className="mb-[10px]" onClick={() => addInput(index)}>
											추가
										</Button>
									)}
									<InputGroup className={`mb-2 ${index === 0 ? 'pr-[32px]' : ''}`}>
										<InputLeftAddon>프로젝트명</InputLeftAddon>
										<Input
											id="projectName"
											className="!min-w-[100px]"
											name={`projectName_${item.id}`}
											defaultValue={item.licenseName}
											onChange={(e) => onChange(e, index)}
										/>
										<InputLeftAddon className="ml-[20px]">수행업무</InputLeftAddon>
										<Input
											id="projectTask"
											className="!min-w-[100px]"
											name={`task_${item.id}`}
											defaultValue={item.licenseDate}
											onChange={(e) => onChange(e, index)}
										/>
										<InputLeftAddon className="ml-[20px]">프로젝트 수행일수</InputLeftAddon>
										<Input
											id="projectTerm"
											className="!min-w-[100px]"
											name={`term_${item.id}`}
											defaultValue={item.licenseDate}
											onChange={(e) => onChange(e, index)}
										/>
										{index > 0 && inputItems[index - 1] ? <CloseButton onClick={() => InputDelete(index)} /> : ''}
									</InputGroup>
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
								<div key={`cursework_${item.id}`}>
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
					</>
				);
				break;
			case 'skill':
				component = (
					<>
						{inputItems.map((item: any, index: any) => {
							return (
								<div key={`skill_${item.id}`}>
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
