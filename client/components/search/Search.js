import React, { useState } from 'react';
import { View, Alert, Text } from 'react-native';

import Form from './../form/Form';
import Entries from '../../components/entries/Entries';

import config from '../../config';
const { searchForm } = config;


const Search = ({ entries }) => {

  const [search, setSearch] = useState({});

  const filterList = (e) => {
    const res = entries.filter((el) => {
      return el.item.includes(e[0].value);
    });
    setSearch(res);
  };



  return (
    <>
      <Text>
        Search Component
      </Text>
      <Form form={searchForm} filterList={filterList} />

      <Entries entries={search} />

    </>
  );

};

export default Search;
