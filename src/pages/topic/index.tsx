import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSideBar } from '../../store/useSideBar';
import { useScroll } from '../../store/useScroll';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer/Footer';

const Topic = (props: { [x: string]: any }) => {
	const { ...rest } = props;
	const { isSideBar, setSideBar } = useSideBar();
	const { isScroll, setScroll, divHeight, setDivHeight } = useScroll();
	const divRef = useRef<HTMLDivElement>(null);
	const location = useLocation();

	useEffect(() => {
		const checkHeight = () => {
			window.innerWidth < 1200 ? setSideBar(false) : setSideBar(true);
			if (window.innerHeight <= divHeight) {
				setScroll(true);
			} else {
				setScroll(false);
			}
		};

		if (divRef.current) {
			setDivHeight(divRef.current.offsetHeight + 180);
			checkHeight();
		}

		window.addEventListener('resize', checkHeight);

		return () => window.removeEventListener('resize', checkHeight);
	}, [divHeight, location, setDivHeight, setScroll, setSideBar]);

	return (
		<div className="bg-lightPrimary dark:!bg-navy-900">
			<Sidebar open={isSideBar} onClose={() => setSideBar(false)} />
			<div className={`h-full transition-all md:pr-2 ${isSideBar ? 'xl:ml-[313px]' : 'xl:ml-[12px]'}`} style={isScroll ? {} : { minHeight: '100vh' }}>
				<Navbar onOpenSidenav={() => setSideBar(!isSideBar)} {...rest} />
				<div ref={divRef}>
					<Outlet />
				</div>
			</div>
			<div className={`h-full transition-all md:pr-2 ${isSideBar ? 'xl:ml-[313px]' : 'xl:ml-[12px]'}`}>
				<Footer isSideBar={isSideBar} isScorll={isScroll} />
			</div>
		</div>
	);
};

export default Topic;
