import React from 'react';
import { Text, Keyboard, TouchableOpacity, StyleSheet} from 'react-native';

interface Cb {
  (
  e?: Event,
  title? : string,
  id?: number,
  ) : void;
}

interface Props {
  id : number;
  title : string;
  cb : Cb;
}

const ButtonApp = ({ id, cb, title }: Props) : JSX.Element => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={(e) => {
        if (title === 'Submit' || title === 'Register' || title === 'Login') {
          {
            cb(e, title);
          }
          {
            Keyboard.dismiss();
          }
        } else {
            cb(id);
          }
      }}
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
  },
});
