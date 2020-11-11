import React from 'react';
import { View } from 'react-native';
import EntriesC from '../../components/entries/Entries';

const Entries = ({ entries, deleteOne }) => {
  return (
    <View>
      <EntriesC entries={entries.map((el) => {
        el.flag = true;
        return el;
      })} deleteOne={deleteOne} />
    </View>
  );
};

export default Entries;