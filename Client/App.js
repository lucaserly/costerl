import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import styles from './styles';
import ApiService from './ApiService';
import Entries from './Components/Entries/entries';
import Form from './Components/Form/form';

function App () {

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    ApiService.getAll()
      .then((data) => {
        setEntries(data);
      });
  }, []);

  const objCleaner = (obj) => {
    for (let key in obj) {
      if (obj[key] === "") {
        delete obj[key]
      }
    }
    return obj;
  };

  const postOne = (obj) => {
    const cleanedObj = objCleaner(obj);
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
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text>Hello Lucas!</Text>
          <StatusBar style="auto" />
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.container}>
        <Form postOne={postOne} />
      </View>

      <View style={styles.container}>
        <Entries entries={entries} deleteOne={deleteOne} />
      </View>

    </>
  );
}

export default App;


