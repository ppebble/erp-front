import { Card } from '@chakra-ui/react';
import { ResponsivePie } from '@nivo/pie';

const Pie = () => {
	const data = [
		{
			id: '주임',
			value: 7,
		},
		{
			id: '대리',
			value: 6,
		},
		{
			id: '과장',
			value: 2,
		},
		{
			id: '차장',
			value: 4,
		},
		{
			id: '부장',
			value: 2,
		},
		{
			id: '상무, 이사',
			value: 2,
		},
		{
			id: '대표',
			value: 1,
		},
	];

	return (
		<Card className="w-full p-4 h-full">
			<div className="w-full h-full">
				<ResponsivePie
					data={data}
					margin={{ top: 20, right: 20, bottom: 70, left: 20 }}
					valueFormat=" >-"
					innerRadius={0.5}
					fit={false}
					activeInnerRadiusOffset={10}
					activeOuterRadiusOffset={20}
					colors={{ scheme: 'accent' }}
					borderColor={{
						from: 'color',
						modifiers: [['brighter', 0.2]],
					}}
					enableArcLinkLabels={false}
					arcLinkLabelsSkipAngle={10}
					arcLinkLabelsTextColor="#333333"
					arcLinkLabelsThickness={2}
					arcLinkLabelsColor={{ from: 'color' }}
					// arcLabel={(e) => `${e.id}`}
					arcLabel={(e) => ``}
					arcLabelsTextColor={{
						from: 'color',
						modifiers: [['darker', 3]],
					}}
					legends={[
						{
							anchor: 'bottom',
							direction: 'row',
							justify: false,
							translateX: 0,
							translateY: 56,
							itemsSpacing: 0,
							itemWidth: 100,
							itemHeight: 18,
							itemTextColor: '#999',
							itemDirection: 'left-to-right',
							itemOpacity: 1,
							symbolSize: 18,
							symbolShape: 'circle',
							effects: [
								{
									on: 'hover',
									style: {
										itemTextColor: '#000',
									},
								},
							],
						},
					]}
				/>
			</div>
		</Card>
	);
};

export default Pie;
