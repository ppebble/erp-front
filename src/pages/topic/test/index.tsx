import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';

const Test = () => {
	const initechOrg1 = {
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
								children: [
									{
										name: 'AI &\n빅데이터팀',
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
										name: '국가 R&D\n연구과제팀',
										children: [
											{
												name: '스마트시티\n서비스 사업팀',
												children: [
													{
														name: '스마트시티\n서비스 기획팀',
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

	const MyNodeComponent = ({ node }: any) => {
		let test: any = '';
		if (node.name !== ' ') {
			test = (
				<div className="initechNode" onClick={() => console.log(node.name)}>
					<pre>{node.name}</pre>
				</div>
			);
		}
		return test;
	};

	return (
		<div>
			<div style={{ marginRight: '200px', minWidth: '500px' }}>
				<OrgChart tree={initechOrg1} NodeComponent={MyNodeComponent} />
			</div>
			<div style={{ marginTop: '-72px', minWidth: '500px' }}>
				<OrgChart tree={initechOrg2} NodeComponent={MyNodeComponent} />
			</div>
		</div>
	);
};

export default Test;
