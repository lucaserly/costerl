import React, { useState } from 'react';
import { View, Alert, Button, Text, TextInput, Keyboard } from 'react-native';
import ButtonApp from '../button/Button';
import Field from '../field/Field';
import DateInput from '../dateinput/DateInput';

import config from '../../config';

const Login = ({ form, postUser, currentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (text, cb) => {
    console.log('text-->', text);
    cb(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('email-->', email);
    console.log('password-->', password);

    if (email === '' || password === '') {
      Alert.alert('Please insert in both fields');
    } else {
      postUser({
        email,
        password
      });
      // const res = postUser({})
      // console.log('currentUser after posting-->', currentUser);
      // if (typeof currentUser[0] === 'string') {
      //   Alert.alert('Could not create user');
      // }
      setEmail('');
      setPassword('');
    }
  };

  return (
    <>
      <TextInput
        placeholder='Type email'
        onChangeText={email => handleChange(email, setEmail)}
        defualtValue={email}
        value={email}
      />
      <TextInput
        placeholder='password'
        onChangeText={password => handleChange(password, setPassword)}
        defualtValue={password}
        value={password}
      />

      <Button
        onPress={(e) => {
          handleSubmit(e);
        }}
        title='Register'
      />

      <Button
        onPress={(e) => {
          handleSubmit(e);
        }}
        title='Login'
      />
    </>
  );
};

export default Login;