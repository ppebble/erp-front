import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Button, Input, InputGroup, InputLeftAddon, Textarea, Divider, Table, Card, Select } from '@chakra-ui/react';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GoDot, GoDotFill } from 'react-icons/go';
import { MdOutlineBusiness, MdOutlinePerson, MdOutlinePhoneIphone, MdMailOutline } from 'react-icons/md';
import InputContainer from '../../../components/inputContainer';
import useProject from '../../../store/useProject';
import useProfile from '../../../store/useProfile';
import useModal from '../../../store/useModal';
import ProfileNumberInput from '../../../components/profileNumberInput';
import { partnerType, projectMember as projectMemberType } from '../../../network/response/projectParams';
import { ProjectService } from '../../../services/projectService';
import { ProfileService } from '../../../services/profileService';

// 프로젝트 추가 / 수정
const ProjectModify = () => {
	useQuery('getProfileList', ProfileService().getProfileList);
	const { project, projectDetail, projectMember, projectOutput, setProject, setProjectDetail, setProjectMember, setProjectOutput } = useProject();
	const navigate = useNavigate();
	const { state } = useLocation();
	const { isNew } = state;
	const insert = ProjectService().insertProject;
	const modify = ProjectService().modifyProject;
	const { openModal, closeModal } = useModal();
	const { profileList } = useProfile();
	const [fileCount, setFileCount] = useState(0);
	const [fileValue, setFileValue] = useState<any>();
	const [memberCount, setMemberCount] = useState(0);
	const [memberValue, setMemberValue] = useState<projectMemberType[]>();
	const [slides, setSlides] = useState<any>(null);
	const [swiperSetting, setSwiperSetting] = useState<Swiper | null>(null);
	const [curPage, setCurpage] = useState<number>(0);
	const [partnerSplit, setPartnerSplit] = useState<string[]>([]);
	const [partner, setPartner] = useState<string>();
	const [selectIndex, setSelectIndex] = useState(0);
	const [search, setSearch] = useState<any>();

	const changeProject = (e: any) => {
		const { id, value } = e.target;
		setProject({ ...project, [id]: value });
	};

	const changeProjectDetail = (e: any) => {
		const { id, value } = e.target;
		setProjectDetail({ ...projectDetail, [id]: value });
	};

	const addPartner = (type: partnerType) => {
		if (project.partner === '') {
			setPartner(`${type.company}:${type.name}:${type.phone}:${type.email}`);
		} else {
			setPartner(partner?.concat(`, ${type.company}:${type.name}:${type.phone}:${type.email}`));
			slides.push('swiper-slide px-8 swiper-slide');
		}
	};

	useEffect(() => {
		if (partner) {
			const id: string = 'partner';
			setProject({ ...project, [id]: partner });

			const splitPartner = partner.split(', ');
			setPartnerSplit(splitPartner);

			closeModal();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [partner]);

	const addClick = () => {
		openModal({ type: 0, closeOnOverlay: false, updataClick: addPartner });
	};

	const deletePartner = () => {
		setPartnerSplit(partnerSplit?.filter((index: any) => index !== curPage));
		if (partnerSplit?.length === curPage + 1) {
			slides.shift();
		} else {
			slides.pop();
		}
	};

	const newProject = () => {
		const param = { project, projectDetail, projectMember, projectOutput: [] };
		const formData = new FormData();
		fileValue.forEach((v: any) => {
			formData.append('uploadFiles', v[0]);
		});
		formData.append('projectDataVo', JSON.stringify(param));

		insert.mutate(formData);
	};

	const updateOk = () => {
		const param = { project, projectDetail, projectMember, projectOutput };
		const formData = new FormData();
		fileValue.forEach((v: any) => {
			formData.append('uploadFiles', v[0]);
		});
		formData.append('projectDataVo', JSON.stringify(param));
		modify.mutate(formData);
		closeModal();
	};

	const updateProject = () => {
		openModal({ type: 4, contents: `<p className='text-xl'>수정 하시겠습니까?</p>`, okClick: updateOk });
	};

	useEffect(() => {
		const splitPartner = project?.partner.split(', ');
		setPartnerSplit(splitPartner);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!swiperSetting) {
			setSwiperSetting({
				scrollbar: { draggable: true, el: null },
				slidesPerView: 'auto',
				onSlideChange: (e) => {
					setCurpage(e.activeIndex);
				},
				onInit: (e) => {
					setSlides(e.slides);
				},
			});
		}
	}, [swiperSetting]);

	useEffect(() => {
		if (memberValue) {
			setProjectMember(memberValue);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [memberValue]);

	return (
		<div className="mt-5 grid">
			<Card className="w-full h-full pt-[20px] pb-10 sm:px-[20px]">
				<div>
					<div className="float-left text-right md:w-[10%] xl:w-[20%]">
						<Button className="mr-[2rem]" onClick={() => navigate('/topic/project')}>
							<ArrowLeftIcon />
						</Button>
					</div>
					<div className="float-left md:pr-[10%] xl:pr-[20%]">
						<header className="flex mt-[auto]">
							<div className="text-xl font-bold text-navy-700">{isNew ? '프로젝트 추가' : '프로젝트 수정'}</div>
						</header>
					</div>
				</div>
				<div className="mt-5 overflow-x-scroll xl:overflow-x-hidden xl:pl-[20%] xl:pr-[20%] md:pl-[10%] md:pr-[10%]">
					{/* project */}
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">프로젝트명</InputLeftAddon>
						<Input id="projectName" onChange={(e) => changeProject(e)} defaultValue={isNew ? '' : project.projectName} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">담당자</InputLeftAddon>
						<ProfileNumberInput id="managerNo" onChange={(e: any) => changeProject(e)} defaultValue={isNew ? '' : project.manager} />
					</InputGroup>
					<InputGroup className="mb-3">
						<InputLeftAddon className="!min-w-[120px]">시작일</InputLeftAddon>
						<Input id="startDate" type="date" onChange={(e) => changeProject(e)} defaultValue={isNew ? '' : project.startDate} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">종료일</InputLeftAddon>
						<Input id="endDate" type="date" onChange={(e) => changeProject(e)} defaultValue={isNew ? '' : project.endDate} />
					</InputGroup>
					<Table className="table-fixed">
						<tbody>
							<tr>
								<td className="!w-full">
									<InputGroup className="mb-2">
										<InputLeftAddon className="!min-w-[120px]">고객사</InputLeftAddon>
										<Input id="client" onChange={(e) => changeProject(e)} defaultValue={isNew ? '' : project.client} />
									</InputGroup>
								</td>
								<td rowSpan={3} className="w-[400px]">
									<Card className="ml-[20px]" variant="outline">
										<div>
											<div className="flex mt-1 justify-center">
												{slides &&
													slides.map((item: any, index: any) => {
														if (index === curPage) {
															return <GoDotFill className={`text-brand-300 h-6 w-6 ${slides.length === 1 && 'invisible'}`} key={item.className} />;
														}
														return <GoDot className="text-gray-500 h-6 w-6" key={item.className} />;
													})}
												<IoIosAddCircleOutline className="cursor-pointer w-[20px] h-[20px] mt-[1px]" onClick={() => addClick()} />
												<IoIosRemoveCircleOutline className="cursor-pointer w-[20px] h-[20px] mt-[1px]" onClick={() => deletePartner()} />
											</div>
											<div className="relative mb-1 flex">
												{swiperSetting && (
													<Swiper {...swiperSetting} className="!ml-0 !mr-0">
														{partnerSplit &&
															partnerSplit.map((item: any, index: any) => {
																return (
																	<SwiperSlide className="px-8" key={index}>
																		<li className="my-[5px] flex">
																			<span>
																				<MdOutlineBusiness />
																			</span>
																			<p className="ml-2">{item.split(':')[0]}</p>
																		</li>
																		<li className="my-[5px] flex">
																			<span>
																				<MdOutlinePerson />
																			</span>
																			<p className="ml-2">{item.split(':')[1]}</p>
																		</li>
																		<li className="my-[5px] flex">
																			<span>
																				<MdOutlinePhoneIphone />
																			</span>
																			<p className="ml-2">{item.split(':')[2]}</p>
																		</li>
																		<li className="my-[5px] flex">
																			<span>
																				<MdMailOutline />
																			</span>
																			<p className="ml-2">{item.split(':')[3]}</p>
																		</li>
																	</SwiperSlide>
																);
															})}
													</Swiper>
												)}
											</div>
										</div>
									</Card>
								</td>
							</tr>
							<tr>
								<td>
									<InputGroup className="mb-2">
										<InputLeftAddon className="!min-w-[120px]">구분</InputLeftAddon>
										<Input id="field" onChange={(e) => changeProject(e)} defaultValue={isNew ? '' : project.field} />
									</InputGroup>
								</td>
							</tr>
							<tr>
								<td>
									<InputGroup>
										<InputLeftAddon className="!min-w-[120px]">상태</InputLeftAddon>
										<Select id="status" className="!min-w-[150px]" onChange={(e) => changeProject(e)} defaultValue={isNew ? '-' : project.status}>
											<option value="-">-</option>
											<option value="완료">완료</option>
											<option value="개발 진행">개발 진행</option>
											<option value="운영 진행">운영 진행</option>
											<option value="완료">완료</option>
											<option value="유예">유예</option>
											<option value="연구과제">연구과제</option>
										</Select>
										<InputLeftAddon className="!min-w-[120px] ml-[20px]">단계</InputLeftAddon>
										<Select id="step" className="!min-w-[150px]" onChange={(e) => changeProject(e)} defaultValue={isNew ? '-' : project.step}>
											<option value="-">-</option>
											<option value="요구사항분석">요구사항분석</option>
											<option value="설계">설계</option>
											<option value="개발">개발</option>
											<option value="단위테스트">단위테스트</option>
											<option value="통합테스트">통합테스트</option>
											<option value="인수">인수</option>
										</Select>
									</InputGroup>
								</td>
							</tr>
						</tbody>
					</Table>
					<Divider className="my-3" />

					{/* projectDetail */}
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">경로</InputLeftAddon>
						<Input id="projectUrl" onChange={(e) => changeProjectDetail(e)} defaultValue={isNew ? '' : projectDetail.projectUrl} />
					</InputGroup>
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">VCS</InputLeftAddon>
						<Input id="vcs" onChange={(e) => changeProjectDetail(e)} defaultValue={isNew ? '' : projectDetail.vcs} />
					</InputGroup>
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">Tech</InputLeftAddon>
						<Input id="tech" onChange={(e) => changeProjectDetail(e)} defaultValue={isNew ? '' : projectDetail.tech} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">OS</InputLeftAddon>
						<Input id="os" onChange={(e) => changeProjectDetail(e)} defaultValue={isNew ? '' : projectDetail.os} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">DB</InputLeftAddon>
						<Input id="db" onChange={(e) => changeProjectDetail(e)} defaultValue={isNew ? '' : projectDetail.db} />
					</InputGroup>
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">WebServer</InputLeftAddon>
						<Input id="webServer" onChange={(e) => changeProjectDetail(e)} defaultValue={isNew ? '' : projectDetail.webServer} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">WAS</InputLeftAddon>
						<Input id="was" onChange={(e) => changeProjectDetail(e)} defaultValue={isNew ? '' : projectDetail.was} />
					</InputGroup>
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">Equipment</InputLeftAddon>
						<Input id="equipment" onChange={(e) => changeProjectDetail(e)} defaultValue={isNew ? '' : projectDetail.equipment} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">Module</InputLeftAddon>
						<Input id="module" onChange={(e) => changeProjectDetail(e)} defaultValue={isNew ? '' : projectDetail.module} />
					</InputGroup>
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">Libs</InputLeftAddon>
						<Input id="libs" onChange={(e) => changeProjectDetail(e)} defaultValue={isNew ? '' : projectDetail.libs} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">Tool</InputLeftAddon>
						<Input id="tool" onChange={(e) => changeProjectDetail(e)} defaultValue={isNew ? '' : projectDetail.tool} />
					</InputGroup>
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px] !h-[200px]">Note</InputLeftAddon>
						<Textarea id="note" className="!h-[200px]" onChange={(e) => changeProjectDetail(e)} defaultValue={isNew ? '' : projectDetail.note} />
					</InputGroup>
					<Divider className="my-3" />

					{/* 산출물 */}
					<InputContainer
						props={{ id: fileCount }}
						count={fileCount}
						setCount={setFileCount}
						setValue={setFileValue}
						type="attachment"
						style={'project' || ''}
					/>

					<Divider className="my-3" />

					{/* 팀원 */}
					<InputContainer
						props={{ id: memberCount, profileNo: '', member: '', role: '', task: '' }}
						count={memberCount}
						setCount={setMemberCount}
						setValue={setMemberValue}
						setIndex={setSelectIndex}
						type="member"
					/>

					{isNew ? (
						<div className="text-end !mt-[30px]">
							<Button className="w-[150px]" colorScheme="green" onClick={() => newProject()}>
								등록
							</Button>
						</div>
					) : (
						<div className="text-end !mt-[30px]">
							<Button className="w-[150px]" colorScheme="green" onClick={() => updateProject()}>
								수정
							</Button>
						</div>
					)}
				</div>
			</Card>
		</div>
	);
};

export default ProjectModify;
