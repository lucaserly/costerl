import React from 'react';
import { View } from 'react-native';
import FormC from '../../components/form/Form';
import config from '../../config';
import EntriesC from '../../components/entries/Entries';

const { inputForm } = config;

const Form = ({ entries, postOne, deleteOne, getUserData, userEntries, currentUser }) => {

  // const flatData = userEntries.flat();
  // const data = flatData[0].entries;

  let index = currentUser.length - 1;
  let subIndex = currentUser[index].length - 1;
  const id = Number(currentUser[index][subIndex].id);
  // console.log('id-->', id);


  return (
    <>
      <View>
        <FormC form={inputForm} postOne={postOne} ext='entries' id={id} />
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