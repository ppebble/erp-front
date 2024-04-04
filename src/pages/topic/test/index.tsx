import { Card, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';

const Test = () => {
	const initechOrg = {
		name: '대표이사',
		children: [
			{
				name: '이사회',
			},
			{
				name: '기업부설연구소',
			},
			{
				name: '마케팅영업본부',
			},
			{
				name: ' ',
				children: [
					{
						name: ' ',
						children: [
							{
								name: '전략사업본부',
								children: [
									{
										name: 'AI & 빅데이터팀',
										children: [{ name: 'DCIM팀' }],
									},
								],
							},
							{
								name: 'S&F신사업본부',
								children: [
									{
										name: 'SF팀',
										children: [{ name: '신사업팀' }],
									},
								],
							},
							{
								name: '기술개발본부',
								children: [
									{
										name: '개발1팀',
										children: [
											{
												name: '개발2팀',
												children: [
													{
														name: '개발3팀',
														children: [{ name: '개발4팀' }],
													},
												],
											},
										],
									},
								],
							},
							{
								name: 'SC사업본부',
								children: [
									{
										name: '국가 R&D 연구과제팀',
										children: [
											{
												name: '스마트시티 서비스 사업팀',
												children: [
													{
														name: '스마트 시티 서비스 기획팀',
													},
												],
											},
										],
									},
								],
							},
							{
								name: '경영팀',
								children: [
									{
										name: '인사.총무',
										children: [{ name: '자금.회계' }],
									},
								],
							},
						],
					},
				],
			},
		],
	};

	const MyNodeComponent = ({ node }) => {
		let test;
		if (node.name !== ' ') {
			test = (
				<div className="initechNode" onClick={() => alert('Hi my real name is: ' + node.actor)}>
					{node.name}
				</div>
			);
		} else {
			test = '';
		}
		return test;
	};

	return <OrgChart tree={initechOrg} NodeComponent={MyNodeComponent} />;
};

export default Test;
