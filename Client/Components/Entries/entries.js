import React, { useState } from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

import Entry from '../entry/Entry';

const Entries = ({ entries, deleteOne }) => {
  return (
    <>
      <FlatList
        data={entries}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => <Entry item={item} deleteOne={deleteOne} />}
      />
    </>
  );
};

export default Entries;
