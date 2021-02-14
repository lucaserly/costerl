import React from 'react';
import {
  View, Text,
} from 'react-native';
import { useUser, useLogin, useLogout } from '../providers/AuthProvider';

const Test = () => {
  const user = useUser();
  return (
    <View>
      <Text>FUCKING TEST</Text>
    </View>
  );
};

export default Test;
