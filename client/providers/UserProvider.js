import React, { useContext, useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from './AuthProvider';
import ApiService from '../services/ApiService';

const UserContext = React.createContext();
const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [authenticated, setAuthenticated] = useAuth();

  const login = async (credentials) => {
    const res = await ApiService.userLogin(credentials, 'login');
    if (res.error) {
      Alert.alert(`${res.message}`);
    } else {
      setUser(res);
      setAuthenticated(true);
    }
  };

  return (
    <UserContext.Provider value={[user, login]}>
      {children}
    </UserContext.Provider>
  );
};

export {
  UserProvider,
  useUser,
};
