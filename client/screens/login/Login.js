import React from 'react';
import LoginForm from '../../containers/LoginForm';
import { useAuth } from '../../providers/AuthProvider';
import Ui from '../ui/Ui';

const Login = (props) => {
  const { navigation } = props;
  const [authenticated] = useAuth();
  return (
    authenticated ? <Ui navigation={navigation} /> : <LoginForm />
  );
};

export default Login;
