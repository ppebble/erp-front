import { Button, Card, CardBody, CardHeader, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { MdLaptopChromebook } from 'react-icons/md';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { ProjectService } from '../../../services/projectService';
import useProject from '../../../store/useProject';
import CustomClickableOneLineWidget from '../../../components/widget/CustomOneLineWidget';

const Project = () => {
	const list = useQuery('projectList', ProjectService().projectList); // 목록 조회
	useQuery('projectDetail', ProjectService().projectDetail); // 상세조회
	const navigate = useNavigate();
	const { projectList, setProjectNo, setClearProjectNo, setClear } = useProject();
	const [title, setTitle] = useState('프로젝트');

	const newProject = () => {
		navigate('/topic/projectModify', { state: { isNew: true } });
	};

	const projectClick = (index: number) => {
		setProjectNo(index);
	};

	const researchClick = (index: number) => {
		console.log(index);
	};

	useEffect(() => {
		setClear();
		return () => setClearProjectNo();
	}, [setClear, setClearProjectNo]);

	return (
		<div className="flex">
			<div className="mt-5 mr-5 min-w-[13rem]">
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
			<Card className="mt-5 w-full pb-10 p-4 h-full">
				{title === '프로젝트' ? (
					<>
						<header className="relative flex items-center justify-between">
							<div className="text-xl font-bold text-navy-700 dark:text-white">프로젝트</div>
						</header>

						<Button
							className="!w-[10rem]"
							onClick={() => {
								newProject();
							}}
						>
							등록
						</Button>

						<div className="mt-8 mx-[3rem] min-w-[600px]">
							<SimpleGrid columns={3} spacing={10}>
								{list.isSuccess
									? projectList.map((item) => (
											<Card
												key={item.projectNo}
												variant="outline"
												className="cursor-pointer !min-w-[200px]"
												onClick={() => projectClick(item.projectNo)}
											>
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
							<SimpleGrid columns={3} spacing={10} templateColumns="repeat(auto-fill, minmax(500px, 1fr))">
								{list.isSuccess &&
									projectList.map((item) => (
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
									))}
							</SimpleGrid>
						</div>
					</>
				)}
			</Card>
		</div>
	);
};

export default Project;
