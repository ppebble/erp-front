import {
	MdHome,
	MdOutlineShoppingCart,
	MdPerson,
	MdEmojiPeople,
	MdOutlinePeople,
	MdOutlineAutoGraph,
	MdOutlineLaptopChromebook,
	MdOutlineWorkHistory,
	MdOutlineCalendarMonth,
	MdOutlineBusiness,
	MdOutlineCommute,
	MdOutlineComment,
	MdOutlineNewspaper,
	MdPeople,
	MdOutlineDashboard,
	MdOutlinePerson,
} from 'react-icons/md';

const routes = [
	{
		name: '인력현황',
		layout: '/erp',
		path: 'profile',
		icon: <MdOutlinePerson className="h-6 w-6" />,
		child: [
			{
				name: '요약통계',
				layout: '/erp',
				path: 'summary',
				icon: <MdOutlineAutoGraph className="h-6 w-6" />,
			},
			{
				name: '인력사항',
				layout: '/erp',
				path: 'workforce',
				icon: <MdOutlinePeople className="h-6 w-6" />,
			},
		],
	},
	{
		name: '사업계획',
		layout: '/erp',
		icon: <MdOutlineBusiness className="h-6 w-6" />,
		path: 'business',
		child: [
			{
				name: '일정표',
				layout: '/erp',
				path: 'calendar',
				icon: <MdOutlineCalendarMonth className="h-6 w-6" />,
			},
			{
				name: '프로젝트',
				layout: '/erp',
				path: 'project',
				icon: <MdOutlineWorkHistory className="h-6 w-6" />,
			},
		],
	},
	// {
	// 	name: '물자현황',
	// 	layout: '/erp',
	// 	path: 'equipment',
	// 	icon: <MdOutlineLaptopChromebook className="h-6 w-6" />,
	// },
	{
		name: '게시판',
		layout: '/erp',
		path: 'board',
		icon: <MdOutlineDashboard className="h-6 w-6" />,
		child: [
			{
				name: '회사소식',
				layout: '/erp',
				path: 'news',
				icon: <MdOutlineNewspaper className="h-6 w-6" />,
			},
			{
				name: '세미나',
				layout: '/erp',
				path: 'seminar',
				icon: <MdPeople className="h-6 w-6" />,
			},
			{
				name: '자유게시판',
				layout: '/erp',
				path: 'board',
				icon: <MdOutlineComment className="h-6 w-6" />,
			},
			{
				name: '건의사항',
				layout: '/erp',
				path: 'suggestions',
				icon: <MdEmojiPeople className="h-6 w-6" />,
			},
		],
	},
];
export default routes;
