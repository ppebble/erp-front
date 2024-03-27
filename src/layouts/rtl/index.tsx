/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/RTL';
import Sidebar from '../../components/sidebar/RTL';
import Footer from '../../components/footer/Footer';
import routes from '../../routes';

const RtlLayout = () => {
	const location = useLocation();
	const [open, setOpen] = React.useState(true);
	const [currentRoute, setCurrentRoute] = React.useState('Main Dashboard');

	React.useEffect(() => {
		window.addEventListener('resize', () => (window.innerWidth < 1200 ? setOpen(false) : setOpen(true)));
	}, []);

	const getActiveRoute = (actRoute: RoutesType[]): string | boolean => {
		const activeRoute = 'RTL';
		for (let i = 0; i < actRoute.length; i += 1) {
			if (window.location.href.indexOf(`${actRoute[i].layout}/${actRoute[i].path}`) !== -1) {
				setCurrentRoute(actRoute[i].name);
			}
		}
		return activeRoute;
	};
	React.useEffect(() => {
		getActiveRoute(routes);
	}, [location.pathname]);
	const getActiveNavbar = (actNav: RoutesType[]): string | boolean | undefined => {
		const activeNavbar = false;
		for (let i = 0; i < actNav.length; i += 1) {
			if (window.location.href.indexOf(actNav[i].layout + actNav[i].path) !== -1) {
				return actNav[i].secondary;
			}
		}
		return activeNavbar;
	};
	const getRoutes = (rt: RoutesType[]): any => {
		return rt.map((prop, key) => {
			if (prop.layout === '/rtl') {
				return <Route path={`/${prop.path}`} element={prop.component} key={key} />;
			}
			return null;
		});
	};

	document.documentElement.dir = 'rtl';
	return (
		<div className="flex h-full w-full">
			<Sidebar open={open} onClose={() => setOpen(false)} />
			{/* Navbar & Main Content */}
			<div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
				{/* Main Content */}
				<main className="mx-[12px] h-full flex-none transition-all md:pe-2 xl:mr-[313px]">
					{/* Routes */}
					<div className="h-full">
						<Navbar onOpenSidenav={() => setOpen(true)} brandText={currentRoute} secondary={getActiveNavbar(routes)} />
						<div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
							<Routes>
								{getRoutes(routes)}

								<Route path="/" element={<Navigate to="/admin/default" replace />} />
							</Routes>
						</div>
						<div className="p-3">
							<Footer />
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};
export default RtlLayout;
