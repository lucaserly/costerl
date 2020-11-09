import React from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import styles from './styles';

import Entry from '../entry/Entry';

const Entries = ({ entries, deleteOne }) => {
  return (
    <>
      {/* <Text style={styles.entries}>Entries</Text> */}
      <FlatList
        data={entries}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => <Entry item={item} deleteOne={deleteOne} />} />
    </>
  );
};

export default Entries;