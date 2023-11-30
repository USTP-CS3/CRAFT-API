/**
 * 
 * context and providers are used for global state management 
 * (eg. access a variable from here to any component in the hierarchy)  
 * 
 */

import { createContext, useEffect, useState } from 'react';
import { GooglePopup } from './GooglePopup';
import axios from 'axios';

// google console user_account client id
const CLIENT_ID = '89255587017-7rk09mkvbs1630in8u0n8jlsip4q5l6k.apps.googleusercontent.com';

// context allows for the state to be accessed anywhere in the application
const TokenContext = createContext<any>(null);

// provider is a wrapper for the entire application
const TokenProvider = ({ children }: { children: React.ReactNode }): 
JSX.Element => {

  // set the state of the account being used in the application
  const [Account, setAccount] = useState<any>(null);


  const checkExistAccount = (token: string) => {
    // set the token in the header for axios requests
    const config = {
      headers: {
        Authentication: `Bearer ${token}`,
      },
    };
            
    // check if account has student data
    // if not, redirect to setup page
    axios.get('http://localhost:5000/api/student', config)
      .then(res => setAccount(res.data.package))
      .catch(err => {
        // if token is valid but account has no student data
        if (err.response.data.authenticated == true) {
          setAccount('setup');
        }
        // if token is invalid or expired
        else if (localStorage.getItem('token')!) {
          window.google.accounts.id.prompt();
          setAccount('none');
        } 
        // if token is not in local storage
        else setAccount('none');
      });
  }



  useEffect(() => {

    // set token if its already in local storage
    checkExistAccount(localStorage.getItem('token')!);

    // load and initialize the user_account from the Google Cloud Console
    window.google.accounts.id.initialize({
      auto_select: true,
      client_id: CLIENT_ID, 

      callback: (response: any) => {
        // set the token in local storage
        const token = response.credential;
        localStorage.setItem('token', token);        
        checkExistAccount(token);
      },
    });

    
  }, []);
  


  const Google = {
    login: () => GooglePopup(),
    logout: () => {
      window.google.accounts.id.disableAutoSelect();
      localStorage.clear();
      setAccount('none');
    },
  };


  return (
    <TokenContext.Provider value={{ Account, Google }}>
      {children}
    </TokenContext.Provider>
  );
};

export { TokenProvider, TokenContext }