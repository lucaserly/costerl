import React from 'react';

import { View, Text, Alert, StyleSheet } from 'react-native';
import LoginForm from '../../components/LoginForm/LoginForm.js';

import Ui from '../../screens/ui/Ui';

const Login = ({ navigation, registerUser, currentUser, loginUser }) => {

  const loginRender = () => {
    return (
      <>
        <View>

          <LoginForm registerUser={registerUser} loginUser={loginUser} />

        </View>
      </>
    );
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
        {tobeRendered ? <Ui currentUser={currentUser} navigation={navigation} /> : loginRender()}
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
  loginFormBox: {},
});

export default Login;
