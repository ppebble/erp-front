import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Card } from '@chakra-ui/react';
import { DatumId, ResponsivePie } from '@nivo/pie';
import { ProfileService } from '../../../../services/profileService';
import useProfile from '../../../../store/useProfile';

const Pie = () => {
	const { isSuccess } = useQuery('getProfileList', ProfileService().profileByRank);
	const { rank, setSearch } = useProfile();
	const navigate = useNavigate();

	const graphClick = (id: DatumId) => {
		setSearch({ option: 'rank', input: id.toString() });
		navigate('/topic/workforce');
	};

	return (
		<Card className="w-full p-4">
			<div className="w-full h-[30rem]">
				{isSuccess && (
					<ResponsivePie
						data={rank}
						margin={{ top: 20, right: 20, bottom: 70, left: 20 }}
						innerRadius={0.5}
						padAngle={0.7}
						valueFormat=" >-"
						fit={false}
						activeInnerRadiusOffset={10}
						activeOuterRadiusOffset={20}
						colors={{ scheme: 'category10' }}
						borderColor={{
							from: 'color',
							modifiers: [['brighter', 0.2]],
						}}
						onClick={(e) => graphClick(e.id)}
						enableArcLinkLabels={false}
						arcLinkLabelsSkipAngle={10}
						arcLinkLabelsTextColor="#333333"
						arcLinkLabelsThickness={2}
						arcLinkLabelsColor={{ from: 'color' }}
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
				)}
			</div>
		</Card>
	);
};

export default Pie;
