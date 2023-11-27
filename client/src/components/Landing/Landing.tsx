import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem, Center, Box } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import image from './image.svg';
import classes from './landing.module.css';

import { useContext } from 'react';
import { TokenContext } from '../../provider/TokenProvider/TokenProvider';

export function Landing() {

  const { Pocketbase } = useContext(TokenContext);

  return (
      <Container size="md">
       
        <div className={classes.inner}>
          <div className={classes.content}>
            
          
          <Title className={classes.title}>
            Collaborative Resource And Feedback Tool
          </Title>
          
          <Text c="dimmed" mt="md">
            Made to simplify student life and community development in the University of Science and Technology of Southern Philippines.
          </Text>


          <List
            mt={30}
            spacing="md"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Scheduler:</b> Analyze whether specific schedules align under certain circumstances.
            </List.Item>

            <List.Item>
              <b>Surveyor:</b> Find out about trends and patterns in responses contributed by students.
            </List.Item>
          
          </List>

          
          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control} onClick={() => Pocketbase.login()}>
              Get Started
            </Button>

            <Button variant="default" radius="xl" size="md" className={classes.control} onClick={() => Pocketbase.logout()}>
              Documentation
            </Button>
          </Group>

        </div>

        <Center> <Image src={image} className={classes.image} />  </Center>
        
      </div>
    </Container>
  );
}
