import React, { useState, useEffect } from 'react';
import {
  View, Alert, Text, TouchableOpacity,
} from 'react-native';
import styles from './styles';

const Ui = (props) => {
  const { navigation } = props;
  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    setAlertMsg('Successfully registered at CostErl');
  }, []);

  if (alertMsg !== '') {
    Alert.alert(alertMsg);
    setAlertMsg('');
  }

  return (
    <>
      <View style={[styles.uiBox, styles.cyan]}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Form');
        }}
        >
          <Text style={styles.uiText}>Form</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.uiBox, styles.blue]}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Entries');
        }}
        >
          <Text style={styles.uiText}>Entries</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.uiBox, styles.magenta]}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Search');
        }}
        >
          <Text style={styles.uiText}>Search Bar</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.uiBox, styles.orange]}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Analysis');
        }}
        >
          <Text style={styles.uiText}>Analysis of Entries</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.uiBox, styles.grey]}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Overview');
        }}
        >
          <Text style={styles.uiText}>Overview </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Ui;
