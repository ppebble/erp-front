import Organization from './chart/organization';
import Funnel from './chart/funnel';
import Pie from './chart/pie';

const Tables = () => {
	return (
		<div>
			<div className="mt-5 grid grid-cols-1 gap-5">
				<Organization />
			</div>
			<div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
				<Pie />
				<Funnel />
			</div>
		</div>
	);
};

export default Tables;
