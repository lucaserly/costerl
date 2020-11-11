import React, { useState, useEffect } from 'react';
import { Text, View, Keyboard, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import styles from './styles';
import ApiService from './ApiService';
import Entries from './components/entries/Entries';

import Home from './screens/Home';
import ExForm from './screens/ExForm';

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
    console.log('cleanedObj-->', cleanedObj);
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
          <Stack.Screen name='ExForm' component={ExForm} postOne={postOne} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;


{/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
<SafeAreaView style={styles.safeArea}>
  <View style={[styles.container, styles.helloColor]}>
    <Text style={styles.text}>Hello Lucas 😂</Text>
  </View>
</SafeAreaView>
</TouchableWithoutFeedback> */}


{/* <Form form={config.loginForm} postOne={postOne} /> */ }

{/* <View>
<Entries entries={entries} deleteOne={deleteOne} />
</View> */}