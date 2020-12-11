import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import FormC from '../../components/form/Form';
import config from '../../config';

const { inputForm } = config;

const Form = ({ postOne, currentUser }) => {

  let id;
  if (Array.isArray(currentUser[currentUser.length - 1])) {
    id = Number(currentUser[currentUser.length - 1][0].id);
  } else {
    id = Number(currentUser[currentUser.length - 1].id);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <FormC form={inputForm} postOne={postOne} ext='entries' id={id} currentUser={currentUser} />
      </View>
    </ScrollView>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: 'white'
  },
  text: {

  }
});