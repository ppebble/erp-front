import React from 'react';
import { Outlet } from 'react-router-dom';
import { useNaviOpen } from '../../store';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer/Footer';

const Admin = (props: { [x: string]: any }) => {
	const { ...rest } = props;
	const { naviOpen, setNaviOpen } = useNaviOpen();

	React.useEffect(() => {
		window.addEventListener('resize', () => (window.innerWidth < 1200 ? setNaviOpen(false) : setNaviOpen(true)));
	}, [setNaviOpen]);

	return (
		<div className="flex h-full w-full">
			<Sidebar open={naviOpen} onClose={() => setNaviOpen(false)} />
			<div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
				<main className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:${naviOpen ? 'ml-[313px]' : 'ml-[12px]'}`}>
					<div className="h-full">
						<Navbar onOpenSidenav={() => setNaviOpen(!naviOpen)} {...rest} />
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
export default Admin;
