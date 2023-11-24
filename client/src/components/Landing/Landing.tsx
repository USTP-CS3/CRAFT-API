import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem, Center, Box } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

import image from './image.svg';
import classes from './landing.module.css';

import axios from 'axios';
import { googleLogout } from '@react-oauth/google';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';


export function Landing() {


  const handleLoginSuccess = async function (response: any) {
    try {
      console.log(response);

      // fetching userinfo can be done on the client or the server
      const header = { 
        headers: { Authorization: `Bearer ${response.access_token}`}
      };
      const api = 'https://www.googleapis.com/oauth2/v3/userinfo';      
      const user = await axios.get(api, header);

      console.log(user.data);
      console.log('Logged in successfully');
    } 
    
    catch (error) {
      handleLoginFailure();
    }
  };

  const handleLoginFailure = function() {
    console.log('Failed to log in');
  }

  useGoogleOneTapLogin({
    auto_select: true,
    onSuccess: token => handleLoginSuccess(token),
    onError: () => handleLoginFailure(),
  }); 

  const login = useGoogleLogin({
    onSuccess: async token => handleLoginSuccess(token),
    onError: () => handleLoginFailure(),
  });

  const logout = function() {
    googleLogout();
    console.log('Logged out...');
  }


  return (
      <Container size="md">
       
        <div className={classes.inner}>
          <Center> <Image src={image} className={classes.image} />  </Center>
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
            size="md"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Scheduler:</b> Determine whether a specific schedule highlights the most impact.
            </List.Item>

            <List.Item>
              <b>Surveyor:</b> Uncover trends and patterns from student contributed responses.
            </List.Item>
          
          </List>

          
          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control} onClick={() => login()}>
              Get Started
            </Button>

            <Button variant="default" radius="xl" size="md" className={classes.control} onClick={() => logout()}>
              Documentation
            </Button>
          </Group>

        </div>
      </div>
    </Container>
  );
}


