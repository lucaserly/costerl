import React from 'react';
import { View, Text, TouchableOpacity, Alert, SafeAreaView, StyleSheet } from 'react-native';
import FormC from '../../components/form/Form';
import config from '../../config';
import EntriesC from '../../components/entries/Entries';

import Ui from '../../screens/ui/Ui';

const { loginForm } = config;

const Login = ({ navigation, createUser, currentUser, getUserData, loginUser }) => {

  const login = 'login';

  const loginRender = () => {

    return <>
      <View>
        <FormC form={loginForm} createUser={createUser} ext='register'
          login={login} loginUser={loginUser} ext2='login' />
      </View>
    </>;
  };

  let tobeRendered;

  if (typeof currentUser[currentUser.length - 1] === 'string') {
    if (currentUser[currentUser.length - 1].includes('password')) {
      Alert.alert('Username or password is incorrect 🖕');
    } else {
      Alert.alert('user already exists ☠️');
    }
    tobeRendered = false;
  } else if (!currentUser.length) {
    tobeRendered = false;
  } else {
    tobeRendered = true;
  }

  return (

    <View style={styles.container}>
      <Text style={styles.text}>LOGIN</Text>
      <View style={styles.loginFormBox}>
        {tobeRendered ? <Ui currentUser={currentUser} getUserData={getUserData} navigation={navigation} /> : loginRender()}
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loginFormBox: {

  }

});

export default Login;