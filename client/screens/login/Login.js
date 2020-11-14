import React from 'react';
import { View, Text } from 'react-native';

import LoginC from '../../components/login/Login';

import config from '../../config';
const { loginForm } = config;

const Login = ({ entries, postUser }) => {
  return (
    <>
      <Text>
        Hello From Login Form
      </Text>

      <LoginC postUser={postUser} form={loginForm} />
    </>
  );
};

export default Login;