/* eslint-disable */
import { Fragment, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DashIcon from '../../../components/icons/DashIcon';
import { MdHome, MdOutlineLaptopChromebook } from 'react-icons/md';
import { useSideBar } from '../../../store/useSideBar';
// chakra imports

export const SidebarLinks = (props: { routes: RoutesType[] }): JSX.Element => {
	// Chakra color mode
	let location = useLocation();
	const { routes } = props;
	// const [isOpenPath, setCurrentPath] = useState<string>('main');
	const { currentPath, setCurrentPath } = useSideBar();
	const navigate = useNavigate();

	// verifies if routeName is the one active (in browser input)
	const activeRoute = (routeName: string) => {
		return location.pathname.includes(routeName);
	};

	const singleRoute = (route: RoutesType) => {
		if (route.child === undefined) {
			navigate(route.layout + '/' + route.path);
		}
	};

	useEffect(() => {
		console.log(currentPath);
	}, [currentPath]);

	const createLinks = (routes: RoutesType[]) => {
		return routes.map((route) => {
			return (
				<Fragment key={route.path}>
					<div onClick={() => singleRoute(route)}>
						<div className="relative mb-3 flex hover:cursor-pointer" onClick={() => setCurrentPath(route.path)}>
							<li className="my-[3px] flex cursor-pointer items-center px-8" key={route.path + 'li'}>
								<span className={`${currentPath === route.path ? 'font-bold text-brand-500 dark:text-white' : 'font-medium text-gray-600'}`}>
									{route.icon ? route.icon : <DashIcon />}{' '}
								</span>
								<p
									className={`leading-1 ml-4 flex ${currentPath === route.path ? 'font-bold text-navy-700 dark:text-white' : 'font-medium text-gray-600'}`}
								>
									{route.name}
								</p>
							</li>
							{/* {isOpenPath === route.path ? <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" /> : null} */}
						</div>
					</div>
					{route.child?.map((child) => {
						return (
							<Link key={child.path} to={child.layout + '/' + child.path}>
								<div
									key={child.path + 'div'}
									className={`${currentPath !== route.path ? 'invisible h-0 mb-0 ' : 'relative mb-3 flex hover:cursor-pointer ml-10'}`}
								>
									<li className="my-[3px] flex cursor-pointer items-center px-8">
										<span className={`${activeRoute(child.path) ? 'font-bold text-brand-500 dark:text-white' : 'font-medium text-gray-600'}`}>
											{child.icon ? child.icon : <DashIcon />}{' '}
										</span>
										<p
											className={`leading-1 ml-4 flex ${
												activeRoute(child.path) ? 'font-bold text-navy-700 dark:text-white' : 'font-medium text-gray-600'
											}`}
										>
											{child.name}
										</p>
									</li>
									{activeRoute(child.path) ? <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" /> : null}
								</div>
							</Link>
						);
					})}
				</Fragment>
			);
		});
	};
	// BRAND
	return <>{createLinks(routes)}</>;
};

export default SidebarLinks;
