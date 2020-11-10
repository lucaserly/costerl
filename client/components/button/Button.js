import React from 'react';
import { Text, View, Button, Keyboard } from 'react-native';

const ButtonApp = ({ id, cb, title }) => {
  return (
    <Button
      onPress={(e) => {
        if (title === 'Submit') {
          { cb(e); }
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