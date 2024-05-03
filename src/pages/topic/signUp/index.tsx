import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Button, Card, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import ProfileService from '../../../services/profileService';
import useProfile from '../../../store/useProfile';
import Basic from './tab/basic';
import Career from './tab/career';
import License from './tab/license';
import Coursework from './tab/coursework';
import Skill from './tab/skill';
import { profile } from '../../../store/baseParams/baseParams';
import useModal from '../../../store/useModal';

const SignUp = () => {
	const { isSuccess, isError, data } = useQuery('getProfile', ProfileService().profieQuery);
	const updateProfile = ProfileService().updateProfileMutation;
	const {
		basic,
		career,
		careerDetail,
		license,
		coursework,
		skill,
		setBasic,
		setCareer,
		setCareerDetail,
		setLicense,
		setCoursework,
		setSkill,
		setClear,
	} = useProfile();
	const [ready, setReady] = useState(false);
	const { openModal } = useModal();

	useEffect(() => {
		return () => {
			setClear();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (isSuccess) {
			const profileData: profile = data.response;
			if (profileData.isSuccessful) {
				setBasic(profileData.result.profileDto);
				setCareer(profileData.result.career);
				setCareerDetail(profileData.result.careerDetail);
				setLicense(profileData.result.license);
				setCoursework(profileData.result.coursework);
				setSkill(profileData.result.skill);
				setReady(true);
			} else if (isError) {
				openModal({ type: 3, contents: profileData.resultMsg, color: 'red' });
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	const update = () => {
		const param = { profileDto: basic, career, coursework, license, skill, careerDetail };
		updateProfile.mutate(param);
	};

	useEffect(() => {
		if (updateProfile.isSuccess) {
			openModal({ type: 3, contents: '업데이트 성공' });
		} else if (updateProfile.isError) {
			openModal({ type: 3, contents: '업데이트 실패', color: 'red' });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateProfile.isSuccess, updateProfile.isError]);

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
						{ready ? (
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
