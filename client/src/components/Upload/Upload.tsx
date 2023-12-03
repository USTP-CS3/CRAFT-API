import axios from 'axios';
import { useRef, useState, useEffect, useContext } from 'react';
import {
	Text,
	Group,
	Button,
	Flex,
	Space,
	Checkbox,
	LoadingOverlay,
	rem,
	useMantineTheme,
} from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconCheck, IconDownload } from '@tabler/icons-react';
import { TokenContext } from '../../provider/TokenProvider/TokenProvider';
import classes from './DropzoneButton.module.css';

export function Upload({ onComplete }: { onComplete: (res: any) => void }) {
	const theme = useMantineTheme();
	const openRef = useRef<() => void>(null);

	// state to store the selected file
	const [Response, setResponse] = useState(null);
	const [isSuccess, setSuccess] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [isReject, setReject] = useState(false);
	const [isAgree, setAgree] = useState(false);
	const [File, setFile] = useState<File | null>(null);

	const { Token } = useContext(TokenContext);

	const handleDrop = (files: File[]) => {
		// handle only the first file
		setFile(files[0]);
	};

	useEffect(() => {
		setTimeout(() => setReject(false), 2000);
	}, [isReject]);

	useEffect(() => {
		// api extractor request and get data
		if (File && isReject == false) {
			// set loading to true
			setLoading(true);
			setAgree(false);
			setReject(false);
			setSuccess(false);

			// set the token in the header for axios requests
			const config = {
				headers: {
					Authentication: `Bearer ${Token}`,
				},
			};

			// create a form data object
			const form = new FormData();
			form.append('corpdf', File);

			// send a POST request using Axios
			axios
				.post('http://localhost:5000/api/student/setup', form, config)
				.then((res: any) => {
					setResponse(res);
					setSuccess(true);
					setLoading(false);
				})
				.catch((error) => {
					setReject(true);
					setLoading(false);
				});
		}
	}, [File]);

	useEffect(() => {
		if (isAgree && Response) {
			onComplete(Response);
		}
	}, [isAgree]);

	return (
		<div>
			<div className={classes.wrapper}>
				<Dropzone
					loading={isLoading}
					loaderProps={{ type: 'dots' }}
					openRef={openRef}
					onDrop={handleDrop}
					className={classes.dropzone}
					radius='md'
					accept={[MIME_TYPES.pdf]}
					maxSize={1 * 1024 ** 2}
					onReject={(fileRejections: any[]) => {
						fileRejections.forEach(({ file, errors }) => setReject(true));
					}}>
					<div style={{ pointerEvents: 'none' }}>
						<Group justify='center'>
							<Dropzone.Accept>
								<IconDownload
									style={{ width: rem(50), height: rem(50) }}
									color={theme.colors.blue[6]}
									stroke={1.5}
								/>
							</Dropzone.Accept>
							<Dropzone.Reject>
								<IconX
									style={{ width: rem(50), height: rem(50) }}
									color={theme.colors.red[6]}
									stroke={1.5}
								/>
							</Dropzone.Reject>
							<Dropzone.Idle>
								{isSuccess ? (
									<IconCheck
										style={{ width: rem(50), height: rem(50) }}
										color={theme.colors.green[6]}
										stroke={1.5}
									/>
								) : isReject ? (
									<IconX
										style={{ width: rem(50), height: rem(50) }}
										color={theme.colors.red[6]}
										stroke={1.5}
									/>
								) : (
									<IconCloudUpload
										style={{ width: rem(50), height: rem(50) }}
										stroke={1.5}
									/>
								)}
							</Dropzone.Idle>
						</Group>

						<Text ta='center' fw={700} fz='lg' mt='xl'>
							<Dropzone.Accept>Drop files here</Dropzone.Accept>
							<Dropzone.Reject>Invalid Format</Dropzone.Reject>
							<Dropzone.Idle>
								{isSuccess ? (
									<span>{File?.name}</span>
								) : isReject ? (
									<span>Invalid Format</span>
								) : (
									<span>Upload Certificate of Registration</span>
								)}
							</Dropzone.Idle>
						</Text>
						<Text ta='center' fz='xs' mt='xs' c='dimmed'>
							{isSuccess ? (
								<span>Check the box below to proceed.</span>
							) : isReject ? (
								<span>Please select another file</span>
							) : (
								<span>Must be in PDF Format and Less than 1Mb</span>
							)}
						</Text>
					</div>
				</Dropzone>

				{!isLoading && (
					<Button
						className={classes.control}
						size='sm'
						radius='md'
						onClick={() => openRef.current?.()}>
						Select files
					</Button>
				)}
			</div>

			<Flex mt={50} align={'center'}>
				<Checkbox
					checked={isAgree}
					onChange={(click) => setAgree(click.currentTarget.checked)}
					disabled={!isSuccess}
				/>
				<Space w={10} />
				<Text fz='xs' c='dimmed'>
					By checking the box, you agree to submit your own Certificate of Registration to
					convey official enrollment, and adhere to university policies and regulations. Your
					data is shared with departments and student organizations, but it remains anonymous
					to other users.
				</Text>
			</Flex>
		</div>
	);
}
