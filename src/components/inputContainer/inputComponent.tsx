import { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
	Tag,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import useProfile from '../../store/useProfile';
import useProject from '../../store/useProject';
import ProfileNumberInput from '../profileNumberInput';

type InputComponentprops = {
	inputItems: any;
	addInput: any;
	addDetail: any;
	InputDelete: (id: number) => void;
	detailDelete?: (id: number) => void;
	onChange: (e: any, id: any) => void;
	onFileChange?: (e: any, id: any) => void;
	onDetailChange?: (e: any, id: any) => void;
	type: string;
	style?: string;
	readOnly?: boolean;
};

const InputComponent = ({
	inputItems,
	addInput,
	addDetail,
	InputDelete,
	detailDelete,
	onChange,
	onFileChange,
	onDetailChange,
	type,
	style,
	readOnly,
}: InputComponentprops) => {
	const { careerIndex, setCareerIndex } = useProfile();
	const { project, projectOutput, setProjectOutput, projectMember } = useProject();

	const changeSelect = (index: number) => {
		setCareerIndex(index);
	};

	const removeFile = (idx: number) => {
		setProjectOutput(projectOutput.filter((index: any) => index !== idx));
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
																name={`projectName_${detailIndex}_${detailItem.id}`}
																defaultValue={detailItem.projectName}
																onChange={(e) => onDetailChange && onDetailChange(e, detailIndex)}
															/>
															<InputLeftAddon className="ml-[20px]">수행업무</InputLeftAddon>
															<Input
																id="task"
																className="!min-w-[100px]"
																name={`task_${detailIndex}_${detailItem.id}`}
																defaultValue={detailItem.task}
																onChange={(e) => onDetailChange && onDetailChange(e, detailIndex)}
															/>
															<InputLeftAddon className="ml-[20px]">프로젝트 수행일수</InputLeftAddon>
															<Input
																id="term"
																className="!min-w-[100px]"
																name={`term_${detailIndex}_${detailItem.id}`}
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
			case 'attachment':
				component = (
					<>
						<div>
							<Flex className="mb-[10px] flex">
								<Tag size="lg" variant="subtle" colorScheme="gray" className="border border-inherit w-[100px]">
									산출물
								</Tag>
								<Spacer />
								{!readOnly && <Button onClick={() => addInput()}>추가</Button>}
							</Flex>
						</div>
						{projectOutput?.length >= 1 ? (
							projectOutput.map((item: any, index: any) => {
								return (
									<div key={`attachment_${item?.id ? item?.id : item?.fileNo}`} className="my-[2px]">
										<InputGroup className="mb-2">
											{readOnly ? (
												<Link
													to={`${import.meta.env.VITE_TEST_URL2}/api/file/downloadFile/project/${project?.projectNo}/${projectOutput[index]?.outputNo}`}
													className="float-left"
													download
													target="_self"
												>
													{projectOutput[index].fileName}
													<DownloadIcon className="ml-[10px]" />
												</Link>
											) : (
												<>
													<p>{projectOutput[index].fileName}</p>
													<Spacer />
													<CloseButton className="float-left" onClick={() => removeFile(index)} />
												</>
											)}
										</InputGroup>
									</div>
								);
							})
						) : (
							<p>{readOnly ? '첨부파일이 없습니다.' : ''}</p>
						)}
						{!readOnly &&
							inputItems.map((item: any, index: any) => {
								return (
									<div key={`attachment_${item?.id ? item?.id : item?.fileNo}`} className="my-[2px]">
										<InputGroup className="mb-2">
											<Input name={`file_${item.id}`} type="file" onChange={(e) => onFileChange && onFileChange(e.target.files, index)} />
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
								<Tag size="lg" variant="subtle" colorScheme="gray" className="border border-inherit w-[100px]">
									팀원
								</Tag>
								<Spacer />
								{!readOnly && <Button onClick={() => addInput()}>추가</Button>}
							</Flex>
						</div>
						{inputItems.map((item: any, index: any) => {
							return (
								<div key={`member_${item?.id ? item?.id : item?.memberNo}`}>
									<InputGroup className="mb-2">
										<InputLeftAddon className="!min-w-[100px]">이름</InputLeftAddon>
										<ProfileNumberInput id="profileNo" onChange={(e: any) => onChange(e, index)} index={index} defaultValue={item?.member || ''} />
										{/* <Input
											id="member"
											className={`${readOnly && 'pointer-events-none'}`}
											defaultValue={item?.member || ''}
											onChange={(e) => onChange(e, index)}
										/> */}
										<InputLeftAddon className="!min-w-[100px] ml-[20px]">직책</InputLeftAddon>
										<Input
											id="role"
											className={`${readOnly && 'pointer-events-none'}`}
											defaultValue={item?.role || ''}
											onChange={(e) => onChange(e, index)}
										/>
										<InputLeftAddon className="!min-w-[100px] ml-[20px]">업무</InputLeftAddon>
										<Input
											id="task"
											className={`${readOnly && 'pointer-events-none'}`}
											defaultValue={item?.task || ''}
											onChange={(e) => onChange(e, index)}
										/>
										{!readOnly && <CloseButton onClick={() => InputDelete(index)} />}
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
