import Organization from './chart/organization';
import Funnel from './chart/funnel';
import Pie from './chart/pie';

const Tables = () => {
	return (
		<div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
			<Pie />
			<Organization />
			{/* <Funnel /> */}
		</div>
	);
};

export default Tables;
