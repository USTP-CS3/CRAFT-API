import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';

import { GoogleOAuthProvider } from '@react-oauth/google';
const google_client_id = "89255587017-7rk09mkvbs1630in8u0n8jlsip4q5l6k.apps.googleusercontent.com"


import { SessionProvider } from './components/SessionContext/SessionContext';


export default function App() {
  return (
    <GoogleOAuthProvider clientId={google_client_id}>
      <SessionProvider>
        <MantineProvider theme={theme}>
          <Router />
        </MantineProvider>
      </SessionProvider>
    </GoogleOAuthProvider>
  );
}
