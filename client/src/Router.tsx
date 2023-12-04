import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useContext } from 'react';
import { AccountContext } from './provider/AccountProvider';

import { Setup } from './pages/Setup';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';

export function Router() {
	const { UserAccount, UserData } = useContext(AccountContext);

	/**
	 * App is the main component of the application.
	 * It is rendered at root and any undefined route.
	 * It is private and handled by the state of the token provider.
	 * Other routes not in app are public and can be accessed by anyone.
	 */
	let App =
		UserData == null ? (
			<Landing />
		) : UserData == 'setup' ? (
			<Setup />
		) : UserData != null ? (
			<Dashboard />
		) : null;

	return (
		<BrowserRouter>
			<Routes>
				<Route path='*' element={App} />
				<Route path='/docs' element={<h1>Documentation</h1>} />
			</Routes>
		</BrowserRouter>
	);
}
