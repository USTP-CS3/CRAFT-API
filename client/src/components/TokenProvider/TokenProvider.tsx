
import { createContext, useEffect, useState } from 'react';

import PocketBase from 'pocketbase';
const pb_server = 'http://127.0.0.1:8090';
const pb        = new PocketBase(pb_server);

const TokenContext = createContext<any>(null);
const TokenProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {

  // TODO: if replace pocketbase and using the google api
  // useEffect(() => {
    // TODO: if replace pocketbase and using the google api
    // window.google.accounts.id.initialize( 
    //   { // Load and initialize the user_account from the Google Cloud Console
    //     client_id: '89255587017-7rk09mkvbs1630in8u0n8jlsip4q5l6k.apps.googleusercontent.com', 
    //     callback: handleCredentialResponse
    //   } 
    // );
    // window.google.accounts.id.prompt();
  // }, []);
  
  // const Google = {
  //   login: () => GooglePopup(),
  //   logout: () => localStorage.clear(),
  // };

  
  const [Token, setToken] = useState<any>(null);

  const Pocketbase = {


    authWithProvider: async () => {
      
      const accountCollection = pb.collection('Account');

      const authData = await accountCollection
        .authWithOAuth2({ provider: 'google' });
    
      const meta = authData.meta;
    
      if (meta?.isNew) {
        // const formData = new FormData();
        const response = await fetch(meta.avatarUrl);
        const file = await response.blob();

        const data = {
          meta_name: meta.name,
          avatar: file,
        }
    
        await accountCollection.update(authData.record.id, data);
      }
      return authData;
    },

    
    login: async () => {
      try {
        const authData = await Pocketbase.authWithProvider();
        setToken(authData);
      } 
      catch (err) { console.error(err); Pocketbase.logout(); }
    },


    logout: () => {
      pb.authStore.clear();
      localStorage.clear();
      setToken(null);
    }
  };

  return (
    <TokenContext.Provider value={{ Pocketbase, Token }}>
      {children}
    </TokenContext.Provider>
  );
};

export { TokenProvider, TokenContext }