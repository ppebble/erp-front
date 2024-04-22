import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigation = useNavigate();
	const flag = sessionStorage.getItem('nex_accessToken') !== undefined || sessionStorage.getItem('nex_accessToken') !== null;

	// TODO 0422 replace 처리 안됨
	useEffect(() => {
		if (flag) {
			navigation('/auth/login');
		} else {
			navigation('/topic/dashboard');
		}
	}, [flag, navigation]);

	return <div>404</div>;
};

export default NotFound;
