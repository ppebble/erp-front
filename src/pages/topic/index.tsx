import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSideBar } from '../../store/useSideBar';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer/Footer';

const Topic = (props: { [x: string]: any }) => {
	const { ...rest } = props;
	const { isSideBar, setSideBar } = useSideBar();

	useEffect(() => {
		const showSidebar = () => {
			window.innerWidth < 1200 ? setSideBar(false) : setSideBar(true);
		};
		window.addEventListener('resize', showSidebar);
		return () => window.removeEventListener('resize', showSidebar);
	}, [setSideBar]);

	return (
		<div className="flex h-full w-full">
			<Sidebar open={isSideBar} onClose={() => setSideBar(false)} />
			<div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
				<main className={`mx-[12px] h-full flex-none transition-all md:pr-2 ${isSideBar ? 'xl:ml-[313px]' : 'xl:ml-[12px]'}`}>
					<div className="h-full">
						<Navbar onOpenSidenav={() => setSideBar(!isSideBar)} {...rest} />
						<Outlet />
						<div className="p-3">
							<Footer />
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default Topic;
