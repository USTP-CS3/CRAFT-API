import { useContext, useState, useEffect } from 'react';
import { Typing } from '../Typing/Typing';
import { Upload } from '../Upload/Upload';
import { TokenContext } from '@/provider/TokenProvider/TokenProvider';
import { ResizeProvider } from '../../provider/ResizeProvider/ResizeProvider';
import { IconUserCheck, IconMailOpened, IconShieldCheck, IconLogout2 } from '@tabler/icons-react';
import { Stepper, Button, Title, Container, Flex, Text, Center, rem } from '@mantine/core';
import { TypeAnimation } from 'react-type-animation';

function Setup() {
	const mobileWidthPx = 910;

	const { Google, setAccount } = useContext(TokenContext);
	const [response, setResponse] = useState(null);
	const [isMobile, setIsMobile] = useState(window.innerWidth < mobileWidthPx);
	const [active, setActive] = useState(0);
	const [loading, setLoading] = useState(false);

	const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
	const prevStep = () => setActive((current) => (current > 1 ? current - 1 : current));

	const handleResize = (width: number) => {
		width < mobileWidthPx ? setIsMobile(true) : setIsMobile(false);
	};

	const loadNext = () => {
		setLoading(true);
		setTimeout(() => {
			setTimeout(() => {
				nextStep();
			}, 300);
			setLoading(false);
		}, 600);
	};

	useEffect(() => {
		if (active == 3) {
			setTimeout(() => {
				setAccount('helloworld');
			}, 4500);
		}
	}, [active]);

	useEffect(() => {
		loadNext();
	}, []);

	const stepper = (
		<>
			<div
				style={
					isMobile
						? { paddingLeft: 12, paddingRight: 12 }
						: { paddingTop: 20, paddingBottom: 20 }
				}>
				{isMobile == false && (
					<Container size='xs'>
						<Button
							variant='light'
							size='sm'
							radius='lg'
							mb={30}
							ml={60}
							leftSection={<IconLogout2 size={14} />}
							onClick={() => Google.logout()}>
							Log out
						</Button>
					</Container>
				)}
				<Container size='xs'>
					<Stepper
						active={active}
						pl={isMobile ? 0 : 30}
						pr={isMobile ? 0 : 30}
						mt={isMobile ? -25 : 0}
						ml={isMobile ? 0 : 30}
						mb={isMobile ? 0 : 30}
						size={isMobile ? 'sm' : 'md'}
						radius='md'
						orientation={isMobile ? 'horizontal' : 'vertical'}>
						<Stepper.Step
							style={{ height: rem(120) }}
							label={isMobile ? null : 'Step 1: Verify Email'}
							description={isMobile ? null : 'Continue with Google'}
							icon={<IconMailOpened style={{ width: rem(18), height: rem(18) }} />}
							loading={active == 0 && loading}
						/>

						<Stepper.Step
							style={{ height: rem(120) }}
							label={isMobile ? null : 'Step 2: Create Profile'}
							description={isMobile ? null : 'Check Enrollment Status'}
							icon={<IconShieldCheck style={{ width: rem(20), height: rem(20) }} />}
							loading={active == 1 && loading}
						/>

						<Stepper.Step
							label={isMobile ? null : 'Step 3: Complete Setup'}
							description={isMobile ? null : 'Evaluate Information'}
							icon={<IconUserCheck style={{ width: rem(20), height: rem(20) }} />}
							loading={active == 2 && loading}
						/>
					</Stepper>
				</Container>
			</div>

			<div>
				{active === 0 && (
					<Container size='xs' mt={-10}>
						{isMobile == true && (
							<div style={{ marginBottom: 25 }}>
								<Title order={3}>Step 1: Verify Email</Title>
								<Text fz='md' c='dimmed'>
									Continue with Google
								</Text>
							</div>
						)}
					</Container>
				)}
				{active === 1 && (
					<Container size='xs' mt={-10}>
						{isMobile == true && (
							<div style={{ marginBottom: 25 }}>
								<Button
									// fullWidth={isMobile ? true : false}
									variant='light'
									size='sm'
									radius='lg'
									mb={isMobile ? 20 : 20}
									ml={isMobile ? 0 : 44}
									leftSection={<IconLogout2 size={14} />}
									onClick={() => Google.logout()}>
									Log out
								</Button>
								<Title order={3}>Step 2: Create Profile</Title>
								<Text fz='md' c='dimmed'>
									Check Enrollment Status
								</Text>
							</div>
						)}
						<Upload
							onComplete={(response) => {
								setResponse(response.data.package);
								loadNext();
							}}
						/>
					</Container>
				)}
				{active === 2 && (
					<Container size='xs' mt={-10}>
						{isMobile == true && (
							<div style={{ marginBottom: 25 }}>
								<Title order={3}>Step 3: Complete Setup</Title>
								<Text fz='md' c='dimmed'>
									Evaluate Information
								</Text>
							</div>
						)}
						<Typing
							jsonData={JSON.stringify(response, null, 4)}
							onAnimationComplete={() =>
								setTimeout(() => {
									setLoading(false);
									nextStep();
								}, 50)
							}
						/>
					</Container>
				)}
				{active === 3 && (
					<Container size='xs' mt={-10}>
						{isMobile == true && (
							<div style={{ marginBottom: 25 }}>
								<Title order={3}>Step 3: Complete Setup</Title>
								<Text fz='md' c='dimmed'>
									Evaluate Information
								</Text>
							</div>
						)}

						<div style={isMobile ? { paddingTop: 100 } : { minWidth: 250, marginRight: 150 }}>
							<Flex direction='column' justify='space-around' align='center'>
								<Title mb={20}>Done!</Title>
								<TypeAnimation
									sequence={['Redirecting you to the dashboard...', 500]}
									style={{ color: '#ccc' }}
									speed={50}
								/>
							</Flex>
						</div>
					</Container>
				)}
			</div>
		</>
	);

	return (
		<ResizeProvider callback={handleResize}>
			<Container size='md'>
				{isMobile ? (
					<div style={{ paddingTop: 30, paddingBottom: 30 }}>{stepper}</div>
				) : (
					<Flex
						mt={isMobile ? 30 : 0}
						pb={isMobile ? 90 : 0}
						direction={isMobile ? 'column' : 'row'}
						align={isMobile ? '' : 'center'}
						justify={isMobile ? 'center' : 'space-between'}
						style={{ minHeight: '100vh', width: '100%' }}>
						{stepper}
					</Flex>
				)}
			</Container>
		</ResizeProvider>
	);
}

export { Setup };
