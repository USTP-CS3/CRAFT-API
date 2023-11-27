
import { createContext, useEffect, useState } from 'react';
import PocketBase from 'pocketbase';

const Server = new PocketBase('http://127.0.0.1:8090');

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

  const [Token, setToken] = useState<any>(() => {
    const storedToken = localStorage.getItem('pocketbase_auth');
    return (storedToken) 
      ? JSON.parse(storedToken)
      : null;
  });

  const [AccountModel, setAccountModel] = useState<any>(() => {
    return (Token) 
      ? Server.authStore.model
      : null;
  });

  useEffect(() => {
    if (Server.authStore.isValid) {
      Server.collection('Account').authRefresh();
      console.log(Server.authStore.model);
    }
    else {
      Pocketbase.logout();
    }
  }, []);

  const Pocketbase = {

    authWithProvider: async () => {
      const accountCollection = Server.collection('Account');
      const authData = await accountCollection
        .authWithOAuth2({ provider: 'google' });
      const meta = authData.meta;
      
      if (meta?.isNew) {
        const response = await fetch(meta.avatarUrl);
        const file = await response.blob();
        const metaData = {
          meta_name: meta.name,
          avatar: file,
        }
        await accountCollection.update(authData.record.id, metaData);
      }
      return authData;
    },

    
    login: async () => {
      try {
        const authData = await Pocketbase.authWithProvider();
        setToken(authData);
        
        const modelData = Server.authStore.model!;
        setAccountModel(modelData);
      } 
      catch (err) { console.error(err); Pocketbase.logout(); }
    },


    logout: () => {
      Server.authStore.clear();
      localStorage.clear();
      setToken(null);
      setAccountModel(null);
    }
  };


  return (
    <TokenContext.Provider value={{ Pocketbase, AccountModel, Server }}>
      {children}
    </TokenContext.Provider>
  );
};

export { TokenProvider, TokenContext }