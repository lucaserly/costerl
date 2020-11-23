import React, { useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import EntriesTable from '../../components/EntriesTable/EntriesTable';

const Entries = ({ deleteOne, userEntries }) => {
  return (
    <ScrollView style={styles.entriesBox}>
      <EntriesTable entries={userEntries} deleteOne={deleteOne} />
    </ScrollView>
  );
};

export default Entries;

const styles = StyleSheet.create({
  entriesBox: {
    padding: 8,
  },
});
