/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Route, useLocation, Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer/Footer';
import routes from '../../routes';

const Admin = (props: { [x: string]: any }) => {
	const { ...rest } = props;
	const location = useLocation();
	const [open, setOpen] = React.useState(true);
	const [currentRoute, setCurrentRoute] = React.useState('Main Dashboard');

	React.useEffect(() => {
		window.addEventListener('resize', () => (window.innerWidth < 1200 ? setOpen(false) : setOpen(true)));
	}, []);
	const getActiveRoute = (actRt: RoutesType[]): string | boolean => {
		const activeRoute = 'Main Dashboard';
		for (let i = 0; i < actRt.length; i += 1) {
			if (window.location.href.indexOf(`${actRt[i].layout}/${actRt[i].path}`) !== -1) {
				setCurrentRoute(actRt[i].name);
			}
		}
		return activeRoute;
	};
	React.useEffect(() => {
		getActiveRoute(routes);
	}, [location.pathname]);

	const getActiveNavbar = (actNv: RoutesType[]): string | boolean | undefined => {
		const activeNavbar = false;
		for (let i = 0; i < actNv.length; i += 1) {
			if (window.location.href.indexOf(actNv[i].layout + actNv[i].path) !== -1) {
				return actNv[i].secondary;
			}
		}
		return activeNavbar;
	};

	return (
		<div className="flex h-full w-full">
			<Sidebar open={open} onClose={() => setOpen(false)} />
			<div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
				<main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
					<div className="h-full">
						<Navbar onOpenSidenav={() => setOpen(true)} brandText={currentRoute} secondary={getActiveNavbar(routes)} {...rest} />
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
