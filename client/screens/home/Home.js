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


// ANDRE'S SUGGESTION
// make home screen be app.js
  // have user state there
    // if user populated then

    // after login function make it home screen

    // pass in login form setcurrent user
    // afterlogin function should be the home screen
    // 