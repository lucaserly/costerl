import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import EntryForm from '../../components/EntryForm/EntryForm';
import EntriesTable from '../../components/EntriesTable/EntriesTable';

import config from '../../config';
const { searchForm } = config;
const { filterHelper, nullConverter } = config.helperFunctions;

const Search = ({ deleteOne, userEntries }) => {
  const [search, setSearch] = useState({});

  const filterList = (e) => {
    const arr = nullConverter(userEntries);
    return filterHelper(e, arr, setSearch);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.text}>SEARCH BAR</Text>
      </View>
      <View>
        <ScrollView>
          <EntryForm form={searchForm} filterList={filterList} />
        </ScrollView>
      </View>
      <ScrollView>
        <EntriesTable entries={search} deleteOne={deleteOne} />
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  text: {
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  textBox: {
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d33682',
  },
});
