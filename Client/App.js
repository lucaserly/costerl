import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

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

  const postOne = (obj) => {
    console.log('obj-->', obj);
  };

  return (
    <>
      <View style={styles.container}>
        <Text>Hello Lucas!</Text>
        <StatusBar style="auto" />
      </View>

      <View style={styles.container}>
        <Form postOne={postOne} />
      </View>

      <View style={styles.container}>
        <Entries entries={entries} />
      </View>


    </>
  );
}

export default App;


