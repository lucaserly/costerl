import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import Form from '../Form';
import TableC from '../table/Table';

import config from '../../config';
const { searchForm } = config;
const { filterHelper, nullConverter } = config.helperFunctions;

const Search = ({ entries, deleteOne }) => {
  const [search, setSearch] = useState({});

  const filterList = (e, target) => {
    const arr = nullConverter(entries);
    return filterHelper(e, arr, setSearch);
  };

  return (
    <>
      <View>
        <ScrollView>
          <Form form={searchForm} filterList={filterList} />
        </ScrollView>
      </View>
      <ScrollView>
        <TableC entries={search} deleteOne={deleteOne} />
      </ScrollView>
    </>
  );
};

export default Search;
