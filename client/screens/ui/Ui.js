import React, { useState, useEffect } from 'react';
import { View, Alert, Button, Text, TextInput, Keyboard, TouchableOpacity, StyleSheet } from 'react-native';

const Ui = ({ navigation, userEntries, currentUser, getUserData }) => {

  const [alertMsg, setAlertMsg] = useState('');

  let id;
  if (Array.isArray(currentUser[currentUser.length - 1])) {
    id = currentUser[currentUser.length - 1][0].id;
  } else {
    id = currentUser[currentUser.length - 1].id;
  }
  getUserData('users', Number(id));

  useEffect(() => {
    setAlertMsg('Successfully registered at CostErl');
  }, []
  );

  if (alertMsg !== '') {
    Alert.alert(alertMsg);
    setAlertMsg('');
  }

  return (
    <>
      <View style={[styles.uiBox, styles.cyan]}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Form');
        }}>
          <Text style={styles.uiText}>Navigate to Form </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.uiBox, styles.blue]}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Entries');
        }}>
          <Text style={styles.uiText}>Navigate to Entries </Text>
        </TouchableOpacity>
      </View>


      <View style={[styles.uiBox, styles.magenta]}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Search');
        }}>
          <Text style={styles.uiText}>Navigate to Search Bar </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.uiBox, styles.orange]}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Analysis');
        }}>
          <Text style={styles.uiText}>Navigate to Analysis of Entries </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Ui;

const styles = StyleSheet.create({
  uiBox: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  uiText: {
    color: 'white',
    fontWeight: 'bold'
  },
  cyan: {
    backgroundColor: '#2aa198',
  },
  blue: {
    backgroundColor: '#268bd2',
  },
  magenta: {
    backgroundColor: '#d33682',
  },
  orange: {
    backgroundColor: '#cb4b16',
  },
});