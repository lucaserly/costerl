import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Tabs from './../tabs/Tabs';
const Stack = createStackNavigator();

// const Home = ({ navigation, resetUser }) => {
const Home = ({ navigation }) => {
  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.text}>COSTERL APP</Text>

          <View style={styles.loginBox}>
            <TouchableOpacity
              onPress={() => {
                // resetUser();
                navigation.navigate('Login');
              }}
            >
              <Text style={styles.loginText}>Navigate to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loginBox: {
    backgroundColor: '#2aa198',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
