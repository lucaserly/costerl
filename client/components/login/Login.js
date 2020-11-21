import React, { useState } from 'react';
import { Alert, Button, TextInput } from 'react-native';
// import ButtonApp from '../button/Button';
// import Field from '../field/Field';
// import DateInput from '../dateinput/DateInput';

// import config from '../../config';

const Login = ({ postUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (text, cb) => {
    cb(text);
    console.log(text);
  };
  // const handleChange = (e) => {
  // console.log('from inside handle change', e);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('fired');
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
        onChangeText={(email) => handleChange(email, setEmail)}
        // onChangeText={handleChange}
        defualtValue={email}
        value={email}
      />
      <TextInput
        placeholder="password"
        onChangeText={(password) => handleChange(password, setPassword)}
        // onChangeText={handleChange}
        defualtValue={password}
        value={password}
      />

      <Button onPress={handleSubmit} title="Register" />

      <Button onPress={handleSubmit} title="Login" />
    </>
  );
};

export default Login;
