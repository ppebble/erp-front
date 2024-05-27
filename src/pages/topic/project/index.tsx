import { Card, CardBody, CardHeader, Heading, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { MdLaptopChromebook } from 'react-icons/md';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { ProjectService } from '../../../services/projectService';
import useProject from '../../../store/useProject';
import useModal from '../../../store/useModal';
import CustomClickableOneLineWidget from '../../../components/widget/CustomOneLineWidget';

const Project = () => {
	const list = useQuery('projectList', ProjectService().projectList); // 조회
	useQuery('projectDetail', ProjectService().projectDetail);
	const navigate = useNavigate();
	const { projectList, setProjectNo, setClear } = useProject();
	const [title, setTitle] = useState('프로젝트');

	const projectClick = (index: number) => {
		setProjectNo(index);
	};

	const researchClick = (index: number) => {
		console.log(index);
	};

	useEffect(() => {
		return () => setClear();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="flex grid grid-cols-12 min-h-[45rem]">
			<div className="mt-3 mr-5 col-span-2">
				<CustomClickableOneLineWidget
					icon={<MdLaptopChromebook className="h-7 w-7" />}
					title="프로젝트"
					onClickHandler={() => {
						setTitle('프로젝트');
					}}
					selectedTitle={title}
				/>
				<CustomClickableOneLineWidget
					icon={<HiOutlineDesktopComputer className="h-6 w-6" />}
					title="연구과제"
					onClickHandler={() => {
						setTitle('연구과제');
					}}
					selectedTitle={title}
				/>
			</div>
			<div className="mt-5 grid grid-cols-1 col-span-10">
				<Card className="w-full pb-10 p-4 h-full">
					{title === '프로젝트' ? (
						<>
							<header className="relative flex items-center justify-between">
								<div className="text-xl font-bold text-navy-700 dark:text-white">프로젝트</div>
							</header>

							<div className="mt-8 mx-[3rem] min-h-[600px]">
								<SimpleGrid spacing={10} templateColumns="repeat(auto-fill, minmax(500px, 1fr))">
									{list.isSuccess
										? projectList.map((item) => (
												<Card key={item.projectNo} variant="outline" className="cursor-pointer" onClick={() => projectClick(item.projectNo)}>
													<CardHeader>
														<Heading size="md"> {item.projectName}</Heading>
													</CardHeader>
													<CardBody>
														<Text>고객사 : {item.client}</Text>
														<Text>파트너 : {item.partner}</Text>
														<Text>상태 : {item.status}</Text>
														<Text>단계 : {item.step}</Text>
														<Text>시작일 : {item.startDate}</Text>
														<Text>종료일 : {item.endDate}</Text>
													</CardBody>
												</Card>
											))
										: ''}
								</SimpleGrid>
							</div>
						</>
					) : (
						<>
							<header className="relative flex items-center justify-between">
								<div className="text-xl font-bold text-navy-700 dark:text-white">연구과제</div>
							</header>

							<div className="mt-8 mx-[3rem] min-h-[600px]">
								<SimpleGrid spacing={10} templateColumns="repeat(auto-fill, minmax(500px, 1fr))">
									{list.isSuccess
										? projectList.map((item) => (
												<Card key={item.projectNo} variant="outline" className="cursor-pointer" onClick={() => researchClick(item.projectNo)}>
													<CardHeader>
														<Heading size="md"> {item.projectName}</Heading>
													</CardHeader>
													<CardBody>
														<Text>고객사 : {item.client}</Text>
														<Text>파트너 : {item.partner}</Text>
														<Text>상태 : {item.status}</Text>
														<Text>단계 : {item.step}</Text>
														<Text>시작일 : {item.startDate}</Text>
														<Text>종료일 : {item.endDate}</Text>
													</CardBody>
												</Card>
											))
										: ''}
								</SimpleGrid>
							</div>
						</>
					)}
				</Card>
			</div>
		</div>
	);
};

export default Project;
