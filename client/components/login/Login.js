import React, { useState } from 'react';
import { Alert, Button, TextInput } from 'react-native';

const Login = ({ registerUser, loginUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (text, field) => {
    field === 'email' ? setEmail(text) : setPassword(text);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      Alert.alert('Please insert in both fields');
    } else {
      registerUser({
        email,
        password,
      });
      setEmail('');
      setPassword('');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      Alert.alert('Please insert in both fields');
    } else {
      loginUser({
        email,
        password,
      });
      setEmail('');
      setPassword('');
    }
  };

  return (
    <>
      <TextInput
        placeholder="Type email"
        onChangeText={(email) => handleChange(email, 'email')}
        defualtValue={email}
        value={email}
      />
      <TextInput
        placeholder="password"
        onChangeText={(password) => handleChange(password, 'password')}
        defualtValue={password}
        value={password}
      />

      <Button onPress={handleRegister} title="Register" />

      <Button onPress={handleLogin} title="Login" />
    </>
  );
};

export default Login;
