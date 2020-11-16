import React from 'react';
import { View, Text } from 'react-native';
import SearchC from '../../components/search/Search';

const Search = ({ deleteOne, userEntries }) => {
  return (
    <>
      <View>
        <SearchC entries={userEntries} deleteOne={deleteOne} />
      </View>
    </>
  );
};

export default Search;