import { useState } from 'react';
import { Container, Center, Divider, Text } from '@mantine/core';
import { ResizeProvider } from '../../provider/ResizeProvider/ResizeProvider';

export function Contributor() {
	const mobileWidthPx = 380;
	const [isMobile, setIsMobile] = useState(window.innerWidth < mobileWidthPx);

	const handleResize = (width: number) => {
		window.innerWidth < mobileWidthPx ? setIsMobile(true) : setIsMobile(false);
	};

	return (
		<ResizeProvider callback={handleResize}>
			<Container size='xs' pt={0} pb={20}>
				{isMobile ? (
					<Center>
						<Text c='dimmed' size='xs'>
							Developed by the Computer Science Student Society (CS³)
						</Text>
					</Center>
				) : (
					<Divider
						label='Developed by the Computer Science Student Society (CS³)'
						labelPosition='center'
					/>
				)}
			</Container>
		</ResizeProvider>
	);
}
