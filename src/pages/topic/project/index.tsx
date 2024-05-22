import { Card, CardBody, CardHeader, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { ProjectService } from '../../../services/projectService';
import useProject from '../../../store/useProject';
import useModal from '../../../store/useModal';

const Project = () => {
	const { isSuccess } = useQuery('projectList', ProjectService().projectList); // 조회
	useQuery('projectDetail', ProjectService().projectDetail);

	const { projectList, setProjectNo, setClear } = useProject();
	// const [size, setSize] = useState<string>(window.innerWidth < 1441 ? '300px' : '500px');
	const { openModal, closeModal } = useModal();

	const cardClick = (index: number) => {
		setProjectNo(index);
		openModal({ type: 9, closeOnOverlay: false });
	};

	useEffect(() => {
		// const changeSize = () => {
		// 	window.innerWidth < 1441 ? setSize('300px') : setSize('500px');
		// };
		// window.addEventListener('resize', changeSize);
		// return () => window.removeEventListener('resize', changeSize);
		return () => setClear();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="mt-5 grid">
			<Card className="w-full pb-10 p-4 h-full">
				<header className="relative flex items-center justify-between">
					<div className="text-xl font-bold text-navy-700 dark:text-white">프로젝트</div>
				</header>
				<div className="mt-8 overflow-x-scroll xl:overflow-x-hidden h-full">
					<SimpleGrid spacing={10} templateColumns="repeat(auto-fill, minmax(500px, 1fr))">
						{isSuccess
							? projectList.map((item) => (
									<Card key={item.projectNo} variant="outline" className="cursor-pointer" onClick={() => cardClick(item.projectNo)}>
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
			</Card>
		</div>
	);
};

export default Project;
