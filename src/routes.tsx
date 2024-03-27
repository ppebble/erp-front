import { MdHome, MdOutlineShoppingCart, MdBarChart, MdPerson, MdLock } from 'react-icons/md';

const routes = [
	{
		name: '메인화면',
		layout: '/admin',
		path: 'main',
		icon: <MdHome className="h-6 w-6" />,
	},
	{
		name: 'NFT Marketplace',
		layout: '/admin',
		path: 'nft',
		icon: <MdOutlineShoppingCart className="h-6 w-6" />,
	},
	{
		name: 'Data Tables',
		layout: '/admin',
		icon: <MdBarChart className="h-6 w-6" />,
		path: 'table',
	},
	{
		name: 'Profile',
		layout: '/admin',
		path: 'profile',
		icon: <MdPerson className="h-6 w-6" />,
	},
];
export default routes;
