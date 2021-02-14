import React from 'react';
import {
  Text, TouchableOpacity,
} from 'react-native';
import styles from './styles';

const Button = (props) => {
  const { title, onPress } = props;
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      title={title}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
