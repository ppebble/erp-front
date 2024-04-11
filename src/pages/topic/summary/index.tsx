import Organization from './chart/organization';
import Funnel from './chart/funnel';
import Pie from './chart/pie';
import DailyTraffic from '../dashboard/components/DailyTraffic';

const Tables = () => {
	return (
		<div>
			<div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
				<Organization />
				<Funnel />
			</div>
			<div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
				<Pie />
				<DailyTraffic />
			</div>
		</div>
	);
};

export default Tables;
