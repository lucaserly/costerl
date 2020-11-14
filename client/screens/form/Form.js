import React from 'react';
import { View } from 'react-native';
import FormC from '../../components/form/Form';
import config from '../../config';
import EntriesC from '../../components/entries/Entries';

const { inputForm } = config;

const Form = ({ entries, postOne, deleteOne }) => {
  return (
    <>
      <View>
        <FormC form={inputForm} postOne={postOne} ext='entries' />
      </View>

      <View>
        <EntriesC entries={entries.slice(0, 5).map((el) => {
          el.flag = false;
          return el;
        })} deleteOne={deleteOne} />
      </View>
    </>
  );
};

export default Form;