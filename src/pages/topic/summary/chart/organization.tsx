import { Card, background, color } from '@chakra-ui/react';
import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';

const Organization = () => {
	const initechOrg1 = {
		name: '대표이사',
		background: 'darkblue',
		color: 'white',
		children: [
			{ name: '이사회', background: 'darkblue', color: 'white' },
			{ name: '기업부설연구소', background: 'darkblue', color: 'white' },
			{ name: '마케팅영업본부', background: 'darkblue', color: 'white' },
		],
	};

	const initechOrg2 = {
		name: ' ',
		children: [
			{
				name: ' ',
				children: [
					{
						name: ' ',
						children: [
							{
								name: '전략사업본부',
								background: 'beige',
								children: [
									{
										name: 'AI &\n빅데이터팀',
										background: 'beige',
										children: [{ name: 'DCIM팀', background: 'beige' }],
									},
								],
							},
							{
								name: 'S&F신사업본부',
								background: 'aliceblue',
								children: [
									{
										name: 'SF팀',
										background: 'aliceblue',
										children: [{ name: '신사업팀', background: 'aliceblue' }],
									},
								],
							},
							{
								name: '기술개발본부',
								background: 'lightgreen',
								children: [
									{
										name: '개발1팀',
										background: 'lightgreen',
										children: [
											{
												name: '개발2팀',
												background: 'lightgreen',
												children: [
													{
														name: '개발3팀',
														background: 'lightgreen',
														children: [{ name: '개발4팀', background: 'lightgreen' }],
													},
												],
											},
										],
									},
								],
							},
							{
								name: 'SC사업본부',
								background: 'aqua',
								children: [
									{
										name: '국가 R&D\n연구과제팀',
										background: 'aqua',
										children: [
											{
												name: '스마트시티\n서비스 사업팀',
												background: 'aqua',
												children: [{ name: '스마트시티\n서비스 기획팀', background: 'aqua' }],
											},
										],
									},
								],
							},
							{
								name: '경영팀',
								background: 'cornflowerblue',
								children: [
									{
										name: '인사.총무',
										background: 'cornflowerblue',
										children: [{ name: '자금.회계', background: 'cornflowerblue' }],
									},
								],
							},
						],
					},
				],
			},
		],
	};

	const MyNodeComponent = ({ node }: any) => {
		let tag: any = '';
		if (node.name !== ' ') {
			tag = (
				<div
					className="initechNode"
					onClick={() => console.log(node.name.replace('\n', ' '))}
					style={{ backgroundColor: `${node.background}`, color: `${node.color}`, cursor: 'pointer' }}
				>
					<pre>{node.name}</pre>
				</div>
			);
		}
		return tag;
	};

	return (
		<Card className="w-full h-full p-4 overflow-x-auto">
			<div style={{ marginRight: '200px', minWidth: '450px', zIndex: '10' }}>
				<OrgChart tree={initechOrg1} NodeComponent={MyNodeComponent} />
			</div>
			<div style={{ marginTop: '-75px', minWidth: '450px' }}>
				<OrgChart tree={initechOrg2} NodeComponent={MyNodeComponent} />
			</div>
		</Card>
	);
};

export default Organization;
