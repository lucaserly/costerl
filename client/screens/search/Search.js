import React from 'react';
import { View, Text } from 'react-native';
import SearchC from '../../components/search/Search';

const Search = ({ entries, deleteOne }) => {
  return (
    <>
      <View>
        <SearchC entries={entries} deleteOne={deleteOne} />
      </View>
    </>
  );
};

export default Search;