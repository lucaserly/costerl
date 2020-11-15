import React from 'react';
import { View } from 'react-native';
import FormC from '../../components/form/Form';
import config from '../../config';
import EntriesC from '../../components/entries/Entries';

const { inputForm } = config;

const Form = ({ entries, postOne, deleteOne, getUserData, userEntries, currentUser }) => {
  // console.log('entries-->', entries);
  // console.log('currentUser-->', currentUser);

  console.log('currentUser[currentUser.length-1].id-->', currentUser[currentUser.length - 1].id);

  getUserData('users', currentUser[currentUser.length - 1].id);
  // getUserData('users', currentUser[currentUser.length-1].id)

  console.log('userEntries-->', userEntries);
 

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