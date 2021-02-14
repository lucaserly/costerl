/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/home/Home';
import Login from './screens/login/Login';
import Ui from './screens/ui/Ui';
import Form from './screens/form/Form';
import Entries from './screens/entries/Entries';
import Search from './screens/search/Search';
import Analysis from './screens/analysis/Analysis';
import Overview from './screens/overview/Overview';

const Stack = createStackNavigator();

const RootStack = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home">
        {(props) => (
          <Home
            {...props}
            component={Home}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Login">
        {(props) => (
          <Login {...props} />
        )}
      </Stack.Screen>

      <Stack.Screen name="Ui">
        {(props) => (
          <Ui {...props} />
        )}
      </Stack.Screen>

      <Stack.Screen name="Form">
        {(props) => (
          <Form {...props} />
        )}
      </Stack.Screen>

      <Stack.Screen name="Entries">
        {(props) => (
          <Entries {...props} />
        )}
      </Stack.Screen>

      <Stack.Screen name="Search">
        {(props) => (
          <Search {...props} />)}
      </Stack.Screen>

      <Stack.Screen name="Analysis">
        {(props) => <Analysis {...props} />}
      </Stack.Screen>

      <Stack.Screen name="Overview">
        {(props) => <Overview {...props} />}
      </Stack.Screen>

    </Stack.Navigator>
  </NavigationContainer>
);

export default RootStack;
