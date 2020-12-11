import React from 'react';
import { FlatList } from 'react-native';

import Entry from '../entry/Entry';

const Entries = ({ entries, deleteOne }) => {

  return (
    <>
      <FlatList
        data={entries}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => <Entry item={item} deleteOne={deleteOne} />} />
    </>
  );
};

export default Entries;









