import { Navigate, Route, Routes } from 'react-router-dom';

import { ReactQueryDevtools } from 'react-query/devtools';

// auth
import AuthLayout from './pages/auth';
import Login from './pages/auth/login';
import FindPassword from './pages/auth/findPassword';
import ChangePassword from './pages/auth/changePassword';

// topic
import Topic from './pages/topic';
import Dashboard from './pages/topic/dashboard';
import Summary from './pages/topic/summary';
import Workforce from './pages/topic/workforce';
import CompanyCalendar from './pages/topic/calendar';
import Project from './pages/topic/project';
import ProjectDetail from './pages/topic/project/projectDetail';
import ProjectModify from './pages/topic/project/projectModify';
import BusinessDetail from './pages/topic/project/businessDetail';
import BusinessModify from './pages/topic/project/businessModify';
import Equipment from './pages/topic/equipment';
import Notices from './pages/topic/notices';
import NoticesDetail from './pages/topic/notices/noticesDetail';
import NoticesModify from './pages/topic/notices/noticesModify';
import SignUp from './pages/topic/signUp';
import Password from './pages/topic/password';

// error
import NotFound from './pages/error/NotFound';
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
					<Route path="findPassword" element={<FindPassword />} />
					<Route path="changePassword/:key" element={<ChangePassword />} />
				</Route>
				<Route path="/topic" element={<Topic />}>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="annRequest" element={<AnnualRequest />} />
					<Route path="summary" element={<Summary />} />
					<Route path="workforce" element={<Workforce />} />
					<Route path="calendar" element={<CompanyCalendar />} />
					<Route path="project" element={<Project />} />
					<Route path="projectDetail" element={<ProjectDetail />} />
					<Route path="projectModify" element={<ProjectModify />} />
					<Route path="businessDetail" element={<BusinessDetail />} />
					<Route path="businessModify" element={<BusinessModify />} />
					<Route path="equipment" element={<Equipment />} />
					<Route path="notices" element={<Notices />} />
					<Route path="noticesDetail" element={<NoticesDetail />} />
					<Route path="noticesModify" element={<NoticesModify />} />
					<Route path="signup" element={<SignUp />} />
					<Route path="password" element={<Password />} />
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
