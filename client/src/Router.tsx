import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { App } from './App';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

      <Route index element={<App />} />
    </Route>
  )
);

export function Router() {
  return <RouterProvider router={router} />;
}
