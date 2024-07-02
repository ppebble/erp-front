import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Card } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import ColumnsTable from '../../../components/columnsTable';
import { profileList as profileListType } from '../../../network/response/profileList';
import { ProfileService } from '../../../services/profileService';
import useProfile from '../../../store/useProfile';
import { useScroll } from '../../../store/useScroll';

const Workforce = () => {
	const { isSuccess } = useQuery('getProfileList', ProfileService().getProfileList);
	const { profileList, search, setSearch, setClearSearch } = useProfile();
	const { divHeight } = useScroll();
	const [height, setHeight] = useState(divHeight);
	const columnHelper = createColumnHelper<profileListType>();
	const [filter, setFilter] = useState<any>();
	const [show, setShow] = useState(10);
	const addTag = (value: any) => {
		return <p className="text-md font-bold">{value}</p>;
	};

	const columns = [
		columnHelper.accessor('name', {
			id: '이름',
			cell: (info) => addTag(info.getValue()),
			size: 200,
		}),
		columnHelper.accessor('task', {
			id: '부서',
			cell: (info) => addTag(info.getValue()),
			size: 250,
		}),
		columnHelper.accessor('rank', {
			id: '직급',
			cell: (info) => addTag(info.getValue()),
			size: 200,
		}),
		columnHelper.accessor('userEmail', {
			id: '이메일',
			cell: (info) => addTag(`${info.getValue()}@nexmore.co.kr`),
			size: 300,
		}),
	];

	const searchItem = [
		{ option: 'name', value: '이름' },
		{ option: 'task', value: '부서' },
		{ option: 'rank', value: '직급' },
		{ option: 'userEmail', value: '이메일' },
	];

	useEffect(() => {
		if (!search.input) {
			setSearch({ option: 'name', input: '' });
		}
		return () => setClearSearch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		switch (search.option) {
			case 'name':
				setFilter(profileList.filter((item) => item.name.includes(search.input)));
				break;
			case 'position':
				setFilter(profileList.filter((item) => item.position.includes(search.input)));
				break;
			case 'rank':
				setFilter(profileList.filter((item) => item.rank.includes(search.input)));
				break;
			case 'task':
				setFilter(profileList.filter((item) => item.task.includes(search.input)));
				break;
			case 'place':
				setFilter(profileList.filter((item) => item.place.includes(search.input)));
				break;
			default:
				break;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		setHeight(divHeight);
	}, [divHeight]);

	return (
		<div className="overflow-auto flex min-h-[800px]" style={{ height: `${height}` }}>
			<Card className="sm:!px-[5%] md:!px-[10%] xl:!px-[20%]">
				<header className="relative flex items-center justify-between">
					<div className="text-2xl font-bold text-navy-700 dark:text-white ml-1">인력사항</div>
				</header>

				{isSuccess && (
					<ColumnsTable
						columns={columns}
						list={profileList}
						show={show}
						isClick={false}
						isSearch
						searchItem={searchItem}
						search={search}
						setSearch={setSearch}
						filter={filter}
						minH={40}
						columnsType="table"
					/>
				)}
			</Card>
		</div>
	);
};

export default Workforce;
