import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CookiesProvider } from 'react-cookie';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<HashRouter>
		<CookiesProvider>
			<QueryClientProvider client={new QueryClient()}>
				<ChakraProvider>
					<App />
				</ChakraProvider>
			</QueryClientProvider>
		</CookiesProvider>
	</HashRouter>,
);
