import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { useContext } from 'react';
import { TokenContext } from './provider/TokenProvider/TokenProvider';

import { App } from './App';
import { Setup } from './components/Setup/Setup';
import { Loading } from './components/Loading/Loading';
import { Landing } from './components/Landing/Landing';
import { Dashboard } from './components/Dashboard/Dashboard';


export function Router() {
  const { AccountModel } = useContext(TokenContext);

  
  /**
   * App is the main component of the application.
   * It is rendered at root and any undefined route. 
   * It is private and handled by the state of the token provider.
   * Other routes not in app are public and can be accessed by anyone.
   */
  let app;
  
  // landing
  // if auth is invalid/empty and has no student record
  // Use nullish coalescing operator to provide the default value
  app = AccountModel?.student_id ?? <Landing />;

  // dashboard
  // if auth is valid and has student record
  if (AccountModel && AccountModel.student_id !== '') {
    app = <Dashboard />;
  } 

  // setup
  // if auth is valid and has no student record
  else if (AccountModel && AccountModel.student_id === '') {
    app = <Setup />;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="*" element={app} />
        <Route path="/docs" element={<h1>Documentation</h1>} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
