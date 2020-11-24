import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import EntriesTable from '../../components/EntriesTable/EntriesTable';
import { Entry } from '../../interfaces';

interface DeleteOne {
  (id: number): void;
}

interface Props {
  deleteOne: DeleteOne;
  userEntries: Entry[];
}

const Entries = ({ deleteOne, userEntries }: Props): JSX.Element => {
  return (
    <ScrollView style={styles.entriesBox}>
      <EntriesTable userEntries={userEntries} deleteOne={deleteOne} />
    </ScrollView>
  );
};

export default Entries;

const styles = StyleSheet.create({
  entriesBox: {
    padding: 8,
  },
});
