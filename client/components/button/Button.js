import React from 'react';
import { Text, View, Button } from 'react-native';

const ButtonApp = ({ id, deleteOne }) => {
  return (
    <Button
      onPress={() => { deleteOne(id); }}
      title="🗑"
    />
  );
};

export default ButtonApp;