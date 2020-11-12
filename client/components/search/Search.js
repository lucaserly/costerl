import React, { useState } from 'react';
import { View, Alert, Text } from 'react-native';

import Form from './../form/Form';
import Entries from '../../components/entries/Entries';

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
      <Text>
        Search Component
      </Text>
      <Form form={searchForm} filterList={filterList} />
      <Entries entries={search} deleteOne={deleteOne} />
    </>
  );

};

export default Search;
