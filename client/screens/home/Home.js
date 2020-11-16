import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Home = ({ navigation, resetUser }) => {
  return (
    <View>
      <Text>WELCOME</Text>

      <TouchableOpacity onPress={() => {
        resetUser();
        navigation.navigate('Login');
      }}>
        <Text>Navigate to Login </Text>
      </TouchableOpacity>

    </View>
  );
};

export default Home;