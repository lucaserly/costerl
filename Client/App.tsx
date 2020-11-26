import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { registerUserRequest, loginUserRequest, getUserEntries, postEntryRequest } from './services/ApiService';
import Home from './screens/home/Home';
import Login from './screens/login/Login';
import Form from './screens/form/Form';
import Entries from './screens/entries/Entries';
import Search from './screens/search/Search';
import Analysis from './screens/analysis/Analysis';
import Ui from './screens/ui/Ui';
import Overview from './screens/overview/Overview';
import { Alert } from 'react-native';
import { Entry, User, UserInput } from './interfaces';

const Stack = createStackNavigator();

function App(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User[]>([]);
  const [userEntries, setUserEntries] = useState<Entry[]>([]);

  useEffect(() => {
    if (currentUser.length > 0) {
      (async () => {
        const id = currentUser[0].id;
        const ent: User[] = await getUserEntries(id);
        setUserEntries(ent[0].entries);
      })();
    }
  }, [currentUser]);

  const postEntry = async (entry: Entry): Promise<void> => {
    entry.userId = currentUser[0].id;
    const res = await postEntryRequest(entry);
    if (res) {
      setUserEntries((prev) => {
        return [...prev, res[0]];
      });
      Alert.alert('Entry created succesfully');
    }
  };

  const registerUser = async (user: User): Promise<void> => {
    const res = await registerUserRequest(user);
    if (res) {
      setCurrentUser(res);
      Alert.alert('User created succesfully');
    } else {
      Alert.alert('Username already taken');
    }
  };

  const loginUser = async (user: UserInput): Promise<void> => {
    const res = await loginUserRequest(user);
    if (res) {
      setCurrentUser(res);
      Alert.alert('User logged in succesfully');
    } else {
      Alert.alert('Username or password incorrect');
    }
  };

  const deleteOne = (id: number): void => {
    console.log(id);
    // return delHelper(ApiService.deleteOne, id, setUserEntries);
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home">{(props) => <Home {...props} />}</Stack.Screen>

          <Stack.Screen name="Login">
            {(props) => (
              <Login {...props} registerUser={registerUser} loginUser={loginUser} currentUser={currentUser} />
            )}
          </Stack.Screen>

          <Stack.Screen name="Ui">{(props) => <Ui {...props} />}</Stack.Screen>

          <Stack.Screen name="Form">
            {(props) => <Form {...props} currentUser={currentUser} postEntry={postEntry} />}
          </Stack.Screen>

          <Stack.Screen name="Entries">
            {(props) => <Entries {...props} deleteOne={deleteOne} userEntries={userEntries} />}
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
