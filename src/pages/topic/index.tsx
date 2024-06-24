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
	const { isScroll, setScroll, setDivHeight } = useScroll();
	const divRef = useRef<HTMLDivElement>(null);
	const [outletHeight, setOutletHeight] = useState<string>();

	useEffect(() => {
		const checkWidth = () => {
			window.innerWidth < 1200 ? setSideBar(false) : setSideBar(true);
		};

		window.addEventListener('resize', checkWidth);

		return () => window.removeEventListener('resize', checkWidth);
	}, [setSideBar]);

	useEffect(() => {
		const checkHeight = (entry: ResizeObserverEntry) => {
			if (window.innerHeight <= entry.contentRect.height + 180) {
				setScroll(true);
			} else {
				setScroll(false);
			}
			setDivHeight((window.innerHeight - 180).toString().concat('px'));
		};

		// Outlet 높이 변화를 감지함
		const observer = new ResizeObserver((entries) => {
			entries.map((entry) => checkHeight(entry));
		});

		if (divRef.current) {
			observer.observe(divRef.current);
		}

		// Outlet 높이 변화 감지를 해제함
		return () => observer.disconnect();
	}, [setScroll]);

	return (
		<>
			<Sidebar open={isSideBar} onClose={() => setSideBar(false)} />
			<div className="bg-lightPrimary dark:!bg-navy-900">
				<div
					className={`h-full transition-all md:pr-2 ${isSideBar ? 'xl:ml-[313px]' : 'xl:ml-[12px]'}`}
					style={isScroll ? {} : { minHeight: '100vh' }}
				>
					<Navbar onOpenSidenav={() => setSideBar(!isSideBar)} {...rest} />
					<div ref={divRef}>
						<Outlet />
					</div>
				</div>
				<div className={`h-full transition-all md:pr-2 ${isSideBar ? 'xl:ml-[313px]' : 'xl:ml-[12px]'}`}>
					<Footer isSideBar={isSideBar} isScorll={isScroll} />
				</div>
			</div>
		</>
	);
};

export default Topic;
