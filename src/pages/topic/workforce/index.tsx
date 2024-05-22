import { useQuery } from 'react-query';
import ColumnsTable from './components/ColumnsTable';
import tableDataColumns from './variables/tableDataColumns';
import { ProfileService } from '../../../services/profileService';
import useProfile from '../../../store/useProfile';

const Workforce = () => {
	const { isSuccess } = useQuery('getProfileList', ProfileService().getProfileList);
	const { profileList } = useProfile();

	return <div>{isSuccess && <ColumnsTable tableData={profileList} low={10} />}</div>;
};

export default Workforce;
