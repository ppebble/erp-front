/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
	const getRoutes = (rt: RoutesType[]): any => {
		return rt.map((prop, key) => {
			if (prop.layout === '/admin') {
				return <Route path={`/${prop.path}`} element={prop.component} key={key} />;
			}
			return null;
		});
	};

	document.documentElement.dir = 'ltr';
	return (
		<div className="flex h-full w-full">
			<Sidebar open={open} onClose={() => setOpen(false)} />
			{/* Navbar & Main Content */}
			<div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
				{/* Main Content */}
				<main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
					{/* Routes */}
					<div className="h-full">
						<Navbar onOpenSidenav={() => setOpen(true)} brandText={currentRoute} secondary={getActiveNavbar(routes)} {...rest} />
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
export default Admin;
