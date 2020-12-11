import React from 'react';
import { Text, View, Button, Keyboard, TouchableOpacity, StyleSheet } from 'react-native';

const ButtonApp = ({ id, cb, title }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={(e) => {
        if (title === 'Submit' || title === 'Register' || title === 'Login') {
          { cb(e, title); }
          { Keyboard.dismiss(); }
        } else {
          cb(id);
        }
      }}
      title={title}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonApp;

const styles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: '#2aa198',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});