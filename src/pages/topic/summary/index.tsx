import { useEffect, useState } from 'react';
import { useScroll } from '../../../store/useScroll';
import Organization from './chart/organization';
import Pie from './chart/pie';

const Tables = () => {
	const { divHeight } = useScroll();
	const [height, setHeight] = useState(divHeight);

	useEffect(() => {
		setHeight(divHeight);
	}, [divHeight]);

	return (
		<div className="grid h-full grid-cols-1 gap-5 md:grid-cols-2">
			<Pie height={height} />
			<Organization height={height} />
		</div>
	);
};

export default Tables;
