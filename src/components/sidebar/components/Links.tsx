/* eslint-disable */
import React, { Fragment, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DashIcon from '../../../components/icons/DashIcon';
import { MdHome } from 'react-icons/md';
import { useNaviOpen } from '../../../store';
// chakra imports

export const SidebarLinks = (props: { routes: RoutesType[] }): JSX.Element => {
	// Chakra color mode
	let location = useLocation();

	const { routes } = props;
	// const [isOpenPath, setOpenPath] = useState<string>('main');
	const { openPath, setOpenPath } = useNaviOpen();

	// verifies if routeName is the one active (in browser input)
	const activeRoute = (routeName: string) => {
		return location.pathname.includes(routeName);
	};

	const createLinks = (routes: RoutesType[]) => {
		return routes.map((route, index) => {
			return (
				<Fragment key={route.path}>
					<div className="relative mb-3 flex hover:cursor-pointer" onClick={() => setOpenPath(route.path)}>
						<li className="my-[3px] flex cursor-pointer items-center px-8" key={route.path + 'li'}>
							<span className={`${openPath === route.path ? 'font-bold text-brand-500 dark:text-white' : 'font-medium text-gray-600'}`}>
								{route.icon ? route.icon : <DashIcon />}{' '}
							</span>
							<p
								className={`leading-1 ml-4 flex ${openPath === route.path ? 'font-bold text-navy-700 dark:text-white' : 'font-medium text-gray-600'}`}
							>
								{route.name}
							</p>
						</li>
						{/* {isOpenPath === route.path ? <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" /> : null} */}
					</div>
					{route.child?.map((child, index) => {
						return (
							<Link key={child.path} to={child.layout + '/' + child.path}>
								<div
									key={child.path + 'div'}
									className={`${openPath !== route.path ? 'invisible h-0 mb-0 ' : 'relative mb-3 flex hover:cursor-pointer ml-10'}`}
								>
									<li className="my-[3px] flex cursor-pointer items-center px-8">
										<span
											className={`${activeRoute(child.path) === true ? 'font-bold text-brand-500 dark:text-white' : 'font-medium text-gray-600'}`}
										>
											{child.icon ? child.icon : <DashIcon />}{' '}
										</span>
										<p
											className={`leading-1 ml-4 flex ${
												activeRoute(child.path) === true ? 'font-bold text-navy-700 dark:text-white' : 'font-medium text-gray-600'
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
	return (
		<>
			<Link key={'mainboard'} to={'/admin/main'}>
				<div className="relative mb-3 flex hover:cursor-pointer" onClick={() => setOpenPath('main')}>
					<li className="my-[3px] flex cursor-pointer items-center px-8" key={'DASHBOARD'}>
						<span className={`${openPath === 'main' ? 'font-bold text-brand-500 dark:text-white' : 'font-medium text-gray-600'}`}>
							<MdHome className="h-6 w-6" />{' '}
						</span>
						<p className={`leading-1 ml-4 flex ${openPath === 'main' ? 'font-bold text-navy-700 dark:text-white' : 'font-medium text-gray-600'}`}>
							{'대시보드'}
						</p>
					</li>
					{/* {isOpenPath === route.path ? <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" /> : null} */}
				</div>
			</Link>
			{createLinks(routes)}
		</>
	);
};

export default SidebarLinks;
