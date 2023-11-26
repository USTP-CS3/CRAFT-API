import '@mantine/core/styles.css';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { TokenProvider } from './components/TokenProvider/TokenProvider';


function Main() {
  return (
    <TokenProvider>
      <MantineProvider theme={theme}>
        <Router />
      </MantineProvider>
    </TokenProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Main />);
