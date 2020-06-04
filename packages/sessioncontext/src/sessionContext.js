import React, { createContext, useState, useEffect } from 'react';
import redirectTo from "@cc-test2/redirectto";

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {

  const [ token, setToken ] = useState('');
  const [ session, setSession ] = useState({});

  useEffect(() => {
    getSession();
  }, []);

  const getSession = async () => {
    const t = Cookies.get(process.env.TOKEN_KEY);
    await oauth.setToken(t);
    try {
      const res = await oauth.call('/session');
      if(res.code === 403){
        throw new Error();
      }
      setToken(t);
      setSession(res);
    } catch (e) {
      redirectTo(`${process.env.LOGIN_HOST}`); // status: 301
    }
  };

  const logout = () => {
    oauth.call('/logout', { method: 'post'})
      .then(async () => {
        await Cookies.remove(`${process.env.TOKEN_KEY}`);
        await redirectTo(`${process.env.LOGIN_HOST}`);
      });
  };

  return <SessionContext.Provider
    value={{
      token,
      session,
      logout
    }}
  >
    {children}
  </SessionContext.Provider>
};

