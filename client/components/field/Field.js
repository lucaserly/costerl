import React, { useState } from 'react';
import { Text, TextInput, View, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';

const Field = ({ el, handleChange }) => {
  const { value } = el;

  return (
    <>
      <View>
        <TextInput
          style={styles.input}
          placeholder={el.name}
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