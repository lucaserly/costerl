import React from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from './../../styles';


const Entry = (props) => {
  return (
    <>
      <View style={styles.entryContainer}>

        <View style={styles.entry}>
          <Text style={styles.entry}>Category → {props.entry.category}</Text>
        </View>

        <View style={styles.entry}>
          <Text style={styles.entry}>Amount → {props.entry.amount}</Text>
        </View>

      </View>
    </>
  );
};

export default Entry;