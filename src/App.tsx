import { Navigate, Route, Routes } from 'react-router-dom';

import AdminLayout from './layouts/admin';
import AuthLayout from './layouts/auth';

// auth
import SignIn from './views/auth/SignIn';

// admin
import MainDashboard from './views/admin/default';
import NFTMarketplace from './views/admin/marketplace';
import Profile from './views/admin/profile';
import DataTables from './views/admin/tables';
import BusinessCalendar from './views/admin/business';

const App = () => {
	return (
		<Routes>
			<Route path="auth" element={<AuthLayout />}>
				<Route path="signin" element={<SignIn />} />
			</Route>
			<Route path="admin" element={<AdminLayout />}>
				<Route path="main" element={<MainDashboard />} />
				<Route path="nft" element={<NFTMarketplace />} />
				<Route path="table" element={<DataTables />} />
				<Route path="profile" element={<Profile />} />
				<Route path="calendar" element={<BusinessCalendar />} />
			</Route>
			<Route path="/" element={<Navigate to="/auth/signin" replace />} />
		</Routes>
	);
};

export default App;
