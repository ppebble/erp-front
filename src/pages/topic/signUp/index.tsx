import { useState } from 'react';
import { Button, Card, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Basic from './tab/basic';
import Career from './tab/career';
import License from './tab/license';
import Coursework from './tab/coursework';
import Skill from './tab/skill';

const SignUp = () => {
	const [mode, setMode] = useState('edit');
	return (
		<div className="mt-5 grid">
			<Card className="w-full pb-10 p-4 h-full">
				<header className="relative flex items-center justify-between">
					<div className="text-xl font-bold text-navy-700 dark:text-white">개인정보 수정</div>
				</header>

				<div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
					<Tabs variant="enclosed">
						<TabList>
							<Tab>기본정보</Tab>
							<Tab>경력사항</Tab>
							<Tab>자격증</Tab>
							<Tab>교육</Tab>
							<Tab>보유기술 및 외국어능력</Tab>
							<Button className="flex ml-[auto] mr-[20px] w-[300px]">수정</Button>
						</TabList>
						<TabPanels>
							<TabPanel>
								<Basic mode={mode} />
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
