import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Input, InputGroup, InputLeftAddon, Textarea, Divider, Table, Card, useQuery } from '@chakra-ui/react';
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GoDot, GoDotFill } from 'react-icons/go';
import { MdOutlineBusiness, MdOutlinePerson, MdOutlinePhoneIphone, MdMailOutline } from 'react-icons/md';
import InputContainer from '../../../components/inputContainer';
import useProject from '../../../store/useProject';
import useModal from '../../../store/useModal';
import { partnerType } from '../../../network/response/projectParams';
import { ProjectService } from '../../../services/projectService';

const ProjectDetail = () => {
	const { state } = useLocation();
	const { isNew } = state;
	const { insertProject } = ProjectService();
	const { project, projectDetail, projectMember, projectOutput, setProject, setProjectDetail, setProjectMember, setProjectOutput, setClear } =
		useProject();
	const [fileCount, setFileCount] = useState(0);
	const [fileValue, setFileValue] = useState<any>();
	const [memberCount, setMemberCount] = useState(0);
	const [memberValue, setMemberValue] = useState<any>();
	const [slides, setSlides] = useState<any>(null);
	const [swiperSetting, setSwiperSetting] = useState<Swiper | null>(null);
	const [curPage, setCurpage] = useState<number>(0);
	const [partner, setPartner] = useState<string[]>([]);
	const { openModal, closeModal } = useModal();

	const changeProject = (e: any) => {
		const { id, value } = e.target;
		setProject({ ...project, [id]: value });
	};

	const changeProjectDetail = (e: any) => {
		const { id, value } = e.target;
		setProjectDetail({ ...projectDetail, [id]: value });
	};

	const add = (type: partnerType) => {
		if (project.partner === '') {
			partner[0] = `${type.company}:${type.name}:${type.phone}:${type.email}`;
		} else {
			partner?.push(`${type.company}:${type.name}:${type.phone}:${type.email}`);
			slides.push('swiper-slide px-8 swiper-slide');
		}
		const id: string = 'partner';
		setProject({ ...project, [id]: partner });
		closeModal();
	};

	const addPartner = () => {
		openModal({ type: 0, closeOnOverlay: false, updataClick: add });
	};

	const deletePartner = () => {
		setPartner(partner?.filter((item: any, index: any) => index !== curPage));
		if (partner?.length === curPage + 1) {
			slides.shift();
		} else {
			slides.pop();
		}
	};

	const newProject = () => {
		const param = { project, projectDetail, projectMember, projectOutput };
		insertProject.mutateAsync({ param });
	};

	const updateProject = () => {
		const param = { project, projectDetail, projectMember, projectOutput };
		ProjectService().modifyProject.mutateAsync(param);
	};

	const deleteProject = (projectNo: number) => {
		// ProjectService().delProject.mutateAsync(projectNo);
		console.log('deleteProject');
	};

	useEffect(() => {
		const splitPartner = project?.partner.split(', ');
		setPartner(splitPartner);
		return () => setClear();
	}, [project?.partner, setClear]);

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
		setProjectOutput(fileValue);
	}, [fileValue, setProjectOutput]);

	useEffect(() => {
		setProjectMember(memberValue);
	}, [memberValue, setProjectMember]);

	return (
		<div className="mt-5 grid">
			<Card className="w-full h-full pt-[20px] pb-10 sm:px-[20px]">
				<div className="flex pl-[10%] pr-[20%]">
					<header className="flex mt-[auto] float-left">
						<div className="text-xl font-bold text-navy-700">프로젝트 상세보기</div>
					</header>
				</div>
				<div className="mt-5 overflow-x-scroll xl:overflow-x-hidden min-h-[800px] xl:pl-[10%] xl:pr-[20%] md:pl-[10%] md:pr-[10%]">
					{/* project */}
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">프로젝트명</InputLeftAddon>
						<Input id="projectName" onChange={(e) => changeProject(e)} defaultValue={project.projectName || ''} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">구분</InputLeftAddon>
						<Input id="field" onChange={(e) => changeProject(e)} defaultValue={project.field || ''} />
					</InputGroup>
					<InputGroup className="mb-3">
						<InputLeftAddon className="!min-w-[120px]">시작일</InputLeftAddon>
						<Input id="startDate" type="date" onChange={(e) => changeProject(e)} defaultValue={project.startDate || ''} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">종료일</InputLeftAddon>
						<Input id="endDate" type="date" onChange={(e) => changeProject(e)} defaultValue={project.endDate || ''} />
					</InputGroup>
					<Table className="table-fixed">
						<tbody>
							<tr>
								<td className="!w-full">
									<InputGroup className="mb-2">
										<InputLeftAddon className="!min-w-[120px]">고객사</InputLeftAddon>
										<Input id="client" onChange={(e) => changeProject(e)} defaultValue={project.client || ''} />
									</InputGroup>
								</td>
								<td rowSpan={3} className="w-[400px]">
									<Card className="ml-[20px]" variant="outline">
										<div>
											<div className="flex mt-1 justify-center">
												{slides &&
													slides.map((item: any, index: any) => {
														if (index === curPage) {
															return <GoDotFill className="text-brand-300 h-6 w-6" key={item.className} />;
														}
														return <GoDot className="text-gray-500 h-6 w-6" key={item.className} />;
													})}
												<IoIosAddCircleOutline className="cursor-pointer w-[20px] h-[20px] mt-[1px]" onClick={() => addPartner()} />
												<IoIosRemoveCircleOutline className="cursor-pointer w-[20px] h-[20px] mt-[1px]" onClick={() => deletePartner()} />
											</div>
											<div className="relative mb-1 flex">
												{swiperSetting && (
													<Swiper {...swiperSetting} className="!ml-0 !mr-0">
														{partner &&
															partner.map((item: any, index: any) => {
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
										<InputLeftAddon className="!min-w-[120px]">상태</InputLeftAddon>
										<Input id="status" onChange={(e) => changeProject(e)} defaultValue={project.status || ''} />
									</InputGroup>
								</td>
							</tr>
							<tr>
								<td>
									<InputGroup>
										<InputLeftAddon className="!min-w-[120px]">단계</InputLeftAddon>
										<Input id="step" onChange={(e) => changeProject(e)} defaultValue={project.step || ''} />
									</InputGroup>
								</td>
							</tr>
						</tbody>
					</Table>
					<Divider className="my-3" />

					{/* projectDetail */}
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">경로</InputLeftAddon>
						<Input id="projectUrl" onChange={(e) => changeProjectDetail(e)} defaultValue={projectDetail.projectUrl || ''} />
					</InputGroup>
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">VCS</InputLeftAddon>
						<Input id="vcs" onChange={(e) => changeProjectDetail(e)} defaultValue={projectDetail.vcs || ''} />
					</InputGroup>
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">Tech</InputLeftAddon>
						<Input id="tech" onChange={(e) => changeProjectDetail(e)} defaultValue={projectDetail.tech || ''} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">OS</InputLeftAddon>
						<Input id="os" onChange={(e) => changeProjectDetail(e)} defaultValue={projectDetail.os || ''} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">DB</InputLeftAddon>
						<Input id="db" onChange={(e) => changeProjectDetail(e)} defaultValue={projectDetail.db || ''} />
					</InputGroup>
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">WebServer</InputLeftAddon>
						<Input id="webServer" onChange={(e) => changeProjectDetail(e)} defaultValue={projectDetail.webServer || ''} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">WAS</InputLeftAddon>
						<Input id="was" onChange={(e) => changeProjectDetail(e)} defaultValue={projectDetail.was || ''} />
					</InputGroup>
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">Equipment</InputLeftAddon>
						<Input id="equipment" onChange={(e) => changeProjectDetail(e)} defaultValue={projectDetail.equipment || ''} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">Module</InputLeftAddon>
						<Input id="module" onChange={(e) => changeProjectDetail(e)} defaultValue={projectDetail.module || ''} />
					</InputGroup>
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">Libs</InputLeftAddon>
						<Input id="libs" onChange={(e) => changeProjectDetail(e)} defaultValue={projectDetail.libs || ''} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">Tool</InputLeftAddon>
						<Input id="tool" onChange={(e) => changeProjectDetail(e)} defaultValue={projectDetail.tool || ''} />
					</InputGroup>
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px] !h-[200px]">Note</InputLeftAddon>
						<Textarea id="note" className="!h-[200px]" onChange={(e) => changeProjectDetail(e)} defaultValue={projectDetail.note || ''} />
					</InputGroup>
					<Divider className="my-3" />

					{/* 산출물 */}
					<InputContainer props={{ id: fileCount, file: '' }} count={fileCount} setCount={setFileCount} setValue={setFileValue} type="project" />

					<Divider className="my-3" />

					{/* 팀원 */}
					<InputContainer
						props={{ id: memberCount, member: '', role: '', task: '' }}
						count={memberCount}
						setCount={setMemberCount}
						setValue={setMemberValue}
						type="member"
					/>
					{isNew === 0 ? (
						<div className="text-end !mt-[30px]">
							<Button className="w-[150px]" colorScheme="green" onClick={() => updateProject()}>
								수정
							</Button>
							<Button className="w-[150px]" colorScheme="red" ml={3} onClick={() => deleteProject(project.projectNo)}>
								삭제
							</Button>
						</div>
					) : (
						<div className="text-end !mt-[30px]">
							<Button className="w-[150px]" colorScheme="green" onClick={() => newProject()}>
								등록
							</Button>
						</div>
					)}
				</div>
			</Card>
		</div>
	);
};

export default ProjectDetail;
