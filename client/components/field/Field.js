import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
// import styles from './styles';

const Field = ({ el, handleChange }) => {
  const { value } = el;
  
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={el}
          onChangeText={(e) => {
            handleChange(e, el.name);
          }}
          value={value}
        />
      </View>
    </>
  );
};

export default Field;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: 'white',
    // flex: 1
  },
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    // borderRadius: 5,
  },
});
