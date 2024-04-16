import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CookiesProvider } from 'react-cookie';
import App from './App';
import ModalProvider from './components/modalProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<HashRouter>
		<CookiesProvider>
			<QueryClientProvider client={new QueryClient()}>
				<ChakraProvider>
					<App />
					<ModalProvider />
				</ChakraProvider>
			</QueryClientProvider>
		</CookiesProvider>
	</HashRouter>,
);
