import '@mantine/core/styles.css';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { TokenProvider } from './provider/TokenProvider';

function Main() {
	return (
		<MantineProvider theme={theme}>
			<TokenProvider>
				<Router />
			</TokenProvider>
		</MantineProvider>
	);
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Main />);
