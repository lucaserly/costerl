import React, { useState, useEffect } from 'react';
import { Text, View, Keyboard, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import styles from './styles';
import ApiService from './ApiService';

import Home from './screens/home/Home';
import Form from './screens/form/Form';
import Entries from './screens/entries/Entries';

const Stack = createStackNavigator();

function App () {

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    ApiService.getAll()
      .then((data) => {
        setEntries(data);
      });
  }, []);

  const dataParser = (arr) => {
    const obj = {};
    arr.forEach((el) => {
      if (el.value !== '') {
        obj[el.name] = el.value;
      }
    });
    return obj;
  };

  const postOne = (arr) => {
    const cleanedObj = dataParser(arr);
    ApiService.postOne(cleanedObj)
      .then((data) => {
        setEntries([...entries, data]);
      });
  };

  const deleteOne = (id) => {
    ApiService.deleteOne(id)
      .then(() => {
        setEntries((entrList) => {
          return entrList.filter((el) => {
            return el.id !== id;
          });
        });
      });
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

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
