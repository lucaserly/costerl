import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import FormC from '../../components/form/Form';
import config from '../../config';
import EntriesC from '../../components/entries/Entries';

const { loginForm } = config;

const Login = ({ navigation, createUser, currentUser, getUserData, loginUser }) => {

  const login = 'login';

  const afterLogin = () => {
    let id;
    if (Array.isArray(currentUser[currentUser.length - 1])) {
      id = currentUser[currentUser.length - 1][0].id;
    } else {
      id = currentUser[currentUser.length - 1].id;
    }

    getUserData('users', Number(id));
    return <>
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
      ;
  };

  const beforeLogin = (

    <>
      <View>
        <FormC form={loginForm} createUser={createUser} ext='register'
          login={login} loginUser={loginUser} ext2='login' />
      </View>
    </>
  );

  let tobeRendered;

  console.log('currentUser-->', currentUser);


  if (typeof currentUser[currentUser.length - 1] === 'string') {

    if (currentUser[currentUser.length - 1].includes('password')) {
      Alert.alert('Username or password is incorrect');
    } else {
      Alert.alert('user already exists');
    }
    tobeRendered = false;
  } else if (!currentUser.length) {
    tobeRendered = false;
  } else {
    Alert.alert('Successfully registered at CostErl');
    tobeRendered = true;
  }

  return (
    <>
      <Text>
        LOGIN
      </Text>
      {tobeRendered ? afterLogin() : beforeLogin}
    </>
  );
};

export default Login;