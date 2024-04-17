import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiAlignJustify } from 'react-icons/fi';
import { BsArrowBarUp } from 'react-icons/bs';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import { IoMdNotificationsOutline, IoMdInformationCircleOutline } from 'react-icons/io';
import navbarimage from '../../assets/img/layout/Navbar.png';
import Dropdown from '../dropdown';
import avatar from '../../assets/img/avatars/avatar4.png';

const Navbar = (props: { onOpenSidenav: () => void }) => {
	const { onOpenSidenav } = props;
	const [darkMode, setDarkMode] = useState(false);
	const navigate = useNavigate();

	const myProfile = () => {
		navigate('signup');
	};

	return (
		<nav
			className="sticky top-0 z-40 flex flex-row flex-wrap items-center justify-between ml-[-15px] mr-[-8px] bg-white p-2 backdrop-blur-xl dark:bg-[#0b14374d]"
			style={{ boxShadow: ' 0 2px 2px -2px gray' }}
		>
			{/* 사이드바 (pc) */}
			<div className="ml-[6px]">
				<div>
					<div className="flex cursor-pointer text-xl text-gray-600 dark:text-white hidden xl:inline-block" onClick={onOpenSidenav}>
						<FiAlignJustify />
					</div>
				</div>
			</div>

			<div className="relative mt-[3px] flex h-[61px] !w-[200px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-400 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
				{/* 사이드바 (모바일) */}
				<span className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden" onClick={onOpenSidenav}>
					<FiAlignJustify className="h-5 w-5" />
				</span>

				{/* 알림 */}
				{/* <Dropdown
					button={
						<p className="cursor-pointer">
							<IoMdNotificationsOutline className="h-4 w-4 text-gray-600 dark:text-white" />
						</p>
					}
					animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
					classNames="py-2 top-4 -left-[230px] md:-left-[440px] w-max"
				>
					<div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none sm:w-[460px]">
						<div className="flex items-center justify-between">
							<p className="text-base font-bold text-navy-700 dark:text-white">Notification</p>
							<p className="text-sm font-bold text-navy-700 dark:text-white">Mark all read</p>
						</div>

						<button className="flex w-full items-center">
							<div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white">
								<BsArrowBarUp />
							</div>
							<div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
								<p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">New Update: Horizon UI Dashboard PRO</p>
								<p className="font-base text-left text-xs text-gray-900 dark:text-white">A new update for your downloaded item is available!</p>
							</div>
						</button>

						<button className="flex w-full items-center">
							<div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white">
								<BsArrowBarUp />
							</div>
							<div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
								<p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">New Update: Horizon UI Dashboard PRO</p>
								<p className="font-base text-left text-xs text-gray-900 dark:text-white">A new update for your downloaded item is available!</p>
							</div>
						</button>
					</div>
				</Dropdown> */}

				{/* i 아이콘 */}
				{/* <Dropdown
					button={
						<p className="cursor-pointer">
							<IoMdInformationCircleOutline className="h-4 w-4 text-gray-600 dark:text-white" />
						</p>
					}
					classNames="py-2 top-6 -left-[250px] md:-left-[330px] w-max"
					animation="origin-[75%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
				>
					<div className="flex w-[350px] flex-col gap-2 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
						<div
							style={{
								backgroundImage: `url(${navbarimage})`,
								backgroundRepeat: 'no-repeat',
								backgroundSize: 'cover',
							}}
							className="mb-2 aspect-video w-full rounded-lg"
						/>
						<a
							target="blank"
							href="https://horizon-ui.com/pro?ref=live-free-tailwind-react"
							className="px-full linear flex cursor-pointer items-center justify-center rounded-xl bg-brand-500 py-[11px] font-bold text-white transition duration-200 hover:bg-brand-600 hover:text-white active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
						>
							Buy Horizon UI PRO
						</a>
						<a
							target="blank"
							href="https://horizon-ui.com/docs-tailwind/docs/react/installation?ref=live-free-tailwind-react"
							className="px-full linear flex cursor-pointer items-center justify-center rounded-xl border py-[11px] font-bold text-navy-700 transition duration-200 hover:bg-gray-200 hover:text-navy-700 dark:!border-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:active:bg-white/10"
						>
							See Documentation
						</a>
						<a
							target="blank"
							href="https://horizon-ui.com/?ref=live-free-tailwind-react"
							className="hover:bg-black px-full linear flex cursor-pointer items-center justify-center rounded-xl py-[11px] font-bold text-navy-700 transition duration-200 hover:text-navy-700 dark:text-white dark:hover:text-white"
						>
							Try Horizon Free
						</a>
					</div>
				</Dropdown> */}

				{/* 다크모드 */}
				{/* <div
					className="cursor-pointer text-gray-600"
					onClick={() => {
						if (darkMode) {
							document.body.classList.remove('dark');
							setDarkMode(false);
						} else {
							document.body.classList.add('dark');
							setDarkMode(true);
						}
					}}
				>
					{darkMode ? (
						<RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
					) : (
						<RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
					)}
				</div> */}

				{/* 사용자 아이콘 */}
				<Dropdown button={<img className="h-10 w-10 rounded-full" src={avatar} alt="Elon Musk" />} classNames="py-2 top-8 -left-[180px] w-max">
					<div className="flex h-48 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
						<div className="mt-3 ml-4">
							<div className="flex items-center gap-2">
								<p className="text-sm font-bold text-navy-700 dark:text-white">👋 Hey, Adela</p>{' '}
							</div>
						</div>
						<div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

						<div className="mt-3 ml-4 flex flex-col">
							<p onClick={() => myProfile()} className="cursor-pointer text-sm text-gray-800 dark:text-white hover:dark:text-white">
								프로필 수정
							</p>
							<a href=" " className="mt-3 text-sm font-medium text-red-500 hover:text-red-500">
								Log Out
							</a>
						</div>
					</div>
				</Dropdown>
			</div>
		</nav>
	);
};

export default Navbar;
