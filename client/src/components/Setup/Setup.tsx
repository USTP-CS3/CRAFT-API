import { useContext } from 'react';
import { TokenContext } from '@/provider/TokenProvider/TokenProvider';
import { ResizeProvider } from '../../provider/ResizeProvider/ResizeProvider';

import { useState, useEffect } from 'react';
import { Stepper, Button, Title, Container, Flex, Text, Checkbox, Space, rem } from '@mantine/core';

import { DropzoneButton } from '../Dropzone/Dropzone';
import { IconUserCheck, IconMailOpened, IconShieldCheck } from '@tabler/icons-react';

import { IconPhoto, IconArrowLeft, IconUser } from '@tabler/icons-react';

function Setup() {
	const mobileWidthPx = 815;

	const { Google } = useContext(TokenContext);

	const [isMobile, setIsMobile] = useState(window.innerWidth < mobileWidthPx);
	const [active, setActive] = useState(0);
	const [loading, setLoading] = useState(true);

	const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
	const prevStep = () => setActive((current) => (current > 1 ? current - 1 : current));

	const handleResize = (width: number) => {
		width < mobileWidthPx ? setIsMobile(true) : setIsMobile(false);
	};

	const handleclick = () => {
		console.log('clicked');
	};

	useEffect(() => {
		setTimeout(() => {
			setTimeout(() => {
				nextStep();
			}, 300);
			setLoading(false);
		}, 600);
	}, []);

	const stepper = (
		<>
			<div style={isMobile ? {} : { paddingTop: 20, paddingBottom: 20 }}>
				<Container size='sm'>
					<Button
						fullWidth={isMobile ? true : false}
						variant='light'
						size='sm'
						mb={isMobile ? 0 : 20}
						ml={isMobile ? 0 : 44}
						leftSection={<IconArrowLeft size={14} />}
						onClick={() => Google.logout()}>
						Sign out
					</Button>
				</Container>
				<Stepper
					active={active}
					pl={isMobile ? 15 : 30}
					pr={isMobile ? 15 : 30}
					mt={isMobile ? -25 : 0}
					ml={isMobile ? 0 : 30}
					mb={isMobile ? 0 : 30}
					radius='md'
					orientation={isMobile ? 'horizontal' : 'vertical'}>
					<Stepper.Step
						style={{ height: rem(120) }}
						label={isMobile ? null : 'Step 1: Verify Email'}
						description={isMobile ? null : 'Continue with Google'}
						icon={<IconMailOpened style={{ width: rem(18), height: rem(18) }} />}
						loading={loading}
					/>

					<Stepper.Step
						style={{ height: rem(120) }}
						label={isMobile ? null : 'Step 2: Create Profile'}
						description={isMobile ? null : 'Check Enrollment Status'}
						icon={<IconShieldCheck style={{ width: rem(20), height: rem(20) }} />}
					/>

					<Stepper.Step
						label={isMobile ? null : 'Step 3: Complete Setup'}
						description={isMobile ? null : 'Proceed to Dashboard'}
						icon={<IconUserCheck style={{ width: rem(20), height: rem(20) }} />}
					/>
				</Stepper>
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
								<Title order={3}>Step 2: Create Profile</Title>
								<Text fz='md' c='dimmed'>
									Check Enrollment Status
								</Text>
							</div>
						)}
						<DropzoneButton />
						<Flex mt={50} align={'center'}>
							<Checkbox />
							<Space w={10} />
							<Text fz='xs' c='dimmed'>
								By checking the box, you agree to submit your own Certificate of
								Registration to convey official enrollment, and adhere to university
								policies and regulations. Your data is shared with university departments
								and organizations, but it remains anonymous to other users.
							</Text>
						</Flex>
					</Container>
				)}
				{active === 2 && (
					<Container size='xs' mt={-10}>
						{isMobile == true && (
							<div style={{ marginBottom: 25 }}>
								<Title order={3}>Step 3: Complete Setup</Title>
								<Text fz='md' c='dimmed'>
									Proceed to Dashboard
								</Text>
							</div>
						)}
					</Container>
				)}
			</div>
		</>
	);

	return (
		<ResizeProvider callback={handleResize}>
			<Container size='md'>
				<Flex
					mt={isMobile ? 30 : 0}
					pb={isMobile ? 90 : 0}
					direction={isMobile ? 'column' : 'row'}
					align={isMobile ? '' : 'center'}
					justify={isMobile ? 'center' : 'space-between'}
					style={{ minHeight: '100vh', width: '100%' }}>
					{stepper}
				</Flex>
			</Container>
		</ResizeProvider>
	);
}

export { Setup };
