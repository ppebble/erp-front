import { Card } from '@chakra-ui/react';
import { ResponsiveFunnel } from '@nivo/funnel';

const Funnel = () => {
	const data = [
		{
			id: 'level_7',
			value: 1,
			label: '대표',
		},
		{
			id: 'level_6',
			value: 2,
			label: '상무, 이사',
		},
		{
			id: 'level_5',
			value: 2,
			label: '부장',
		},
		{
			id: 'level_4',
			value: 4,
			label: '차장',
		},
		{
			id: 'level_3',
			value: 2,
			label: '과장',
		},
		{
			id: 'level_2',
			value: 6,
			label: '대리',
		},
		{
			id: 'level_1',
			value: 7,
			label: '주임',
		},
	];

	const detailView = (value: any) => {
		console.log(value.data.label);
	};

	return (
		<Card className="w-full h-full p-4">
			<div className="w-full h-full">
				<ResponsiveFunnel
					data={data}
					margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
					shapeBlending={0.2}
					valueFormat=" >-.0r"
					colors={{ scheme: 'dark2' }}
					borderWidth={10}
					enableLabel={false}
					onClick={(value) => detailView(value)}
					labelColor={{
						from: 'color',
						modifiers: [['darker', 3]],
					}}
					beforeSeparatorLength={100}
					beforeSeparatorOffset={20}
					afterSeparatorLength={100}
					afterSeparatorOffset={20}
					currentPartSizeExtension={10}
					currentBorderWidth={10}
					motionConfig="wobbly"
				/>
			</div>
		</Card>
	);
};

export default Funnel;
