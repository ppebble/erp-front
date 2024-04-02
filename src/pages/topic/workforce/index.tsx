import ColumnsTable from './components/ColumnsTable';
import tableDataColumns from './variables/tableDataColumns';

const Workforce = () => {
	return (
		<div>
			<ColumnsTable tableData={tableDataColumns} low={10} />
		</div>
	);
};

export default Workforce;
