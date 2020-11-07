import React from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import styles from './../../styles';

import Entry from './../Entry/entry';

const Entries = (props) => {
  return (
    <>
      <Text style={styles.entries}>Entries</Text>

      <FlatList
        data={props.entries}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => (
          <View style={styles.entryContainer}>
            <Text>item -> {item.item}</Text>
            <Text>category -> {item.category}</Text>
            <Text>description -> {item.description}</Text>
            <Text>payment -> {item.payment}</Text>
            <Text>amount -> {item.amount}</Text>
            <Text>date -> {item.date}</Text>
            <Button
              onPress={() => { props.deleteOne(item.id); }}
              title="🗑"
            />
          </View>
        )} />

      {/* {props.entries.map((entry) => {
        return <Entry entry={entry} key={entry.id} />;
      })} */}

    </>
  );
};

export default Entries;