import { Button, Card, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Basic from './tab/basic';
import Career from './tab/career';
import License from './tab/license';

const SignUp = () => {
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
							<Tab>Skill Inventory</Tab>
							<Tab>증빙서류</Tab>
						</TabList>
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
							<TabPanel>4</TabPanel>
							<TabPanel>5</TabPanel>
							<TabPanel>6</TabPanel>
							<TabPanel>7</TabPanel>
						</TabPanels>
					</Tabs>
					<div className="flex items-end w-full ">
						<Button className="w-1/5">수정</Button>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default SignUp;
