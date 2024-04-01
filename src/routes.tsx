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
	// {
	// 	name: '메인화면',
	// 	layout: '/admin',
	// 	path: 'main',
	// 	icon: <MdHome className="h-6 w-6" />,
	// 	child: [
	// 		{
	// 			name: '요약',
	// 			layout: '/admin',
	// 			path: 'main',
	// 			icon: <MdHome className="h-6 w-6" />,
	// 		},
	// 	],
	// },
	{
		name: '인력현황',
		layout: '/admin',
		path: 'profile',
		icon: <MdOutlinePerson className="h-6 w-6" />,
		child: [
			{
				name: '요약통계',
				layout: '/admin',
				path: 'table',
				icon: <MdOutlineAutoGraph className="h-6 w-6" />,
			},
			{
				name: '인력사항',
				layout: '/admin',
				path: 'profile-list',
				icon: <MdOutlinePeople className="h-6 w-6" />,
			},
		],
	},
	{
		name: '사업계획',
		layout: '/admin',
		icon: <MdOutlineBusiness className="h-6 w-6" />,
		path: 'business',
		child: [
			{
				name: '일정표',
				layout: '/admin',
				path: 'calendar',
				icon: <MdOutlineCalendarMonth className="h-6 w-6" />,
			},
			{
				name: '프로젝트',
				layout: '/admin',
				path: 'project',
				icon: <MdOutlineWorkHistory className="h-6 w-6" />,
			},
		],
	},
	{
		name: '물자현황',
		layout: '/admin',
		path: 'equip',
		icon: <MdOutlineLaptopChromebook className="h-6 w-6" />,
		child: [
			{
				name: '물자 현황',
				layout: '/admin',
				path: 'equipment',
				icon: <MdOutlineLaptopChromebook className="h-6 w-6" />,
			},
		],
	},
	{
		name: '게시판',
		layout: '/admin',
		path: 'board',
		icon: <MdOutlineDashboard className="h-6 w-6" />,
		child: [
			{
				name: '회사소식',
				layout: '/admin',
				path: 'news',
				icon: <MdOutlineNewspaper className="h-6 w-6" />,
			},
			{
				name: '세미나',
				layout: '/admin',
				path: 'seminar',
				icon: <MdPeople className="h-6 w-6" />,
			},
			{
				name: '자유게시판',
				layout: '/admin',
				path: 'free-board',
				icon: <MdOutlineComment className="h-6 w-6" />,
			},
			{
				name: '건의사항',
				layout: '/admin',
				path: 'suggestions',
				icon: <MdEmojiPeople className="h-6 w-6" />,
			},
		],
	},
];
export default routes;
