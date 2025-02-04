import {
	MdHome,
	MdEmojiPeople,
	MdOutlinePeople,
	MdOutlineAutoGraph,
	MdOutlineLaptopChromebook,
	MdOutlineWorkHistory,
	MdOutlineCalendarMonth,
	MdOutlineBusiness,
	MdOutlineComment,
	MdOutlineNewspaper,
	MdPeople,
	MdOutlineDashboard,
	MdOutlinePerson,
} from 'react-icons/md';

const routes = [
	{
		name: '대시보드',
		layout: '/topic',
		path: 'dashboard',
		icon: <MdHome className="h-8 w-8" />,
	},
	{
		name: '인력현황',
		layout: '/topic',
		path: 'profile',
		icon: <MdOutlinePerson className="h-8 w-8" />,
		child: [
			{
				name: '요약통계',
				layout: '/topic',
				path: 'summary',
				icon: <MdOutlineAutoGraph className="h-7 w-7" />,
			},
			{
				name: '인력사항',
				layout: '/topic',
				path: 'workforce',
				icon: <MdOutlinePeople className="h-7 w-7" />,
			},
		],
	},
	{
		name: '사업계획',
		layout: '/topic',
		path: 'business',
		icon: <MdOutlineBusiness className="h-8 w-8" />,
		child: [
			{
				name: '일정표',
				layout: '/topic',
				path: 'calendar',
				icon: <MdOutlineCalendarMonth className="h-7 w-7" />,
			},
			{
				name: '프로젝트',
				layout: '/topic',
				path: 'project',
				icon: <MdOutlineWorkHistory className="h-7 w-7" />,
			},
		],
	},
	{
		name: '물자현황',
		layout: '/topic',
		path: 'equipment',
		icon: <MdOutlineLaptopChromebook className="h-8 w-8" />,
	},
	{
		name: '게시판',
		layout: '/topic',
		path: 'notices',
		icon: <MdOutlineDashboard className="h-8 w-8" />,
		child: [
			{
				name: '회사소식',
				layout: '/topic',
				path: 'news',
				icon: <MdOutlineNewspaper className="h-7 w-7" />,
			},
			{
				name: '세미나',
				layout: '/topic',
				path: 'seminar',
				icon: <MdPeople className="h-7 w-7" />,
			},
			{
				name: '자유게시판',
				layout: '/topic',
				path: 'free',
				icon: <MdOutlineComment className="h-7 w-7" />,
			},
			{
				name: '공지사항',
				layout: '/topic',
				path: 'notice',
				icon: <MdEmojiPeople className="h-7 w-7" />,
			},
		],
	},
	{
		name: '관리자',
		layout: '/admin',
		path: 'admin',
		icon: <MdOutlineBusiness className="h-6 w-6" />,
		child: [
			{
				name: '연차 승인 관리',
				layout: '/admin',
				path: 'annualManage',
				icon: <MdOutlineCalendarMonth className="h-6 w-6" />,
			},
		],
	},
];
export default routes;
