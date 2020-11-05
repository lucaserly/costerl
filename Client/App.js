import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
import Dashboard from './Components/Dashboard/dashboard';

export default function App () {
  return (
    <View style={styles.container}>
      <Dashboard />
      <Text>Hello Lucas!</Text>
      <StatusBar style="auto" />
    </View>
  );
}


