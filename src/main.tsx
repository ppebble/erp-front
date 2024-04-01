import ReactDOM from 'react-dom/client';
import './index.css';

import { HashRouter } from 'react-router-dom';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<HashRouter>
		<QueryClientProvider client={new QueryClient()}>
			<App />
		</QueryClientProvider>
	</HashRouter>,
);
