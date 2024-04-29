import { useEffect, useState } from 'react';
import { Button, Card, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import AuthService from '../../../services/authService';
import useProfile from '../../../store/useProfile';
import Basic from './tab/basic';
import Career from './tab/career';
import License from './tab/license';
import Coursework from './tab/coursework';
import Skill from './tab/skill';
import { profile } from '../../../store/baseParams/baseParams';

const SignUp = () => {
	const getProfile = AuthService().profieMutation;

	const { setProfile, setCareer, setCareerDetail, setLicense, setCoursework, setSkill } = useProfile();

	useEffect(() => {
		const param = sessionStorage.getItem('nex_accessToken');
		if (param) {
			getProfile.mutate(param);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (getProfile.isSuccess) {
			const data: profile = getProfile.data.response;
			if (data.isSuccessful) {
				setProfile(data.result.profileDto);
				console.log(data.result);
			} else {
				console.log(data.resultMsg);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getProfile.isSuccess, getProfile.isError]);

	const update = () => {
		console.log('update');
	};

	return (
		<div className="mt-5 grid">
			<Card className="w-full h-full pt-[20px] pb-10 pl-[10%] pr-[20%]">
				<div className="flex">
					<header className="flex mt-[auto] float-left pl-[150px]">
						<div className="text-xl font-bold text-navy-700">개인정보 수정</div>
					</header>
					<Button className="flex ml-[auto] mr-[20px] w-[300px]" onClick={() => update()}>
						수정
					</Button>
				</div>
				<div className="mt-5 overflow-x-scroll xl:overflow-x-hidden min-h-[800px]">
					<Tabs variant="soft-rounded" orientation="vertical" className="border-0">
						<TabList style={{ width: '150px' }}>
							<Tab>기본정보</Tab>
							<Tab>경력사항</Tab>
							<Tab>자격증</Tab>
							<Tab>교육</Tab>
							<Tab>
								보유기술 및<br />
								외국어능력
							</Tab>
						</TabList>
						<div style={{ width: '5px' }} />
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
					</Tabs>
				</div>
			</Card>
		</div>
	);
};

export default SignUp;
