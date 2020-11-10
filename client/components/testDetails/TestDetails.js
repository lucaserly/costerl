import React, { useState } from 'react';
import { Text, TextInput, View, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';

const TestDetails = ({ el, handleChange }) => {
  const { value } = el;
  return (
    <>
      <View>
        <TextInput
          placeholder={el.name}
          onChange={(e) => {
            handleChange(e);
          }}
          value={value}
        />
      </View>
    </>
  );
};

export default TestDetails;