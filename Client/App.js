import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
import Dashboard from './Components/Dashboard/dashboard';
import ApiService from './ApiService';

function App () {

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    ApiService.getAll()
      .then((data) => {
        setEntries(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text>Hello Lucas!</Text>
        <StatusBar style="auto" />
      </View>
      <View style={styles.dashboard}>
        <Dashboard entries={entries}/>
      </View>
    </>
  );
}

export default App;


