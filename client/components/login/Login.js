import React, { useState } from 'react';
import { Alert, Button, TextInput } from 'react-native';

const Login = ({ postUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (text, field) => {
    field === 'email' ? setEmail(text) : setPassword(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      Alert.alert('Please insert in both fields');
    } else {
      postUser({
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

      <Button onPress={handleSubmit} title="Register" />

      <Button onPress={handleSubmit} title="Login" />
    </>
  );
};

export default Login;
