import { useContext } from 'react';
import { TokenContext } from '@/provider/TokenProvider/TokenProvider';
import { ResizeProvider } from '../../provider/ResizeProvider/ResizeProvider';

import { useState, useEffect } from 'react';
import {
	Stepper,
	Button,
	Group,
	Container,
	Flex,
	Text,
	Checkbox,
	Space,
	Anchor,
	rem,
} from '@mantine/core';

import { DropzoneButton } from '../Dropzone/Dropzone';
import { IconUserCheck, IconMailOpened, IconShieldCheck } from '@tabler/icons-react';

import { IconPhoto, IconArrowLeft, IconUser } from '@tabler/icons-react';

function Setup() {
	const mobileWidthPx = 815;

	const { Google } = useContext(TokenContext);

	const [isMobile, setIsMobile] = useState(window.innerWidth < mobileWidthPx);
	const [active, setActive] = useState(1);
	const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
	const prevStep = () => setActive((current) => (current > 1 ? current - 1 : current));

	const handleResize = (width: number) => {
		width < mobileWidthPx ? setIsMobile(true) : setIsMobile(false);
	};

	const handleclick = () => {
		console.log('clicked');
	};
	const stepper = (
		<>
			<div style={{ paddingTop: 20, paddingBottom: 20 }}>
				<Button
					variant='light'
					size='sm'
					mb={20}
					ml={60}
					leftSection={<IconArrowLeft size={14} />}
					onClick={() => Google.logout()}>
					Sign out
				</Button>
				<Stepper
					active={active}
					pl={30}
					pr={30}
					ml={isMobile ? 0 : 30}
					mb={isMobile ? 80 : 30}
					radius='md'
					onStepClick={setActive}
					orientation={isMobile ? 'horizontal' : 'vertical'}>
					<Stepper.Step
						style={{ height: rem(120) }}
						// style={!isMobile ? { height: rem(120) } : {width: rem(10)}}
						label={'Step 1: Verify Email'}
						description={isMobile ? null : 'Continue with Google'}
						icon={<IconMailOpened style={{ width: rem(18), height: rem(18) }} />}
					/>

					<Stepper.Step
						style={{ height: rem(120) }}
						// style={!isMobile ? { height: rem(120) } : {width: rem(10)}}
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

			<Container>
				{active === 1 && (
					<Container size='xs'>
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
				{active === 2 && <h1>Completed</h1>}
			</Container>
		</>
	);

	return (
		<ResizeProvider callback={handleResize}>
			<Container size='md'>
				{!isMobile && (
					<Flex
						align={'center'}
						justify={'space-between'}
						style={{ minHeight: '100vh', width: '100%' }}>
						{stepper}
					</Flex>
				)}

				{isMobile && (
					<Container p={20} mt={50}>
						{stepper}
					</Container>
				)}
			</Container>
		</ResizeProvider>
	);
}

export { Setup };
