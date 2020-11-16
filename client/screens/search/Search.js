import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SearchC from '../../components/search/Search';

const Search = ({ deleteOne, userEntries }) => {
  return (

    <View style={styles.container}>
      <Text style={styles.text}>SEARCH BAR</Text>
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});