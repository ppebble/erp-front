import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, InputGroup, InputLeftAddon, Textarea, Divider, Table, Card } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GoDot, GoDotFill } from 'react-icons/go';
import { MdOutlineBusiness, MdOutlinePerson, MdOutlinePhoneIphone, MdMailOutline } from 'react-icons/md';
import InputContainer from '../../../components/inputContainer';
import useProject from '../../../store/useProject';
import useModal from '../../../store/useModal';
import { partnerType } from '../../../network/response/projectParams';
import { ProjectService } from '../../../services/projectService';

// 프로젝트 상세보기
const ProjectDetail = () => {
	const { project, projectDetail, setProject, setProjectDetail, setProjectMember, setProjectOutput, setClear } = useProject();
	const navigate = useNavigate();
	const [fileCount, setFileCount] = useState(0);
	const [fileValue, setFileValue] = useState<any>();
	const [memberCount, setMemberCount] = useState(0);
	const [memberValue, setMemberValue] = useState<any>();
	const [slides, setSlides] = useState<any>(null);
	const [swiperSetting, setSwiperSetting] = useState<Swiper | null>(null);
	const [curPage, setCurpage] = useState<number>(0);
	const [partner, setPartner] = useState<string[]>([]);
	const del = ProjectService().delProject;
	const { openModal, closeModal } = useModal();

	const updateProject = () => {
		navigate('/topic/projectModify', { state: { isNew: false } });
	};

	const deleteOk = () => {
		del.mutate({ seqNo: project.projectNo });
		closeModal();
	};

	const deleteProject = () => {
		openModal({ type: 4, contents: `<p className='text-xl'>삭제 하시겠습니까?</p>`, color: 'red', okClick: deleteOk });
	};

	useEffect(() => {
		const splitPartner = project?.partner.split(', ');
		setPartner(splitPartner);
		// return () => setClear();
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
		// setProjectOutput(fileValue);
	}, [fileValue, setProjectOutput]);

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
							<div className="text-xl font-bold text-navy-700">프로젝트 상세보기</div>
						</header>
					</div>
				</div>
				<div className="mt-5 overflow-x-scroll xl:overflow-x-hidden xl:pl-[20%] xl:pr-[20%] md:pl-[10%] md:pr-[10%]">
					{/* project */}
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">프로젝트명</InputLeftAddon>
						<Input id="projectName" className="pointer-events-none" defaultValue={project?.projectName || ''} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">담당자</InputLeftAddon>
						<Input id="managerNo" className="pointer-events-none" defaultValue={project?.manager || ''} />
					</InputGroup>
					<InputGroup className="mb-3">
						<InputLeftAddon className="!min-w-[120px]">시작일</InputLeftAddon>
						<Input id="startDate" className="pointer-events-none" defaultValue={project?.startDate || ''} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">종료일</InputLeftAddon>
						<Input id="endDate" className="pointer-events-none" defaultValue={project?.endDate || ''} />
					</InputGroup>
					<Table className="table-fixed">
						<tbody>
							<tr>
								<td className="!w-full">
									<InputGroup className="mb-2">
										<InputLeftAddon className="!min-w-[120px]">고객사</InputLeftAddon>
										<Input id="client" className="pointer-events-none" defaultValue={project?.client || ''} />
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
										<InputLeftAddon className="!min-w-[120px]">구분</InputLeftAddon>
										<Input id="field" className="pointer-events-none" defaultValue={project?.field || ''} />
									</InputGroup>
								</td>
							</tr>
							<tr>
								<td>
									<InputGroup>
										<InputLeftAddon className="!min-w-[120px]">상태</InputLeftAddon>
										<Input id="status" className="pointer-events-none" defaultValue={project?.status || ''} />
										<InputLeftAddon className="!min-w-[120px] ml-[20px]">단계</InputLeftAddon>
										<Input id="step" className="pointer-events-none" defaultValue={project?.step || ''} />
									</InputGroup>
								</td>
							</tr>
						</tbody>
					</Table>
					<Divider className="my-3" />

					{/* projectDetail */}
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">경로</InputLeftAddon>
						<Input id="projectUrl" className="pointer-events-none" defaultValue={projectDetail?.projectUrl || ''} />
					</InputGroup>
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">VCS</InputLeftAddon>
						<Input id="vcs" className="pointer-events-none" defaultValue={projectDetail?.vcs || ''} />
					</InputGroup>
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">Tech</InputLeftAddon>
						<Input id="tech" className="pointer-events-none" defaultValue={projectDetail?.tech || ''} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">OS</InputLeftAddon>
						<Input id="os" className="pointer-events-none" defaultValue={projectDetail?.os || ''} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">DB</InputLeftAddon>
						<Input id="db" className="pointer-events-none" defaultValue={projectDetail?.db || ''} />
					</InputGroup>
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">WebServer</InputLeftAddon>
						<Input id="webServer" className="pointer-events-none" defaultValue={projectDetail?.webServer || ''} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">WAS</InputLeftAddon>
						<Input id="was" className="pointer-events-none" defaultValue={projectDetail?.was || ''} />
					</InputGroup>
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">Equipment</InputLeftAddon>
						<Input id="equipment" className="pointer-events-none" defaultValue={projectDetail?.equipment || ''} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">Module</InputLeftAddon>
						<Input id="module" className="pointer-events-none" defaultValue={projectDetail?.module || ''} />
					</InputGroup>
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">Libs</InputLeftAddon>
						<Input id="libs" className="pointer-events-none" defaultValue={projectDetail?.libs || ''} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">Tool</InputLeftAddon>
						<Input id="tool" className="pointer-events-none" defaultValue={projectDetail?.tool || ''} />
					</InputGroup>
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px] !h-[200px]">Note</InputLeftAddon>
						<Textarea id="note" className="pointer-events-none !h-[200px]" defaultValue={projectDetail?.note || ''} />
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
						readOnly
					/>

					<Divider className="my-3" />

					{/* 팀원 */}
					<InputContainer count={memberCount} setCount={setMemberCount} setValue={setMemberValue} type="member" readOnly />

					<div className="text-end !mt-[30px]">
						<Button className="w-[150px]" colorScheme="green" onClick={() => updateProject()}>
							수정
						</Button>
						<Button className="w-[150px]" colorScheme="red" ml={3} onClick={() => deleteProject()}>
							삭제
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default ProjectDetail;
