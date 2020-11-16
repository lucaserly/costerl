import React from 'react';
import { View } from 'react-native';
import EntriesC from '../../components/entries/Entries';
import TableC from '../../components/table/Table';

const Entries = ({ deleteOne, userEntries }) => {
  return (
    <View>
      <TableC entries={userEntries.map((el) => {
        el.flag = true;
        return el;
      })} deleteOne={deleteOne} />
    </View>
  );
};

export default Entries;


// OLD ENTRIES
