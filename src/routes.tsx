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
		icon: <MdHome className="h-6 w-6" />,
	},
	{
		name: '인력현황',
		layout: '/topic',
		path: 'profile',
		icon: <MdOutlinePerson className="h-6 w-6" />,
		child: [
			{
				name: '요약통계',
				layout: '/topic',
				path: 'summary',
				icon: <MdOutlineAutoGraph className="h-6 w-6" />,
			},
			{
				name: '인력사항',
				layout: '/topic',
				path: 'workforce',
				icon: <MdOutlinePeople className="h-6 w-6" />,
			},
		],
	},
	{
		name: '사업계획',
		layout: '/topic',
		path: 'business',
		icon: <MdOutlineBusiness className="h-6 w-6" />,
		child: [
			{
				name: '일정표',
				layout: '/topic',
				path: 'calendar',
				icon: <MdOutlineCalendarMonth className="h-6 w-6" />,
			},
			{
				name: '프로젝트',
				layout: '/topic',
				path: 'project',
				icon: <MdOutlineWorkHistory className="h-6 w-6" />,
			},
		],
	},
	{
		name: '물자현황',
		layout: '/topic',
		path: 'equipment',
		icon: <MdOutlineLaptopChromebook className="h-6 w-6" />,
	},
	{
		name: '게시판',
		layout: '/topic',
		path: 'notices',
		icon: <MdOutlineDashboard className="h-6 w-6" />,
		child: [
			{
				name: '회사소식',
				layout: '/topic',
				path: 'news',
				icon: <MdOutlineNewspaper className="h-6 w-6" />,
			},
			{
				name: '세미나',
				layout: '/topic',
				path: 'seminar',
				icon: <MdPeople className="h-6 w-6" />,
			},
			{
				name: '자유게시판',
				layout: '/topic',
				path: 'board',
				icon: <MdOutlineComment className="h-6 w-6" />,
			},
			{
				name: '건의사항',
				layout: '/topic',
				path: 'suggestions',
				icon: <MdEmojiPeople className="h-6 w-6" />,
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
			{
				name: '외부 연차 승인 관리',
				layout: '/external',
				path: 'mailAccept/MJeRClvSgbGHucCTQhnS9aOVFyVcMhr8XF1enQ04ESaxrw0rKersB7%2BABHHzpkCj1c9k3AxydtVeAEwd2VcYK3n3Cvuv8KwlprCBbt0gKnu8mcAGr49YZTMULQ28d5rPLU7y7hnVMCteb6CQnLZ1Pwv8Bc18j3P4A6cocdo6ST%2BDPrC8pdN0KJlLsbivjBosqIjn8ToKeniAeeTHW0SCkedKckcUH2NN8%2BD5h8OxN4zswwR85z2lpWpOToKenlg1QIjua9KHYcM8NBMxSIEm3UB3qnJtMEwgJZ9SbcNlkX0Yp7Bqi5ULjuoqhOpJTyYLToKen54bwZYrTLACzdToKents0FpzEmrOCYgX1JTUL2FvQ06gNzkTA9HMgvKm4d5zvL8HPGx1WgsKugG8IuFtcaErooO3A3qv7ToKenGcw%3D%3D',
				icon: <MdOutlineWorkHistory className="h-6 w-6" />,
			},
		],
	},
];
export default routes;
