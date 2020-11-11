import React, { useState, useEffect } from 'react';
import { Text, View, Keyboard, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import styles from './styles';
import ApiService from './ApiService';
import Home from './screens/home/Home';
import Form from './screens/form/Form';
import Entries from './screens/entries/Entries';
import Search from './screens/search/Search';
import config from './config';

const { delHelper, postHelper, dataParser } = config.helperFunctions;
const Stack = createStackNavigator();

function App () {

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    ApiService.getAll()
      .then((data) => {
        setEntries(data);
      });
  }, []);

  const postOne = (arr) => {
    return postHelper(dataParser, arr, ApiService.postOne, setEntries, entries);
  };

  const deleteOne = (id) => {
    return delHelper(ApiService.deleteOne, id, setEntries);
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name='Home' component={Home} />

          <Stack.Screen name='Form'>
            {(props) => <Form {...props} postOne={postOne} entries={entries} />}
          </Stack.Screen>

          <Stack.Screen name='Entries'>
            {(props) => <Entries {...props} entries={entries} deleteOne={deleteOne} />}
          </Stack.Screen>

          <Stack.Screen name='Search'>
            {(props) => <Search {...props} entries={entries} deleteOne={deleteOne} />}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
