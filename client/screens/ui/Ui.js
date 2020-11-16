import React, { useState, useEffect } from 'react';
import { View, Alert, Button, Text, TextInput, Keyboard, TouchableOpacity } from 'react-native';


const Ui = ({ navigation, userEntries, currentUser, getUserData, showMsg }) => {

  console.log('INSIDE SCREEN UI-->',);
  console.log('currentUser-->', currentUser);
  console.log('showMsg BEFORE-->', showMsg);


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
    setAlertMsg('')
  }

  // if (showMsg) {
  //   Alert.alert('Successfully registered at CostErl');
  //   showMsg = false;
  // }

  // console.log('showMsg AFTER-->', showMsg);


  return (
    <>
      <Text>
        Hello From Ui
    </Text>
      <TouchableOpacity onPress={() => {
        navigation.navigate('Form');
      }}>
        <Text>Navigate to Form </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        navigation.navigate('Entries');
      }}>
        <Text>Navigate to Entries </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        navigation.navigate('Search');
      }}>
        <Text>Navigate to Search Bar </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        navigation.navigate('Analysis');
      }}>
        <Text>Navigate to Analysis of Entries </Text>
      </TouchableOpacity>
    </>
  );
};

export default Ui;