import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const Field = ({ el, handleChange }) => {
  const { value } = el;
  
  return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={el}
          onChangeText={(e) => {
            handleChange(e);
          }}
          value={value}
        />
      </View>
  );
};

export default Field;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: 'white',
  },
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
  },
});
