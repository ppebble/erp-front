import { useEffect, useState } from 'react';
import { Button, Input, InputGroup, InputLeftAddon, Textarea, Divider, Table, Card } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GoDot, GoDotFill } from 'react-icons/go';
import { MdOutlineBusiness, MdOutlinePerson, MdOutlinePhoneIphone, MdMailOutline } from 'react-icons/md';
import InputContainer from '../../../components/inputContainer';
import useProject from '../../../store/useProject';

const ProjectDetail = () => {
	const { project, projectDetail, setProject, setProjectDetail, setProjectMember, setProjectOutput } = useProject();
	const [fileCount, setFileCount] = useState(0);
	const [fileValue, setFileValue] = useState<any>();
	const [memberCount, setMemberCount] = useState(0);
	const [memberValue, setMemberValue] = useState<any>();

	const [slides, setSlides] = useState<any>(null);
	const [swiperSetting, setSwiperSetting] = useState<Swiper | null>(null);
	const [curPage, setCurpage] = useState<number>(0);

	const partnerTest: string[] =
		'ADT캡스:김성우차장:02-3485-9118:sw.kim80@adt.co.kr, ADT캡스:원혁상대리:02-3485-9605:hsweon@adt.co.kr, ADT캡스:장희진차장:02-3485-9174:hjjang@adt.co.kr'.split(
			', ',
		);

	const changeProject = (e: any) => {
		const { targetId, targetValue } = e.target;
		setProject({ ...project, [targetId]: targetValue });
	};

	const changeProjectDetail = (e: any) => {
		const { targetId, targetValue } = e.target;
		setProjectDetail({ ...projectDetail, [targetId]: targetValue });
	};

	const updateProject = () => {
		const param = { project, projectDetail };
		console.log(param);
		// ProjectService().modifyProject.mutateAsync(param);
	};

	const deleteProject = (projectNo: number) => {
		// ProjectService().delProject.mutateAsync(projectNo);
		console.log('deleteProject');
	};

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fileValue]);

	useEffect(() => {
		setProjectMember(memberValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [memberValue]);

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
						<Input id="startDate" onChange={(e) => changeProject(e)} defaultValue={project.startDate || ''} />
						<InputLeftAddon className="!min-w-[120px] ml-[20px]">종료일</InputLeftAddon>
						<Input id="endDate" onChange={(e) => changeProject(e)} defaultValue={project.endDate || ''} />
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
											</div>
											<div className="relative mb-1 flex">
												{swiperSetting && (
													<Swiper {...swiperSetting}>
														{partnerTest.map((item: any, index: any) => {
															return (
																<SwiperSlide className="px-8" key={index}>
																	<li className="my-[3px] flex items-center">
																		<span>
																			<MdOutlineBusiness className="w-[20px] h-[20px]" />
																		</span>
																		<p className="ml-2">{item.split(':')[0]}</p>
																	</li>
																	<li className="my-[3px] flex items-center">
																		<span>
																			<MdOutlinePerson />
																		</span>
																		<p className="ml-2">{item.split(':')[1]}</p>
																	</li>
																	<li className="my-[3px] flex items-center">
																		<span>
																			<MdOutlinePhoneIphone />
																		</span>
																		<p className="ml-2">{item.split(':')[2]}</p>
																	</li>
																	<li className="my-[3px] flex items-center">
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
					{/* 산출물, 팀원 */}
					<InputContainer
						props={{ id: fileCount, eduName: '', eduStartDate: '', eduEndDate: '', institution: '' }}
						count={fileCount}
						setCount={setFileCount}
						setValue={setFileValue}
						type="project"
					/>
					<Divider className="my-3" />
					<InputContainer
						props={{ id: memberCount, member: '', role: '', task: '' }}
						count={memberCount}
						setCount={setMemberCount}
						setValue={setMemberValue}
						type="member"
					/>
					<div className="text-end !mt-[30px]">
						<Button className="w-[150px]" colorScheme="green" onClick={() => updateProject()}>
							수정
						</Button>
						<Button className="w-[150px]" colorScheme="red" ml={3} onClick={() => deleteProject(project.projectNo)}>
							삭제
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default ProjectDetail;
