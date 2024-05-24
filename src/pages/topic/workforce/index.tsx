import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { createColumnHelper } from '@tanstack/react-table';
import ColumnsTable from '../../../components/columnsTable';
import { profileList as profileListType } from '../../../network/response/profileList';
import { ProfileService } from '../../../services/profileService';
import useProfile from '../../../store/useProfile';
import Card from '../../../components/card';

const Workforce = () => {
	useQuery('getProfileList', ProfileService().getProfileList);
	const { profileList } = useProfile();
	const columnHelper = createColumnHelper<profileListType>();
	const [search, setSearch] = useState({ option: 'name', input: '' });
	const [filter, setFilter] = useState<any>();
	const [show] = useState(10);

	const addTag = (value: any) => {
		return <p className="text-md font-bold">{value}</p>;
	};

	const columns = [
		columnHelper.accessor('name', {
			id: '이름',
			cell: (info) => addTag(info.getValue()),
			size: 200,
		}),
		columnHelper.accessor('position', {
			id: '직책',
			cell: (info) => addTag(info.getValue()),
			size: 200,
		}),
		columnHelper.accessor('rank', {
			id: '직급',
			cell: (info) => addTag(info.getValue()),
			size: 200,
		}),
		columnHelper.accessor('task', {
			id: '부서',
			cell: (info) => addTag(info.getValue()),
			size: 250,
		}),
		columnHelper.accessor('place', {
			id: '근무지',
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
		{ option: 'rank', value: '직급' },
		{ option: 'task', value: '부서' },
		{ option: 'place', value: '근무지' },
	];

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

	return (
		<div className="mt-5 grid">
			<Card extra="w-full pb-10 p-4 h-full">
				<header className="relative flex items-center justify-between">
					<div className="text-xl font-bold text-navy-700 dark:text-white">인력사항</div>
				</header>

				<ColumnsTable
					columns={columns}
					searchItem={searchItem}
					list={profileList}
					show={show}
					search={search}
					setSearch={setSearch}
					filter={filter}
				/>
			</Card>
		</div>
	);
};

export default Workforce;
