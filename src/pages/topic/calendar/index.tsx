import { MdAddCircleOutline, MdApps, MdPlusOne, MdSearch } from 'react-icons/md';
import { BsPlus, BsPlusCircle } from 'react-icons/bs';
import FullCalendarComponent from '../../../components/calendar/FullCalendarComponent';
import Card from '../../../components/card';
import Dropdown from '../../../components/dropdown';

const CompanyCalendar = () => {
	return (
		<div className="mt-3 grid h-full ">
			<div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
				<div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
					<h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white"> </h4>
					<ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
						<li>
							<p className="font-large text-brand-500 hover:cursor-pointer hover:text-brand-500 dark:text-white">
								<MdSearch
									className="h-10 w-10"
									onClick={() => {
										// 조회 팝업 모달
									}}
								/>
							</p>
						</li>
						<li>
							<p className="font-large text-brand-500 hover:cursor-pointer hover:text-brand-500 dark:text-white">
								<MdAddCircleOutline
									className="h-10 w-10"
									onClick={() => {
										// 일정 추가 팝업 모달
									}}
								/>
							</p>
						</li>
						<li>
							<p className="text-base font-medium text-brand-500 hover:cursor-pointer hover:text-brand-500 dark:text-white">
								<Dropdown button={<MdApps className="h-10 w-10" />} classNames="py-2 top-8 -left-[180px] w-max">
									<div className="flex w-[180px] flex-col  justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
										<div className="mt-3 ml-4">
											<div className="flex items-center gap-2">
												<p className="text-sm font-bold text-navy-700 dark:text-white">👋 Hey, Adela</p>{' '}
											</div>
										</div>
										<div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />
										<div className="mt-3 ml-4 flex flex-col">
											<p className="text-sm text-gray-800 dark:text-white hover:dark:text-white">Profile Settings</p>
										</div>
										<div className="mt-3 ml-4 flex flex-col">
											<p className="text-sm text-gray-800 dark:text-white hover:dark:text-white">Profile Settings</p>
										</div>
										<div className="mt-3 ml-4 flex flex-col">
											<p className="text-sm text-gray-800 dark:text-white hover:dark:text-white">Profile Settings</p>
										</div>
										<div className="mt-3 ml-4 flex flex-col">
											<p className="text-sm text-gray-800 dark:text-white hover:dark:text-white">Profile Settings</p>
										</div>
										<div className="mt-3 ml-4 flex flex-col">
											<p className="text-sm text-gray-800 dark:text-white hover:dark:text-white">Profile Settings</p>
										</div>
										<div className="mt-3 ml-4 flex flex-col">
											<p className="text-sm text-gray-800 dark:text-white hover:dark:text-white">Profile Settings</p>
										</div>
										<div className="mt-3 ml-4 flex flex-col">
											<p className="text-sm text-gray-800 dark:text-white hover:dark:text-white">Profile Settings</p>
										</div>
										<div className="mt-3 ml-4 flex flex-col">
											<p className="text-sm text-gray-800 dark:text-white hover:dark:text-white">Profile Settings</p>
										</div>
										<div className="mt-3 ml-4 flex flex-col" />
									</div>
								</Dropdown>
							</p>
						</li>
					</ul>
				</div>
				<FullCalendarComponent />
			</div>
		</div>
	);
};

export default CompanyCalendar;
