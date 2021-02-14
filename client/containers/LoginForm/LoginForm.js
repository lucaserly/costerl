import React, { useState } from 'react';
import InputField from '../../components2/InputField';
import Button from '../../components2/Button';
import { useUser } from '../../providers/UserProvider';

const initialState = {
  email: '',
  password: '',
};

const LoginForm = (props) => {
  const [state, setState] = useState(initialState);
  const [user, login] = useUser();

  const handleChange = (value, target) => {
    setState((prevState) => ({ ...prevState, [target]: value }));
  };

  const handleSubmit = () => {
    const { email, password } = state;
    const loginUser = { email, password };
    login(loginUser);
  };

  return (
    <>
      <InputField handleChange={handleChange} input="email" />
      <InputField handleChange={handleChange} input="password" />
      <Button
        title="login"
        onPress={handleSubmit}
      />
    </>
  );
};
export default LoginForm;
