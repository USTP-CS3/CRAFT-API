import {
	Image,
	Container,
	Title,
	Button,
	Group,
	Text,
	List,
	ThemeIcon,
	rem,
	Center,
	Divider,
	Flex,
} from '@mantine/core';
import { useContext, useState } from 'react';
import { IconCheck } from '@tabler/icons-react';
import { TokenContext } from '../provider/TokenProvider';
import { ResizeProvider } from '../provider/ResizeProvider';

import image from '../assets/craft.svg';
import styles from '../styles/Landing.module.css';

function Contributor() {
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

export function Landing() {
	const { Google } = useContext(TokenContext);

	return (
		<Container size='md'>
			<Flex align='center' justify='space-around' direction='column'>
				<Flex align='center' style={{ minHeight: '90vh', width: '100%' }}>
					<div className={styles.inner}>
						<div className={styles.content}>
							<Title className={styles.title}>
								Collaborative Resource And Feedback Tool
							</Title>

							<Text mt='md'>
								Made to simplify student life and community development in the University of
								Science and Technology of Southern Philippines Cagayan De Oro Campus.
							</Text>

							<List
								mt={30}
								spacing='lg'
								size='sm'
								icon={
									<ThemeIcon size={20} radius='xl'>
										<IconCheck
											style={{
												width: rem(12),
												height: rem(12),
											}}
											stroke={1.5}
										/>
									</ThemeIcon>
								}>
								<List.Item>
									Discover trends and patterns contributed by the college community.
								</List.Item>

								<List.Item>
									Find potential opportunities designed for students and faculty.
								</List.Item>
							</List>

							<Group mt={30}>
								<Button
									radius='xl'
									size='md'
									className={styles.control}
									onClick={() => Google.login()}>
									Get Started
								</Button>

								<Button
									variant='default'
									radius='xl'
									size='md'
									className={styles.control}
									onClick={() => Google.logout()}>
									Documentation
								</Button>
							</Group>
						</div>

						<Center>
							{' '}
							<Image src={image} className={styles.image} />{' '}
						</Center>
					</div>
				</Flex>
			</Flex>
			<Contributor />
		</Container>
	);
}
