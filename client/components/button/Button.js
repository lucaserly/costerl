import React from 'react';
import { Text, View, Button, Keyboard } from 'react-native';

const ButtonApp = ({ id, cb, title }) => {

  return (
    <Button
      onPress={() => {
        if (title === 'Submit') {
          { cb(); }
          { Keyboard.dismiss(); }
        } else {
          cb(id);
        }
      }}
      title={title}
    />
  );
};

export default ButtonApp;