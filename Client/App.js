import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, Keyboard, TouchableWithoutFeedback, SafeAreaView } from 'react-native';

import styles from './styles';
import ApiService from './ApiService';
import Entries from './components/entries/Entries';
import Form from './components/form/Form';

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
        delete obj[key];
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
        <SafeAreaView style={styles.safeArea}>
          <View style={[styles.container, styles.helloColor]}>
            <Text style={styles.text}>Hello Lucas 😂</Text>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>

      <Form postOne={postOne} />

      <View>
        <Entries entries={entries} deleteOne={deleteOne} />
      </View>
    </>
  );
}

export default App;


