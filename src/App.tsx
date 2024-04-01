import { Navigate, Route, Routes } from 'react-router-dom';

import AdminLayout from './pages/admin';
import AuthLayout from './pages/auth';

// auth
import SignIn from './pages/auth/SignIn/SignIn';

// admin
import MainDashboard from './pages/admin/default';
import NFTMarketplace from './pages/admin/marketplace';
import Profile from './pages/admin/profile';
import DataTables from './pages/admin/tables';
import BusinessCalendar from './pages/admin/business';

import NotFound from './pages/error/notFound';

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
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
