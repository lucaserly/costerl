import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
import Entries from './Components/Entries/entries';
import ApiService from './ApiService';

function App () {

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    ApiService.getAll()
      .then((data) => {
        setEntries(data);
      });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text>Hello Lucas!</Text>
        <StatusBar style="auto" />
      </View>
      <View style={styles.container}>
        <Entries entries={entries} />
      </View>
    </>
  );
}

export default App;


