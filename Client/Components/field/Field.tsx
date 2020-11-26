import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

interface handleChange {
  (
    e : string,
    el: string
  ) : void
}

interface Props {
  el: string;
  handleChange: handleChange;
}

const Field = ({ el, handleChange } : Props) : JSX.Element  => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={el}
        onChangeText={(e) => { handleChange(e, el);
        }}
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
