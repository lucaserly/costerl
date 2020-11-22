import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import ApiService from './services/ApiService';
import { registerUserRequest, loginUserRequest, getUserEntries } from './services/ApiService';
import Home from './screens/home/Home';
import Login from './screens/login/Login';
import Form from './screens/form/Form';
import Entries from './screens/entries/Entries';
import Search from './screens/search/Search';
import Analysis from './screens/analysis/Analysis';
import Ui from './screens/ui/Ui';
import Overview from './screens/overview/Overview';

import config from './config';
import { Alert } from 'react-native';

const { delHelper, postHelper, dataParser } = config.helperFunctions;
const Stack = createStackNavigator();

function App() {
  const [currentUser, setCurrentUser] = useState([]);
  const [userEntries, setUserEntries] = useState([]);

  useEffect(() => {
    if (currentUser.length > 0) {
      const id = currentUser[0].id;
      getUserEntries(id).then((data) => {
        setUserEntries(data[0].entries);
      });
    }
  }, [currentUser]);

  const postOne = (arr, ext, id) => {
    return postHelper(dataParser, arr, ApiService.postOne, setUserEntries, userEntries, ext, id);
  };

  const registerUser = async (user) => {
    const res = await registerUserRequest(user);
    if (res) {
      setCurrentUser(res);
      Alert.alert('User created succesfully');
    } else {
      Alert.alert('Username already taken');
    }
  };

  const loginUser = async (user) => {
    const res = await loginUserRequest(user);
    if (res) {
      setCurrentUser(res);
      Alert.alert('User logged in succesfully');
    } else {
      Alert.alert('Username or password incorrect');
    }
  };

  const deleteOne = (id) => {
    return delHelper(ApiService.deleteOne, id, setUserEntries);
  };

  const resetUser = () => {
    setCurrentUser([]);
    setUserEntries([]);
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home">
            {(props) => <Home {...props} component={Home} resetUser={resetUser} />}
          </Stack.Screen>

          <Stack.Screen name="Login">
            {(props) => (
              <Login {...props} registerUser={registerUser} loginUser={loginUser} currentUser={currentUser} />
            )}
          </Stack.Screen>

          <Stack.Screen name="Ui">
            {(props) => <Ui {...props} postUser={postUser} userEntries={userEntries} currentUser={currentUser} />}
          </Stack.Screen>

          <Stack.Screen name="Form">
            {(props) => <Form {...props} userEntries={userEntries} currentUser={currentUser} />}
          </Stack.Screen>

          <Stack.Screen name="Entries">
            {(props) => (
              <Entries {...props} deleteOne={deleteOne} currentUser={currentUser} userEntries={userEntries} />
            )}
          </Stack.Screen>

          <Stack.Screen name="Search">
            {(props) => <Search {...props} userEntries={userEntries} deleteOne={deleteOne} />}
          </Stack.Screen>

          <Stack.Screen name="Analysis">{(props) => <Analysis {...props} userEntries={userEntries} />}</Stack.Screen>

          <Stack.Screen name="Overview">
            {(props) => <Overview {...props} userEntries={userEntries} deleteOne={deleteOne} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
