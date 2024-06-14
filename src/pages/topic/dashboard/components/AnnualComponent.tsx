/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import Card from '../../../../components/card';
import useModal from '../../../../store/useModal';
import { CustomAnnualDetailComponent } from './modal/CustomAnnualDetailComponent';
import { usePersonalAnnual } from '../../../../store/useAnnual';

const AnnualComponent = () => {
	const defaultData = usePersonalAnnual();
	const { openModal, closeModal } = useModal();
	const [isDetail, setIsDetail] = useState<boolean>(false);

	return (
		<Card extra="w-full p-2 h-full">
			<div className="grid items-center grid-cols-12 gap-2 md:grid-cols-12">
				<div className="text-xl font-bold text-navy-700 dark:text-white col-span-3">
					연차 총량 : {defaultData.length > 0 ? defaultData[0].annualDay : 0}
				</div>
				<div className="text-xl font-bold text-navy-700 dark:text-white col-span-6">
					연차 잔량 : {defaultData.length > 0 ? defaultData[0].remainDay : 0}
				</div>
				<div className="grid grid-cols-12 gap-2 col-span-3">
					<div className="col-span-5" />
					<button
						onClick={() => {
							openModal({ type: 5, closeOnOverlay: true });
						}}
						className="dark:active-bg-white-20 linear col-span-4 rounded-md bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
					>
						연차 신청
					</button>
					<div className="col-span-1" />
					<button
						onClick={() => {
							setIsDetail(!isDetail);
						}}
						className="dark:active-bg-white-20 linear col-span-2 rounded-md bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
					>
						{!isDetail ? <MdKeyboardArrowDown className="h-6 w-6" /> : <MdKeyboardArrowUp className="h-6 w-6" />}
					</button>
				</div>
			</div>
			<div className={`pt-2 ${isDetail ? '' : 'invisible h-0 mb-0'}`}>
				<CustomAnnualDetailComponent />
			</div>
		</Card>
	);
};

export default AnnualComponent;
