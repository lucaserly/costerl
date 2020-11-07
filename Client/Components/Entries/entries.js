import React from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from './../../styles';


import Entry from './../Entry/entry';

const Entries = (props) => {
  return (
    <>
      <Text style={styles.entries}>Entries</Text>
      {props.entries.map((entry) => {
        return <Entry entry={entry} key={entry.id} />;
      })}
    </>
  );
};

export default Entries;