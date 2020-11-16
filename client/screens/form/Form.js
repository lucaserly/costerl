import React from 'react';
import { View } from 'react-native';
import FormC from '../../components/form/Form';
import config from '../../config';
import EntriesC from '../../components/entries/Entries';

const { inputForm } = config;

const Form = ({ postOne, deleteOne, userEntries, currentUser }) => {

  let id;
  if (Array.isArray(currentUser[currentUser.length - 1])) {
    id = Number(currentUser[currentUser.length - 1][0].id);
  } else {
    id = Number(currentUser[currentUser.length - 1].id);
  }

  return (
    <>
      <View>
        <FormC form={inputForm} postOne={postOne} ext='entries' id={id} currentUser={currentUser} />
      </View>

      <View>
        <EntriesC entries={userEntries.slice(0, 5).map((el) => {
          el.flag = false;
          return el;
        })} deleteOne={deleteOne} />
      </View>
    </>
  );
};

export default Form;