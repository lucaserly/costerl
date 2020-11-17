import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import TableC from '../../components/table/Table';

const Entries = ({ deleteOne, userEntries }) => {
  return (
    <ScrollView style={styles.entriesBox}>
      <TableC entries={userEntries.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      })
        .map((el) => {
          el.flag = true;
          return el;
        })} deleteOne={deleteOne} />
    </ScrollView>
  );
};

export default Entries;


const styles = StyleSheet.create({
  entriesBox: {
    padding: 8,
  }
});
