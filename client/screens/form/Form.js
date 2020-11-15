import React from 'react';
import { View } from 'react-native';
import FormC from '../../components/form/Form';
import config from '../../config';
import EntriesC from '../../components/entries/Entries';

const { inputForm } = config;

const Form = ({ entries, postOne, deleteOne, getUserData, userEntries, currentUser }) => {

  console.log('userEntries-->', userEntries);


  let id;
  if (Array.isArray(currentUser[currentUser.length - 1])) {
    id = Number(currentUser[currentUser.length - 1][0].id);
  } else {
    id = Number(currentUser[currentUser.length - 1].id);
  }

  return (
    <>
      <View>
        <FormC form={inputForm} postOne={postOne} ext='entries' id={id} />
      </View>

      <View>
        <EntriesC entries={userEntries.slice(0, 5).map((el) => {
          console.log('el-->', el);
          el.flag = false;
          return el;
        })} deleteOne={deleteOne} />
      </View>
    </>
  );
};

export default Form;