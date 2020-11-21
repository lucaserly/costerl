import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import ApiService from './services/ApiService';
import { createUser, loginUser } from './services/ApiService';
import Home from './screens/home/Home';
import LoginC from './screens/login/Login';
import Form from './screens/form/Form';
import Entries from './screens/entries/Entries';
import Search from './screens/search/Search';
import Analysis from './screens/analysis/Analysis';
import Ui from './screens/ui/Ui';
import Overview from './screens/overview/Overview';
import Tabs from './screens/tabs/Tabs';

import config from './config';

const { delHelper, postHelper, dataParser } = config.helperFunctions;
const Stack = createStackNavigator();

function App() {
  const [currentUser, setCurrentUser] = useState([]);
  const [userEntries, setUserEntries] = useState([]);

  const getUserData = (end, id) => {
    useEffect(() => {
      ApiService.profile(end, id).then((data) => {
        setUserEntries(data[0].entries);
      });
    }, []);
  };

  const postOne = (arr, ext, id) => {
    return postHelper(dataParser, arr, ApiService.postOne, setUserEntries, userEntries, ext, id);
  };

  // const createUser = (arr, ext) => {
  //   return postHelper(dataParser, arr, ApiService.postOne, setCurrentUser, currentUser, ext);
  // };

  const handleRegisterUser = async (user) => {
    console.log('postuser got called from app with ---->', user);
    const res = await createUser(user);
    console.log('res --->', res);
    if (res) {
      setCurrentUser(res);
    } else {
      console.log('username already taken');
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
              <LoginC
                {...props}
                // createUser={createUser}
                handleRegisterUser={handleRegisterUser}
                currentUser={currentUser}
                getUserData={getUserData}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Ui">
            {(props) => (
              <Ui
                {...props}
                postUser={postUser}
                userEntries={userEntries}
                currentUser={currentUser}
                getUserData={getUserData}
              />
            )}
          </Stack.Screen>

          {/* <Stack.Screen name="Form">
            {(props) => (
              <Form
                {...props}
                postOne={postOne}
                getUserData={getUserData}
                userEntries={userEntries}
                currentUser={currentUser}
              />
            )}
          </Stack.Screen> */}

          <Stack.Screen name="Entries">
            {(props) => (
              <Entries
                {...props}
                deleteOne={deleteOne}
                currentUser={currentUser}
                getUserData={getUserData}
                userEntries={userEntries}
              />
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
