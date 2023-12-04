import '@mantine/core/styles.css';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { AccountProvider } from './provider/AccountProvider';

function Main() {
	return (
		<MantineProvider theme={theme}>
			<AccountProvider>
				<Router />
			</AccountProvider>
		</MantineProvider>
	);
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Main />);
