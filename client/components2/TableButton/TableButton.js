import React from 'react';
import {
  Text, TouchableOpacity, View,
} from 'react-native';
import styles from './styles';

const TableButton = (props) => {
  const { title, id, text, alertDelete, deleteExpense } = props;
  return (
    <TouchableOpacity onPress={() => {
      alertDelete(text);
      deleteExpense(id);
    }}
    >
      <View style={styles.btn}>
        <Text style={styles.btnText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TableButton;
