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
import image from './craft.svg';
import classes from './styles/Landing.module.css';
import { useState, useContext } from 'react';
import { IconCheck } from '@tabler/icons-react';
import { TokenContext } from './provider/TokenProvider';
import { ResizeProvider } from './provider/ResizeProvider';

function TextArea() {
	return (
		<>
			<Title className={classes.title}>Collaborative Resource And Feedback Tool</Title>

			<Text mt='md'>
				Made to simplify student life and community development in the University of Science and
				Technology of Southern Philippines Cagayan De Oro Campus.
			</Text>
		</>
	);
}

function ListArea() {
	return (
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
			<List.Item>Discover trends and patterns contributed by the college community.</List.Item>

			<List.Item>Find potential opportunities designed for students and faculty.</List.Item>
		</List>
	);
}

function ButtonArea() {
	const { Google } = useContext(TokenContext);

	return (
		<Group mt={30}>
			<Button radius='xl' size='md' className={classes.control} onClick={() => Google.login()}>
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
	);
}

function ImageArea() {
	return (
		<Center>
			<Image src={image} className={classes.image} />
		</Center>
	);
}

function DeveloperArea() {
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
	return (
		<Container size='md'>
			<Flex
				align='center'
				justify='space-around'
				direction='column'
				style={{ minHeight: '90vh', width: '100%' }}>
				<div className={classes.inner}>
					<div className={classes.content}>
						<TextArea />
						<ListArea />
						<ButtonArea />
					</div>
					<ImageArea />
				</div>
			</Flex>
			<DeveloperArea />
		</Container>
	);
}
