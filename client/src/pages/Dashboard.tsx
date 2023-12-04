import { useContext } from 'react';
import { AccountContext } from '../provider/AccountProvider';

const Dashboard = () => {
	const { Google } = useContext(AccountContext);

	return (
		<>
			<h1>this is the dashboard page</h1>
			<button onClick={() => Google.logout()}>Logout</button>
		</>
	);
};

export { Dashboard };
