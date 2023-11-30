import { Image, Flex, Container, Divider } from '@mantine/core';

export function Contributor() {
	return (
		<Container size='xs' pt={50} pb={20}>
			<Divider
				my='xs'
				label='Developed by the Computer Science Student Society (CS³) of USTP CDO'
				labelPosition='center'
			/>
		</Container>
	);
}
