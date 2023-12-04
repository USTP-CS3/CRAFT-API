/**
 *
 * context and providers are used for global state management
 * (eg. access a variable from here to any component in the hierarchy)
 *
 */

import { createContext, useEffect, useState } from 'react';
import { GooglePopup } from './GooglePopup';
import axios from 'axios';

// google console user_account client id
const CLIENT_ID = '89255587017-7rk09mkvbs1630in8u0n8jlsip4q5l6k.apps.googleusercontent.com';

// context allows for the state to be accessed anywhere in the application
const AccountContext = createContext<any>(null);

// provider is a wrapper for the entire application
const AccountProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
	// set the state of the account being used in the application
	const [UserAccount, setUserAccount] = useState<any>(null);
	const [UserToken, setUserToken] = useState<any>(null);
	const [UserData, setUserData] = useState<any>(null);

	function initUser() {
		// set token if its already in local storage
		const token = localStorage.getItem('token');

		// check if account has "student" data
		// if not, redirect to setup page
		axios
			.get(
				'http://localhost:5000/api/student/get_self_data',
				// set the token in the header for axios requests
				{
					headers: {
						Authentication: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				setUserToken(token);
				setUserData(res.data.package);
				setUserAccount(res.data.account);
			})
			.catch((err) => {
				// if token is valid but account has no user data
				if (err.response.data.authenticated == true) {
					// set the user account and token
					// redirect to setup page
					setUserAccount(err.response.data.account);
					setUserToken(token);
					setUserData('setup');
				}
				// if token is invalid or expired, then prompt login
				else if (localStorage.getItem('token')!) {
					// redirect to login page
					setUserData(null);
					setUserToken(null);
					setUserAccount(null);
					// auto login google prompt
					window.google.accounts.id.prompt();
					// proceed to login handler callback
					// see initLoginHandler()
					// this will run initUser() again
				}
				// if token is not in local storage
				else {
					// redirect to login page
					setUserData(null);
					setUserToken(null);
					setUserAccount(null);
				}
			});
	}

	function initLoginHandler() {
		// load and initialize the user_account from the Google Cloud Console
		window.google.accounts.id.initialize({
			auto_select: true,
			client_id: CLIENT_ID,

			// login handler callback
			callback: (response: any) => {
				// set the token in local storage
				const token = response.credential;
				localStorage.setItem('token', token);
				initUser();
			},
		});
	}

	useEffect(() => {
		initLoginHandler();
		initUser();
	}, []);

	const Google = {
		login: () => GooglePopup(),
		logout: () => {
			window.google.accounts.id.disableAutoSelect();
			localStorage.clear();
			setUserAccount(null);
			setUserToken(null);
			setUserData(null);
		},
	};

	return (
		<AccountContext.Provider value={{ UserAccount, UserData, UserToken, Google, initUser }}>
			{children}
		</AccountContext.Provider>
	);
};

export { AccountProvider, AccountContext };
