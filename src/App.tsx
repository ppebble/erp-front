import { Navigate, Route, Routes } from 'react-router-dom';

import { ReactQueryDevtools } from 'react-query/devtools';
import AuthLayout from './pages/auth';

// auth
import Login from './pages/auth/login/Login';

// admin
import Dashboard from './pages/topic/dashboard';
import NFTMarketplace from './pages/topic/marketplace';
import Project from './pages/topic/project';
import ProjectDetail from './pages/topic/project/projectDetail';
import Summary from './pages/topic/summary';
import Workforce from './pages/topic/workforce';
import CompanyCalendar from './pages/topic/calendar';
import SignUp from './pages/topic/signUp';
import Password from './pages/topic/password';
import NotFound from './pages/error/NotFound';
import Topic from './pages/topic';
import Equipment from './pages/topic/equipment';
import AnnualRequest from './pages/topic/dashboard/components/modal/AnnualRequest';

const App = () => {
	return (
		<>
			<Routes>
				<Route path="auth" element={<AuthLayout />}>
					<Route path="login" element={<Login />} />
				</Route>
				<Route path="/topic" element={<Topic />}>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="annRequest" element={<AnnualRequest />} />
					<Route path="summary" element={<Summary />} />
					<Route path="workforce" element={<Workforce />} />
					<Route path="calendar" element={<CompanyCalendar />} />
					<Route path="project" element={<Project />} />
					<Route path="projectDetail" element={<ProjectDetail />} />
					<Route path="equipment" element={<Equipment />} />
					<Route path="nft" element={<NFTMarketplace />} />
					<Route path="news" element={<NFTMarketplace />} />
					<Route path="board" element={<Summary />} />
					<Route path="suggestions" element={<Equipment />} />
					<Route path="signup" element={<SignUp />} />
					<Route path="password" element={<Password />} />
				</Route>
				<Route path="/" element={<Navigate to="/auth/login" replace />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
		</>
	);
};

export default App;
