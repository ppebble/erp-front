import { Navigate, Route, Routes } from 'react-router-dom';

import { ReactQueryDevtools } from 'react-query/devtools';

// auth
import AuthLayout from './pages/auth';
import Login from './pages/auth/login/Login';

// topic
import Topic from './pages/topic';
import Dashboard from './pages/topic/dashboard';
// import NFTMarketplace from './pages/topic/marketplace';
import AnnualRequest from './pages/topic/dashboard/components/modal/AnnualRequest';
import Summary from './pages/topic/summary';
import Workforce from './pages/topic/workforce';
import CompanyCalendar from './pages/topic/calendar';
import Project from './pages/topic/project';
import ProjectDetail from './pages/topic/project/projectDetail';
import Equipment from './pages/topic/equipment';
import News from './pages/topic/notices/news';
import Seminar from './pages/topic/notices/seminar';
import Free from './pages/topic/notices/free';
import Notice from './pages/topic/notices/notice';
import SignUp from './pages/topic/signUp';
import Password from './pages/topic/password';
import Upload from './pages/topic/notices/upload'; // 업로드 테스트

// error
import NotFound from './pages/error/NotFound';

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
					<Route path="news" element={<News />} />
					<Route path="seminar" element={<Seminar />} />
					<Route path="free" element={<Free />} />
					<Route path="notice" element={<Notice />} />
					<Route path="signup" element={<SignUp />} />
					<Route path="password" element={<Password />} />
					<Route path="upload" element={<Upload />} />
				</Route>
				<Route path="/" element={<Navigate to="/auth/login" replace />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
		</>
	);
};

export default App;
