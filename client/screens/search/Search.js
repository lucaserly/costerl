import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SearchC from '../../components/search/Search';

const Search = ({ deleteOne, userEntries }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.text}>SEARCH BAR</Text>
      </View>
      <SearchC entries={userEntries} deleteOne={deleteOne} />
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
