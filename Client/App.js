import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import styles from './styles';
import ApiService from './ApiService';
import Home from './screens/home/Home';
import Login from './screens/login/Login';
import Form from './screens/form/Form';
import Entries from './screens/entries/Entries';
import Search from './screens/search/Search';
import Analysis from './screens/analysis/Analysis';
import Ui from './screens/ui/Ui';

import config from './config';

const { delHelper, postHelper, dataParser } = config.helperFunctions;
const Stack = createStackNavigator();

function App () {

  const [entries, setEntries] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [userEntries, setUserEntries] = useState([]);

  useEffect(() => {
    ApiService.getAll('entries')
      .then((data) => {
        setEntries(data);
      });
  }, []);

  // const postOne = (arr, ext) => {
  //   return postHelper(dataParser, arr, ApiService.postOne, setEntries, entries, ext);
  // };

  const postOne = (arr, ext) => {
    return postHelper(dataParser, arr, ApiService.postOne, setUserEntries, userEntries, ext);
  };

  const createUser = (arr, ext) => {
    return postHelper(dataParser, arr, ApiService.postOne, setCurrentUser, currentUser, ext);
  };

  const postUser = (arr, ext) => {
    ApiService.postOne(arr, 'register')
      .then((data) => {
        setCurrentUser(data);
      });
  };

  const deleteOne = (id) => {
    return delHelper(ApiService.deleteOne, id, setEntries);
  };

  const resetUser = () => {
    setCurrentUser([]);
    setUserEntries([]);
  };

  const getUserData = (end, id) => {
    // console.log('INSIDE APP GET USER DATA-->');
    useEffect(() => {
      ApiService.profile(end, id)
        .then((data) => {
          console.log('data INSIDE USE EFFECT-->', data);
          console.log('data[0] INSIDE USE EFFECT-->', data[0]);
          console.log('data[0].entries INSIDE USE EFFECT-->', data[0].entries);
          setUserEntries(data[0].entries);
        });
    }, []
    );
  };

  // added 15/11
  const loginUser = (user, end) => {
    // console.log('INSIDE APP.JS-->');

    // console.log('user-->', user);

    ApiService.login(user, 'login')
      .then((data) => {
        // console.log('data-->', data);
        setCurrentUser([data]);
      });
  };


  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name='Home'>
            {(props) => <Home {...props} component={Home} resetUser={resetUser} entries={entries} getUserData={getUserData} userEntries={userEntries} />}
          </Stack.Screen>

          <Stack.Screen name='Login'>
            {(props) => <Login {...props} createUser={createUser} postUser={postUser} entries={entries} currentUser={currentUser} loginUser={loginUser} getUserData={getUserData} userEntries={userEntries} />}
          </Stack.Screen>

          <Stack.Screen name='Ui'>
            {(props) => <Ui {...props} postUser={postUser} entries={entries} currentUser={currentUser} />}
          </Stack.Screen>

          <Stack.Screen name='Form'>
            {(props) => <Form {...props} postOne={postOne} entries={entries} getUserData={getUserData} userEntries={userEntries} currentUser={currentUser} />}
          </Stack.Screen>

          <Stack.Screen name='Entries'>
            {(props) => <Entries {...props} entries={entries} deleteOne={deleteOne} currentUser={currentUser} loginUser={loginUser} getUserData={getUserData} userEntries={userEntries} />}
          </Stack.Screen>

          <Stack.Screen name='Search'>
            {(props) => <Search {...props} entries={entries} deleteOne={deleteOne} />}
          </Stack.Screen>

          <Stack.Screen name='Analysis'>
            {(props) => <Analysis {...props} entries={entries} />}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
