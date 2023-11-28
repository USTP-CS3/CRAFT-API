/**
 * 
 * context and providers are used for global state management 
 * (eg. access a variable from here to any component in the hierarchy)  
 * 
 */

import { createContext, useEffect, useState } from 'react';
import { GooglePopup } from './GooglePopup';

// google console user_account client id
const CLIENT_ID = '89255587017-7rk09mkvbs1630in8u0n8jlsip4q5l6k.apps.googleusercontent.com';


// context allows for the state to be accessed anywhere in the application
const TokenContext = createContext<any>(null);

// provider is a wrapper for the entire application
const TokenProvider = ({ children }: { children: React.ReactNode }): 
JSX.Element => {

  // set the state of the account being used in the application
  const [Account, setAccount] = useState<any>(null);

  useEffect(() => {
    // load and initialize the user_account from the Google Cloud Console
    window.google.accounts.id.initialize({
      auto_select: true,
      client_id: CLIENT_ID, 
      callback: (response: any) => {
        const token = response.credential;
        localStorage.setItem('token', token);
        
        console.log(token);

        // -- TODO --
        // check if account has student data
        // if not, redirect to setup page

        // extract the data from the token 
        // and set it as the account state
      },
    });

    // check if token is stored in local storage
    const storedToken = localStorage.getItem('token');
    if (storedToken !== null) {

      // -- TODO --
      // make a get request to the backend to verify the token

      // if token is invalid
      //    window.google.accounts.id.prompt();
      
      // otherwise,
      //    check if account has student data
      //    if not, redirect to setup page 
      //    set the account 
    }
  }, []);
  
  const Google = {
    login: () => GooglePopup(),
    logout: () => {
      window.google.accounts.id.disableAutoSelect();
      localStorage.clear()
      setAccount(null);
    },
  };


  return (
    <TokenContext.Provider value={{ Account, Google }}>
      {children}
    </TokenContext.Provider>
  );
};

export { TokenProvider, TokenContext }