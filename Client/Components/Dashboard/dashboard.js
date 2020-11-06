import React from 'react';
import { Text, View, FlatList } from 'react-native';

const Dashboard = (props) => {
  return (
    <>
      {console.log('props-->', props)}
      <Text>Dashboard</Text>
      <View>
        <FlatList
          data={props.entries}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) =>
            <Text>{item.item} {item.amount}</Text>
          }
        />
      </View>
    </>
  );
};

export default Dashboard;