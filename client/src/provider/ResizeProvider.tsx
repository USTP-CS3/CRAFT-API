import { ReactNode, useState, useEffect } from 'react';

interface ResizeProviderProps {
	children: ReactNode;
	callback: (width: number) => void;
}

const ResizeProvider = ({ children, callback }: ResizeProviderProps) => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const handleResize = () => {
		setWindowWidth(window.innerWidth);
		callback(window.innerWidth);
	};

	const handleVisibilityChange = () => {
		// Check if the document visibility state changed
		if (document.visibilityState === 'visible') {
			// Trigger a fake resize event when the developer tools are closed
			handleResize();
		}
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			window.removeEventListener('resize', handleResize);
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	}, []);

	return <>{children}</>;
};

export { ResizeProvider };
