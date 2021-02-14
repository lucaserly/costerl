import React from 'react';
import { TextInput, View } from 'react-native';
import styles from '../../screens/home/styles';

const InputField = (props) => {
  const { input, handleChange } = props;
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={input}
          onChangeText={(e) => handleChange(e, input)}
        />
      </View>
    </>
  );
};

export default InputField;