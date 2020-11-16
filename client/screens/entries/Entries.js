import React from 'react';
import { View } from 'react-native';
import EntriesC from '../../components/entries/Entries';

const Entries = ({ deleteOne, userEntries }) => {
  return (
    <View>
      <EntriesC entries={userEntries.map((el) => {
        el.flag = true;
        return el;
      })} deleteOne={deleteOne} />
    </View>
  );
};

export default Entries;