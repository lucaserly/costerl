import React, { useState } from 'react';
import { Text, TextInput, View, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';

const FormDetails = ({ handleChange, el, cb, placeholder }) => {


  return (
    <>
      <View>
        <TextInput
          placeholder={placeholder}
          onChangeText={(e) => {
            handleChange(e, cb);
          }}
          value={el}
        />
      </View>
    </>
  );
};

export default FormDetails;