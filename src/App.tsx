import { Navigate, Route, Routes } from 'react-router-dom';

import { ReactQueryDevtools } from 'react-query/devtools';
import AuthLayout from './pages/auth';

// auth
import Login from './pages/auth/login/Login';

// admin
import Dashboard from './pages/topic/dashboard';
import Summary from './pages/topic/summary';
import Workforce from './pages/topic/workforce';
import CompanyCalendar from './pages/topic/calendar';
import SignUp from './pages/topic/signUp';

import NotFound from './pages/error/NotFound';
import Topic from './pages/topic';
import Equipment from './pages/topic/equipment';
import AnnualRequest from './pages/topic/dashboard/components/modal/AnnualRequest';
import AnnualMailAccept from './pages/topic/dashboard/components/modal/AnnualMailAccept';
import AdminPopup from './pages/admin';
import AnnualManageComponent from './pages/admin/annualManage';

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
					<Route path="project" element={<Equipment />} />
					{/* 추후 인력사항 추가 시 아래 주석 해제 */}
					{/* <Route path="project" element={<Project />} /> */}
					<Route path="equipment" element={<Equipment />} />
					<Route path="profile" element={<Equipment />} />
					<Route path="seminar" element={<Equipment />} />
					<Route path="board" element={<Summary />} />
					<Route path="suggestions" element={<Equipment />} />
					<Route path="signup" element={<SignUp />} />
				</Route>
				<Route path="external" element={<AdminPopup />}>
					<Route path="mailAccept/*" element={<AnnualMailAccept />} />
				</Route>
				<Route path="admin" element={<Topic />}>
					<Route path="annualManage" element={<AnnualManageComponent />} />
				</Route>
				<Route path="/" element={<Navigate to="/auth/login" replace />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
		</>
	);
};

export default App;
