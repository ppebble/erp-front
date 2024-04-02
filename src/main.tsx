import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<HashRouter>
		<ChakraProvider>
			<QueryClientProvider client={new QueryClient()}>
				<App />
			</QueryClientProvider>
		</ChakraProvider>
	</HashRouter>,
);
