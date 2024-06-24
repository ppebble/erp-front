import { Suspense } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Card } from '@chakra-ui/react';
import { DatumId, ResponsivePie } from '@nivo/pie';
import { ProfileService } from '../../../../services/profileService';
import useProfile from '../../../../store/useProfile';

type PieProps = {
	height: string;
};

const Pie = ({ height }: PieProps) => {
	const { isSuccess } = useQuery('getProfileList', ProfileService().profileByRank);
	const { rank, setSearch } = useProfile();
	const navigate = useNavigate();

	const graphClick = (id: DatumId) => {
		setSearch({ option: 'rank', input: id.toString() });
		navigate('/topic/workforce');
	};

	return (
		<Card style={{ height: `${height}` }}>
			<Suspense fallback={<div>Loading...</div>}>
				{isSuccess && (
					<div className="w-full h-full min-w-[350px] min-h-[350px]">
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
									anchor: 'bottom-right',
									direction: 'column',
									justify: false,
									translateX: 50,
									translateY: 70,
									itemsSpacing: 0,
									itemWidth: 100,
									itemHeight: 25,
									itemTextColor: '#999',
									itemDirection: 'left-to-right',
									itemOpacity: 1,
									symbolSize: 22,
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
				)}
			</Suspense>
		</Card>
	);
};

export default Pie;
