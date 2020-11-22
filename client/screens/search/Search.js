import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
// import Search from '../../components/Search';
import EntryForm from '../../components/EntryForm/EntryForm';
import TableC from '../../components/Table/Table';

import config from '../../config';
const { searchForm } = config;
const { filterHelper, nullConverter } = config.helperFunctions;

const SearchC = ({ deleteOne, userEntries }) => {
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
      {/* <Search entries={userEntries} deleteOne={deleteOne} /> */}
      <View>
        <ScrollView>
          <EntryForm form={searchForm} filterList={filterList} />
        </ScrollView>
      </View>
      <ScrollView>
        <TableC entries={search} deleteOne={deleteOne} />
      </ScrollView>
    </View>
  );
};

export default SearchC;

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
