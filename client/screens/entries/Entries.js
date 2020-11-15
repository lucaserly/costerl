import React from 'react';
import { View } from 'react-native';
import EntriesC from '../../components/entries/Entries';

const Entries = ({ entries, deleteOne, getUserData, userEntries, currentUser }) => {


  // console.log('INSIDE SCREEN - ENTRIES');
  // console.log('currentUser-->', currentUser);
  // console.log('currentUser.length-->', currentUser.length);
  // console.log('currentUser[0]-->', currentUser[0]);
  // console.log('currentUser[0][0].id-->', currentUser[0][0].id);

  // const index = currentUser.length - 1;
  // const subIndex = currentUser[index].length - 1;

  // // console.log('currentUser[currentUser.length-1].id-->', currentUser[currentUser.length - 1].id);
  // getUserData('users', Number(currentUser[index][subIndex].id));
  // console.log('entries-->', entries);
  // console.log('userEntries-->', userEntries);
  // console.log(' userEntries.flat()-->', userEntries.flat());


  // entries = (userEntries.flat())[0].entries;

  // const flatData = userEntries.flat();
  // // console.log('flatData-->', flatData);

  // const data = flatData[0].entries;

  // console.log('data-->', data);


  // console.log('entries-->', entries);


  return (
    <View>
      <EntriesC entries={userEntries.map((el) => {
        el.flag = true;
        return el;
      })} deleteOne={deleteOne} />
    </View>
  );
};

export default Entries;