import { Button, Card, CardBody, CardHeader, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { MdLaptopChromebook } from 'react-icons/md';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { ProjectService } from '../../../services/projectService';
import { ProfileService } from '../../../services/profileService';
import useProject from '../../../store/useProject';
import CustomClickableOneLineWidget from '../../../components/widget/CustomOneLineWidget';
import ColumnsTable from '../../../components/columnsTable';

const Project = () => {
	const list = useQuery('projectList', ProjectService().projectList); // 목록 조회
	useQuery('projectDetail', ProjectService().projectDetail); // 상세조회
	useQuery('getProfileList', ProfileService().getProfileList);
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

						<div className="mx-[3rem] min-w-[600px]">
							{list.isSuccess && (
								<ColumnsTable list={projectList} show={9} isClick isSearch={false} addButton={newProject} detailButton={projectClick} type="card" />
							)}
						</div>
					</>
				) : (
					<>
						<header className="relative flex items-center justify-between">
							<div className="text-xl font-bold text-navy-700 dark:text-white">연구과제</div>
						</header>

						<div className="mx-[3rem] min-w-[600px]">
							{list.isSuccess && (
								<ColumnsTable list={projectList} show={9} isClick isSearch={false} addButton={newProject} detailButton={projectClick} type="card" />
							)}
						</div>
					</>
				)}
			</Card>
		</div>
	);
};

export default Project;
