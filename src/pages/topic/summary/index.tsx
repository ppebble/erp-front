import DailyTraffic from '../dashboard/components/DailyTraffic';
import PieChartCard from '../dashboard/components/PieChartCard';
import WeeklyRevenue from '../dashboard/components/WeeklyRevenue';
import TotalSpent from '../dashboard/components/TotalSpent';
import basicModal from '../../../components/modal';

const Tables = () => {
	return (
		<div>
			<div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
				<DailyTraffic />
				<PieChartCard />
			</div>
		</div>
	);
};

export default Tables;
