
import React, { createContext, useContext } from 'react';

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { googleLogout } from '@react-oauth/google';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';



interface SessionContextProps {
  children: React.ReactNode;
}

const SessionContext = React.createContext<any>(null);

const SessionProvider = ({ children }: SessionContextProps): JSX.Element => {
  

  const logout = function() {
    googleLogout();
    localStorage.removeItem('session');
    console.log('Logged out...');
  }
   
  const fetchTokenInfo = async function () {
      
      const storage: any = localStorage.getItem('session');
      const session: any = JSON.parse(storage);
  
      let output: any = null;
  
      if (session == null) {
        output = null;
      }
  
      else if (session.type == 'access_token') {
        // fetching userinfo can be done on the client or the server
        const header = { headers: { Authorization: `Bearer ${session.data.access_token}`} };  
        const api = 'https://www.googleapis.com/oauth2/v3/userinfo';      
        const response = (await axios.get(api, header));
        const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
        const expiryTimeInSeconds = currentTimeInSeconds + session.data.expires_in;
  
        output = {
          type: session.type,
          issue_date: currentTimeInSeconds,
          expiry_date: expiryTimeInSeconds,
          family_name: response.data.family_name,
          given_name: response.data.given_name,
          email: response.data.email,
          email_verified: response.data.email_verified,
          picture: response.data.picture,
        }
      }
  
      else if (session.type == 'credential') {
        const response: any = jwtDecode(session.data.credential);
        
        output = {
          type: session.type,
          issue_date: response.iat,
          expiry_date: response.exp,
          family_name: response.family_name,
          given_name: response.given_name,
          email: response.email,
          email_verified: response.email_verified,
          picture: response.picture,
        }
      }
  
      return output;
  }
  
  const verifyToken = async function (token: any) { 
    if (token.issue_date >= token.expiry_date) {
      logout(); // Token has expired, delete it
      console.log('Token has expired. User is not logged in.');
      return null;
    }  
  }

  const buttonOptions = {
    onSuccess: async (response: any) => {
      const token = { type: 'access_token', data: response }        
      localStorage.setItem('session', JSON.stringify(token));
  
      console.log(await fetchTokenInfo());
      console.log('Logged in successfully');   
    },
    onError: () => logout(),
  }
  
  const promptOptions = {
    auto_select: true,
    onSuccess: async (response: any) => {
      const token = { type: 'credential', data: response }
      localStorage.setItem('session', JSON.stringify(token));
  
      console.log(await fetchTokenInfo());
      console.log('Logged in successfully'); 
    },
    onError: () => logout(),
  }
  
  // prompt login
  // Check if 'session' exists in localStorage before calling useGoogleOneTapLogin
  const existingSession = localStorage.getItem('session');

  if (!existingSession) {
    // prompt login only if session does not exist
    useGoogleOneTapLogin(promptOptions);
  }

  // button login
  const login = useGoogleLogin(buttonOptions);

  const Google = {
    login,
    logout,
    fetchTokenInfo,
    verifyToken
  }

  return (
    <SessionContext.Provider value={{ Google }}>
      {children}
    </SessionContext.Provider>
  );
};

const useSessionContext = (): any => {
  return useContext(SessionContext);
};

export { SessionProvider, useSessionContext }