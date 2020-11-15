import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import FormC from '../../components/form/Form';
import config from '../../config';

const { loginForm } = config;

const Login = ({ navigation, postOne, createUser, postUser, entries, currentUser }) => {

  console.log('currentUser-->', currentUser);
  console.log('BEGINNING OF LOGIN-->');

  const afterLogin = (
    <>
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

  const beforeLogin = (
    <>
      <View>
        <FormC form={loginForm} postOne={createUser} ext='register' />
      </View>
    </>
  );

  let tobeRendered;

  if (typeof currentUser[currentUser.length-1] === 'string') {
    Alert.alert('user already exists');
    tobeRendered = false;
  } else if (!currentUser.length) {
    tobeRendered = false;
  } else {
    tobeRendered = true;
  }


  console.log('currentUser-->', currentUser);

  return (
    <>
      <Text>
        LOGIN
      </Text>
        {tobeRendered ? afterLogin : beforeLogin}
    </>
  );
};

export default Login;