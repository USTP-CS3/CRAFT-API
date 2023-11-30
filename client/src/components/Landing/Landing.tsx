import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem, Center, Box } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import image from './craft.svg';
import classes from './landing.module.css';

import { useContext } from 'react';
import { TokenContext } from '../../provider/TokenProvider/TokenProvider';

export function Landing() {

  const { Google } = useContext(TokenContext);

  return (
      <Container size="md">
       
        <div className={classes.inner}>
          <div className={classes.content}>
            
          
          <Title className={classes.title}>
            Collaborative Resource And Feedback Tool
          </Title>
          
          <Text c="dimmed" mt="md">
            Made to simplify student life and community development in the University of Science and Technology of Southern Philippines Cagayan De Oro Campus.
          </Text>


          <List
            mt={30}
            spacing="lg"
            size="md"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
            Discover trends and patterns that have been shared by the college's campus community.
            </List.Item>

            <List.Item>
            Identify opportunities with the help of a well-organized report designed for students and faculty.
            </List.Item>
          
          </List>

          
          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control} onClick={() => Google.login()}>
              Get Started
            </Button>

            <Button variant="default" radius="xl" size="md" className={classes.control} onClick={() => Google.logout()}>
              Documentation
            </Button>
          </Group>

        </div>

        <Center> <Image src={image} className={classes.image} />  </Center>
        
      </div>
    </Container>
  );
}
