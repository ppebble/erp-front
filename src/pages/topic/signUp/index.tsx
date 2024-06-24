import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Button, Card, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { ProfileService } from '../../../services/profileService';
import useProfile from '../../../store/useProfile';
import Basic from './tab/basic';
import Career from './tab/career';
import License from './tab/license';
import Coursework from './tab/coursework';
import Skill from './tab/skill';
import useModal from '../../../store/useModal';

const SignUp = () => {
	const { isSuccess } = useQuery('selProfile', ProfileService().selProfile); // 조회
	const updateProfile = ProfileService().updateProfileMutation; // 업데이트
	const { profile, detail, dept, education, army, career, license, coursework, skill, highSchool, collage, graduateSchool, setClearProfile } =
		useProfile();
	const { openModal } = useModal();

	const update = () => {
		if (isSuccess) {
			const high = `${highSchool[0]}/${highSchool[1]}/${highSchool[2]}`;
			const col = `${collage[0]}/${collage[1]}/${collage[2]}/${collage[3]}`;
			const graduate = `${graduateSchool[0]}/${graduateSchool[1]}/${graduateSchool[2]}/${graduateSchool[3]}`;
			const param = {
				profile,
				detail,
				dept,
				education: {
					pEduNo: education.pEduNo,
					highSchool: high === '/-/' ? '' : high,
					collage: col === '//-/' ? '' : col,
					graduateSchool: graduate === '//-/' ? '' : graduate,
				},
				army,
				career,
				coursework,
				license,
				skill,
			};
			console.log(param);
			updateProfile.mutate(param);
		}
	};

	// useEffect(() => {
	// 	return () => setClearProfile();
	// }, []);

	useEffect(() => {
		if (updateProfile.isSuccess) {
			openModal({ type: 3, contents: '업데이트 성공' });
		} else if (updateProfile.isError) {
			openModal({ type: 3, contents: '업데이트 실패', color: 'red' });
		}
	}, [openModal, updateProfile.isError, updateProfile.isSuccess]);

	return (
		<div className="mt-5 grid">
			<Card className="w-full h-full pt-[20px] pb-10 sm:px-[20px]">
				<div className="flex pl-[10%] pr-[20%]">
					<header className="flex mt-[auto] float-left">
						<div className="text-xl font-bold text-navy-700">개인정보 수정</div>
					</header>
					<Button className="flex ml-[auto] mr-[20px] w-[300px]" onClick={() => update()}>
						수정
					</Button>
				</div>
				<div className="mt-5 overflow-x-scroll xl:overflow-x-hidden min-h-[800px] xl:pl-[10%] xl:pr-[20%] md:pl-[10%] md:pr-[10%]">
					<Tabs className="mt-[16px]" variant="soft-rounded" orientation="vertical">
						<TabList className="min-w-[180px] pr-[5%]">
							<Tab className="mb-[20px]">기본정보</Tab>
							<Tab className="mb-[20px]">경력사항</Tab>
							<Tab className="mb-[20px]">자격증</Tab>
							<Tab className="mb-[20px]">교육</Tab>
							<Tab className="mb-[20px]">
								기술 및<br />
								외국어
							</Tab>
						</TabList>
						{isSuccess ? (
							<TabPanels>
								<TabPanel>
									<Basic />
								</TabPanel>
								<TabPanel>
									<Career />
								</TabPanel>
								<TabPanel>
									<License />
								</TabPanel>
								<TabPanel>
									<Coursework />
								</TabPanel>
								<TabPanel>
									<Skill />
								</TabPanel>
							</TabPanels>
						) : (
							''
						)}
					</Tabs>
				</div>
			</Card>
		</div>
	);
};

export default SignUp;
