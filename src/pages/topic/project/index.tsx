import { Button, Card, CardBody, CardHeader, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { MdLaptopChromebook } from 'react-icons/md';
import { BsPlusCircle } from 'react-icons/bs';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { ProjectService } from '../../../services/projectService';
import useProject from '../../../store/useProject';
import CustomClickableOneLineWidget from '../../../components/widget/CustomOneLineWidget';
import ColumnsTable from '../../../components/columnsTable';
import { useScroll } from '../../../store/useScroll';

const Project = () => {
	useQuery('projectDetail', ProjectService().projectDetail); // 프로젝트 상세조회
	useQuery('businessDetail', ProjectService().businessDetail); // 연구과제 상세조회

	const navigate = useNavigate();
	const { projectList, businessList, setProjectNo, setBusinessNo, setClearDetailNo, setClear } = useProject();
	const { divHeight } = useScroll();
	const [height, setHeight] = useState(divHeight);
	const [searchProject, setSearchProject] = useState({ option: 'projectName', input: '' }); // 프로젝트 검색
	const [searchbusiness, setSearchbusiness] = useState({ option: 'businessName', input: '' }); // 프로젝트 검색
	const [projectFilter, setProjectFilter] = useState<any>();
	const [businessFilter, setBusinessFilter] = useState<any>();
	const [title, setTitle] = useState('프로젝트');

	const pList = useQuery('projectList', ProjectService().projectList); // 프로젝트 목록 조회
	const bList = useQuery('businessList', ProjectService().businessList); // 연구과제 목록 조회

	const newProject = () => {
		navigate('/topic/projectModify', { state: { isNew: true } });
	};

	const projectClick = (index: number) => {
		setProjectNo(index);
	};

	const businessClick = (index: number) => {
		setBusinessNo(index);
	};

	const projectSearch = [
		{ option: 'projectName', value: '프로젝트명' },
		{ option: 'client', value: '고객사' },
	];

	const businessSearch = [
		{ option: 'businessName', value: '연구과제명' },
		{ option: 'department', value: '담당부서' },
	];

	// 프로젝트 검색
	useEffect(() => {
		switch (searchProject.option) {
			case 'projectName':
				setProjectFilter(projectList.filter((item) => item.projectName?.includes(searchProject.input)));
				break;
			case 'client':
				setProjectFilter(projectList.filter((item) => item.client?.includes(searchProject.input)));
				break;
			default:
				break;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchProject]);

	// 연구과제 검색
	useEffect(() => {
		switch (searchbusiness.option) {
			case 'businessName':
				setBusinessFilter(businessList.filter((item) => item.businessName?.includes(searchbusiness.input)));
				break;
			case 'department':
				setBusinessFilter(businessList.filter((item) => item.department?.includes(searchbusiness.input)));
				break;
			default:
				break;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchbusiness]);

	useEffect(() => {
		setClear();
		return () => setClearDetailNo();
	}, [setClear, setClearDetailNo]);

	useEffect(() => {
		setHeight(divHeight);
	}, [divHeight]);

	return (
		<div className="overflow-auto flex min-h-[950px] min-w-[1000px]" style={{ height: `${height}` }}>
			<div className="mt-3 mr-5 min-w-[200px]">
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
			<div className="grid grid-cols-1 w-full">
				<Card>
					{title === '프로젝트' ? (
						<>
							<header className="relative flex items-center justify-between">
								<div className="text-2xl font-bold text-navy-700 dark:text-white ml-1">프로젝트</div>
								<Button onClick={() => newProject()}>
									<BsPlusCircle className="h-6 w-6 bold" />
								</Button>
							</header>

							<div>
								{pList.isSuccess && (
									<ColumnsTable
										list={projectList}
										show={9}
										isClick
										detailButton={projectClick}
										isSearch
										searchItem={projectSearch}
										search={searchProject}
										setSearch={setSearchProject}
										filter={projectFilter}
										columnsType="card"
										type={title}
									/>
								)}
							</div>
						</>
					) : (
						<>
							<header className="relative flex items-center justify-between">
								<div className="text-2xl font-bold text-navy-700 dark:text-white ml-1">연구과제</div>
								<Button onClick={() => newProject()}>
									<BsPlusCircle className="h-6 w-6 bold" />
								</Button>
							</header>

							<div>
								{bList.isSuccess && (
									<ColumnsTable
										list={businessList}
										show={9}
										isClick
										detailButton={businessClick}
										isSearch
										searchItem={businessSearch}
										search={searchbusiness}
										setSearch={setSearchbusiness}
										filter={businessFilter}
										columnsType="card"
										type={title}
									/>
								)}
							</div>
						</>
					)}
				</Card>
			</div>
		</div>
	);
};

export default Project;
