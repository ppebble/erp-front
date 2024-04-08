import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSideBar } from '../../store/useSideBar';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer/Footer';

const Topic = (props: { [x: string]: any }) => {
	const { ...rest } = props;
	const { isSideBar, setSideBar } = useSideBar();
	const [isScroll, setIsScroll] = useState<boolean>(false);
	const divRef = useRef<HTMLDivElement>(null);
	const location = useLocation();

	const scrollCheck = () => {
		const { current } = divRef;
		if (current && window.innerHeight < current.offsetHeight) {
			setIsScroll(true);
		} else {
			setIsScroll(false);
		}
	};

	useEffect(() => {
		const showSidebar = () => {
			window.innerWidth < 1200 ? setSideBar(false) : setSideBar(true);
			scrollCheck();
		};

		window.addEventListener('resize', showSidebar);
		return () => window.removeEventListener('resize', showSidebar);
	}, [setSideBar]);

	useEffect(() => {
		scrollCheck();
	}, [location, setIsScroll]);

	return (
		<div ref={divRef} className="bg-lightPrimary dark:!bg-navy-900">
			<Sidebar open={isSideBar} onClose={() => setSideBar(false)} />
			<div className={`h-full transition-all md:pr-2 ${isSideBar ? 'xl:ml-[313px]' : 'xl:ml-[12px]'}`} style={isScroll ? {} : { minHeight: '100vh' }}>
				<Navbar onOpenSidenav={() => setSideBar(!isSideBar)} {...rest} />
				<Outlet />
			</div>
			<div className={`h-full transition-all md:pr-2 ${isSideBar ? 'xl:ml-[313px]' : 'xl:ml-[12px]'}`}>
				<Footer isSideBar={isSideBar} isScorll={isScroll} />
			</div>
		</div>
	);
};

export default Topic;
