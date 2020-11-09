import React from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import styles from '../../styles';
import ButtonApp from './../button/Button';

const Entry = ({ item, deleteOne }) => {
  return (
    <>
      <View style={styles.entryContainer}>
        <Text>item -> {item.item}</Text>
        <Text>category -> {item.category}</Text>
        <Text>description -> {item.description}</Text>
        <Text>payment -> {item.payment}</Text>
        <Text>amount -> {item.amount}</Text>
        <Text>date -> {item.date}</Text>
        <ButtonApp id={item.id} deleteOne={deleteOne} />
      </View>
    </>
  );
};

export default Entry;