/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ApiService from './services/ApiService';
import config from './config';
import auth from './utils/auth';
import { AuthProvider } from './providers/AuthProvider';
import { ExpensesProvider } from './providers/ExpensesProvider';
import { Providers } from './providers/Providers';
import RootStack from './RootStack';
import Test from './components2/Test';

const { dataParser } = config.helperFunctions;
const Stack = createStackNavigator();
const initialState = auth.isAuthenticated();

function App () {
  const [currentUser, setCurrentUser] = useState([]);
  const [userEntries, setUserEntries] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  const getUserData = (end, id) => {
    useEffect(() => {
      ApiService.profile(end, id)
        .then((data) => {
          setUserEntries(data[0].entries);
        });
    }, []);
  };

  const postOne = (arr, ext, id) => {
    const cleanedObj = dataParser(arr);
    ApiService.postOne(cleanedObj, ext, id)
      .then((data) => {
        setUserEntries([...userEntries, data]);
      });
  };

  const createUser = (arr, ext) => {
    const cleanedObj = dataParser(arr);
    ApiService.postOne(cleanedObj, ext)
      .then((data) => {
        setCurrentUser([...currentUser, data]);
      });
  };

  const postUser = (arr) => {
    ApiService.postOne(arr, 'register')
      .then((data) => {
        setCurrentUser(data);
      });
  };

  const deleteOne = (id) => {
    ApiService.deleteOne(id)
      .then(() => {
        setUserEntries((list) => list.filter((el) => el.id !== id));
      });
  };

  const resetUser = () => {
    setCurrentUser([]);
    setUserEntries([]);
  };

  return (
    <Providers />
  );
}

export default App;
