/* eslint-disable */

import { HiX } from 'react-icons/hi';
import Links from './components/Links';
import logo from '../../assets/img/logo/logo.png';
// import SidebarCard from '../../components/sidebar/componentsrtl/SidebarCard';
import routes from '../../routes';

const Sidebar = (props: { open: boolean; onClose: React.MouseEventHandler<HTMLSpanElement> }) => {
	const { open, onClose } = props;
	return (
		<div
			className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
				open ? 'translate-x-0' : '-translate-x-96'
			}`}
		>
			<span className="absolute top-4 right-4 block cursor-pointer xl:hidden" onClick={onClose}>
				<HiX />
			</span>

			<div className={`mx-[28px] mt-[20px] flex items-center`}>
				<img className="h-[75px] w-[246px] rounded-lg" src={logo} alt="" />
			</div>
			<div className="mt-[18px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
			{/* Nav item */}

			<ul className="mb-auto pt-1">
				<Links routes={routes} />
			</ul>

			{/* Free Horizon Card */}
			<div className="flex justify-center">{/* <SidebarCard /> */}</div>

			{/* Nav item end */}
		</div>
	);
};

export default Sidebar;
