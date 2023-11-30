import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useContext } from 'react';
import { TokenContext } from './provider/TokenProvider/TokenProvider';

import { Setup } from './components/Setup/Setup';
import { Landing } from './components/Landing/Landing';
import { Dashboard } from './components/Dashboard/Dashboard';

export function Router() {
  const { Account } = useContext(TokenContext);

  /**
   * App is the main component of the application.
   * It is rendered at root and any undefined route.
   * It is private and handled by the state of the token provider.
   * Other routes not in app are public and can be accessed by anyone.
   */
  let App =
    Account === 'none' ? <Landing /> : 
    Account === 'setup' ? <Setup /> : 
    Account != null ? <Dashboard /> : null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={App} />
        <Route path="/docs" element={<h1>Documentation</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
