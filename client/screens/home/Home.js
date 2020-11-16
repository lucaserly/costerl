import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const Home = ({ navigation, resetUser }) => {
  return (

    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>WELCOME TO COSTERL APP</Text>

        <View style={styles.loginBox}>
          <TouchableOpacity onPress={() => {
            resetUser();
            navigation.navigate('Login');
          }}>
            <Text style={styles.loginText}>Navigate to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>

  );
};

export default Home;


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    // fontFamily: 'Iowan'
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
    alignItems: 'center'
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold'
  }

});;



// ANDRE'S SUGGESTION
// make home screen be app.js
  // have user state there
    // if user populated then

    // after login function make it home screen

    // pass in login form setcurrent user
    // afterlogin function should be the home screen
    //