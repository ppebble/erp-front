import { Navigate, Route, Routes } from 'react-router-dom';

import AuthLayout from './pages/auth';

// auth
import Login from './pages/auth/login/Login';

// admin
import Dashboard from './pages/topic/dashboard';
import NFTMarketplace from './pages/topic/marketplace';
import Profile from './pages/topic/profile';
import Summary from './pages/topic/summary';
import Workforce from './pages/topic/workforce';
import CompanyCalendar from './pages/topic/calendar';
import SignUp from './pages/topic/signUp';

import NotFound from './pages/error/notFound';
import Topic from './pages/topic';
import Equipment from './pages/topic/equipment';

const App = () => {
	return (
		<Routes>
			<Route path="auth" element={<AuthLayout />}>
				<Route path="login" element={<Login />} />
			</Route>
			<Route path="/erp" element={<Topic />}>
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="summary" element={<Summary />} />
				<Route path="workforce" element={<Workforce />} />
				<Route path="calendar" element={<CompanyCalendar />} />
				<Route path="project" element={<Profile />} />
				{/* 추후 인력사항 추가 시 아래 주석 해제 */}
				{/* <Route path="project" element={<Project />} /> */}
				<Route path="equipment" element={<Equipment />} />
				<Route path="nft" element={<NFTMarketplace />} />
				<Route path="profile" element={<Profile />} />
				<Route path="news" element={<NFTMarketplace />} />
				<Route path="seminar" element={<Profile />} />
				<Route path="board" element={<Summary />} />
				<Route path="suggestions" element={<Equipment />} />
				<Route path="signup" element={<SignUp />} />
			</Route>
			<Route path="/" element={<Navigate to="/auth/login" replace />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
