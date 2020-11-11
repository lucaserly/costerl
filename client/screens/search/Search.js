import React from 'react';
import { View, Text } from 'react-native';
import SearchC from '../../components/search/Search';

const Search = ({ entries }) => {
  return (
    <>
      <View>
        <SearchC entries={entries} />
      </View>
    </>
  );
};

export default Search;