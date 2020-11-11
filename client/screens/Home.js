import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => {
        navigation.navigate('ExForm');
      }}>
        <Text>Hello, Lucas </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;