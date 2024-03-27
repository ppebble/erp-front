import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={new QueryClient()}>
		<App />
	</QueryClientProvider>,
);
