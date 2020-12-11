import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ApiService from './ApiService';
import Home from './screens/home/Home';
import Login from './screens/login/Login';
import Form from './screens/form/Form';
import Entries from './screens/entries/Entries';
import Search from './screens/search/Search';
import Analysis from './screens/analysis/Analysis';
import Ui from './screens/ui/Ui';
import Overview from './screens/overview/Overview';
import config from './config';

const { dataParser } = config.helperFunctions;
const Stack = createStackNavigator();

function App () {

  const [currentUser, setCurrentUser] = useState([]);
  const [userEntries, setUserEntries] = useState([]);

  const getUserData = (end, id) => {

    useEffect(() => {
      ApiService.profile(end, id)
        .then((data) => {
          setUserEntries(data[0].entries);
        });
    }, []
    );
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

  const postUser = (arr, ext) => {
    ApiService.postOne(arr, 'register')
      .then((data) => {
        setCurrentUser(data);
      });
  };

  const deleteOne = (id) => {
    ApiService.deleteOne(id)
      .then(() => {
        setUserEntries((list) => {
          return list.filter((el) => {
            return el.id !== id;
          });
        });
      });
  };

  const resetUser = () => {
    setCurrentUser([]);
    setUserEntries([]);
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name='Home'>
            {(props) => <Home {...props} component={Home}
              resetUser={resetUser} />}
          </Stack.Screen>

          <Stack.Screen name='Login'>
            {(props) => <Login {...props} createUser={createUser}
              postUser={postUser} currentUser={currentUser}
              getUserData={getUserData} />}
          </Stack.Screen>

          <Stack.Screen name='Ui'>
            {(props) => <Ui {...props} postUser={postUser}
              userEntries={userEntries} currentUser={currentUser} getUserData={getUserData} />}
          </Stack.Screen>

          <Stack.Screen name='Form'>
            {(props) => <Form {...props} postOne={postOne}
              getUserData={getUserData}
              userEntries={userEntries} currentUser={currentUser} />}
          </Stack.Screen>

          <Stack.Screen name='Entries'>
            {(props) => <Entries {...props}
              deleteOne={deleteOne}
              currentUser={currentUser}
              getUserData={getUserData} userEntries={userEntries} />}
          </Stack.Screen>

          <Stack.Screen name='Search'>
            {(props) => <Search {...props} userEntries={userEntries}
              deleteOne={deleteOne} />}
          </Stack.Screen>

          <Stack.Screen name='Analysis'>
            {(props) => <Analysis {...props} userEntries={userEntries} />}
          </Stack.Screen>

          <Stack.Screen name='Overview'>
            {(props) => <Overview {...props} userEntries={userEntries} deleteOne={deleteOne} />}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
