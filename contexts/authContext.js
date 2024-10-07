
import React, { createContext, useContext, useState, ReactNode } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState({'street': '', 'city': '', 'zip': -1, 'country': ''});
  const [authState, setAuthState] = useState(0); // 0 not logged in, 1 logged in, 2 guest

  const login = (email, password) => {
    // fill in the fields and so on..
    setAuthState(1);
  }

  const loginGuest = () => {
    // fill in the fields and so on..
    setAuthState(2);
  }

  const signUp = (email, password) => {
    // fill in the fields and so on..
  }

  return (
    <AuthContext.Provider value={{ name, email, phoneNumber, address, authState, setName, setEmail, setPhoneNumber, setAddress, login, loginGuest }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
