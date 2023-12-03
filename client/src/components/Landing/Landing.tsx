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
import { IconCheck } from '@tabler/icons-react';
import image from './craft.svg';
import classes from './landing.module.css';

import { Contributor } from '../Contributor/Contributor';

import { useContext } from 'react';
import { TokenContext } from '../../provider/TokenProvider/TokenProvider';

export function Landing() {
	const { Google } = useContext(TokenContext);

	return (
		<Container size='md'>
			<Flex align='center' justify='space-around' direction='column'>
				<Flex align='center' style={{ minHeight: '90vh', width: '100%' }}>
					<div className={classes.inner}>
						<div className={classes.content}>
							<Title className={classes.title}>
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
									className={classes.control}
									onClick={() => Google.login()}>
									Get Started
								</Button>

								<Button
									variant='default'
									radius='xl'
									size='md'
									className={classes.control}
									onClick={() => Google.logout()}>
									Documentation
								</Button>
							</Group>
						</div>

						<Center>
							{' '}
							<Image src={image} className={classes.image} />{' '}
						</Center>
					</div>
				</Flex>
			</Flex>
			<Contributor />
		</Container>
	);
}
