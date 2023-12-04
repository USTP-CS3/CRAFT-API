import { useContext, useState, useEffect } from 'react';
import { Typing } from '../components/Typing';
import { Dropfile } from '../components/Dropfile';
import { TokenContext } from '../provider/TokenProvider';
import { ResizeProvider } from '../provider/ResizeProvider';
import { IconUserCheck, IconMailOpened, IconShieldCheck, IconLogout2 } from '@tabler/icons-react';
import { Stepper, Button, Title, Container, Flex, Text, Center, rem } from '@mantine/core';
import { TypeAnimation } from 'react-type-animation';

function Setup() {
	const mobileWidthPx = 910;

	const { Google, setAccount } = useContext(TokenContext);

	const [isMobile, setIsMobile] = useState(window.innerWidth < mobileWidthPx);
	const [activeStep, setActiveStep] = useState(0);
	const [loadingStep, setLoadingStep] = useState(false);
	const [responsePackage, setResponsePackage] = useState(null);

	const nextStep = () => setActiveStep((current) => (current < 4 ? current + 1 : current));
	const prevStep = () => setActiveStep((current) => (current > 1 ? current - 1 : current));

	const loadNext = () => {
		setLoadingStep(true);
		setTimeout(() => {
			setTimeout(() => {
				nextStep();
			}, 300);
			setLoadingStep(false);
		}, 600);
	};

	const handleResize = (width: number) =>
		width < mobileWidthPx ? setIsMobile(true) : setIsMobile(false);

	useEffect(() => {
		if (activeStep == 3) setTimeout(() => setAccount('helloworld'), 4500);
	}, [activeStep]);

	useEffect(() => loadNext(), []);

	const StepperComponent = () => {
		const Steps = [
			{
				title: 'Step 1: Verify Email',
				description: 'Continue with Google',
				icon: <IconMailOpened style={{ width: rem(18), height: rem(18) }} />,
			},
			{
				title: 'Step 2: Create Profile',
				description: 'Check Enrollment Status',
				icon: <IconShieldCheck style={{ width: rem(20), height: rem(20) }} />,
			},
			{
				title: 'Step 3: Extract Credentials',
				description: 'Evaluate Information',
				icon: <IconUserCheck style={{ width: rem(20), height: rem(20) }} />,
			},
			{
				title: 'Setup Complete!',
				description: 'Redirecting you to the dashboard...',
				icon: null,
			},
		];

		function MobileStepText(step: number) {
			return (
				<>
					<Title order={3}>{Steps[step].title}</Title>
					<Text fz='md' c='dimmed'>
						{Steps[step].description}
					</Text>
				</>
			);
		}

		function LogoutButton() {
			const Logout = () => {
				return (
					<Button
						variant='light'
						size='sm'
						radius='lg'
						mb={isMobile ? 15 : 30}
						ml={isMobile ? 0 : 60}
						leftSection={<IconLogout2 size={14} />}
						onClick={() => Google.logout()}>
						Log out
					</Button>
				);
			};

			return isMobile == true ? (
				<Logout />
			) : (
				<Container size='xs'>
					<Logout />
				</Container>
			);
		}

		function StepperIndicator() {
			const styles = {
				mobile: {
					container: { paddingLeft: 12, paddingRight: 12, paddingTop: 10, paddingBottom: 10 },
				},
				desktop: {
					container: { paddingTop: 20, paddingBottom: 20 },
				},
			};

			function StepComponent(step: number) {
				return (
					<Stepper.Step
						style={{ height: rem(120) }}
						label={isMobile == false && Steps[step].title}
						description={isMobile == false && Steps[step].description}
						icon={Steps[step].icon}
						loading={activeStep == step && loadingStep}
					/>
				);
			}

			return (
				<div style={isMobile ? styles.mobile.container : styles.desktop.container}>
					{isMobile == false && <LogoutButton />}
					<Container size='xs'>
						<Stepper
							radius='md'
							active={activeStep}
							pl={isMobile ? 0 : 30}
							pr={isMobile ? 0 : 30}
							ml={isMobile ? 0 : 30}
							mb={isMobile ? 0 : 30}
							orientation={isMobile ? 'horizontal' : 'vertical'}>
							{StepComponent(0)}
							{StepComponent(1)}
							{StepComponent(2)}
						</Stepper>
					</Container>
				</div>
			);
		}

		function UploadDropdown() {
			return (
				<Dropfile
					onComplete={(responsePackage) => {
						setTimeout(() => {
							setLoadingStep(true);
							setResponsePackage(responsePackage.data.package);
							loadNext();
						}, 500);
					}}
				/>
			);
		}

		function CodingAnimation() {
			return (
				<Typing
					textData={JSON.stringify(responsePackage, null, 4)}
					onAnimationComplete={() =>
						setTimeout(() => {
							setLoadingStep(false);
							nextStep();
						}, 50)
					}
				/>
			);
		}

		function RedirectAnimation() {
			return (
				<div style={isMobile == false ? { minWidth: 250, marginRight: 150 } : {}}>
					<Flex
						direction='column'
						justify='center'
						align='center'
						style={{ minHeight: '100vh', width: '100%' }}>
						<Title mb={20}>{Steps[3].title}</Title>
						<TypeAnimation
							sequence={[Steps[3].description, 500]}
							style={{ color: '#ccc' }}
							speed={50}
						/>
					</Flex>
				</div>
			);
		}

		function MobileStepper() {
			return (
				<>
					<StepperIndicator />
					<div>
						<Container size='xs' mt={-10}>
							<div style={{ marginBottom: 25 }}>
								{activeStep < 3 && <LogoutButton />}
								{activeStep < 3 && MobileStepText(activeStep)}
								{activeStep === 2 && <CodingAnimation />}
								{activeStep === 3 && <RedirectAnimation />}
							</div>
							{activeStep === 1 && <UploadDropdown />}
						</Container>
					</div>
				</>
			);
		}

		function DesktopStepper() {
			return (
				<Flex
					direction={'row'}
					align={'center'}
					justify={'space-between'}
					style={{ minHeight: '100vh', width: '100%' }}>
					<StepperIndicator />
					<div>
						<Container size='xs' mt={-10}>
							{activeStep === 1 && <UploadDropdown />}
							{activeStep === 2 && <CodingAnimation />}
							{activeStep === 3 && <RedirectAnimation />}
						</Container>
					</div>
				</Flex>
			);
		}

		return isMobile ? <MobileStepper /> : <DesktopStepper />;
	};

	return (
		<ResizeProvider callback={handleResize}>
			<Container size='md'>
				<StepperComponent />
			</Container>
		</ResizeProvider>
	);
}

export { Setup };
