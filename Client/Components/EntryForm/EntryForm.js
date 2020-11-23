import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import ButtonApp from '../Button/Button';
import Field from '../Field/Field';
import DateInput from '../DateInput/DateInput';
import config from '../../config';

const {
  newFields,
  emptyFieldCheck,
  resetField,
  flagCheck,
  dateInputFinder,
  handleChangeForm,
  handleSubmitForm,
} = config.helperFunctions;

const EntryForm = ({ form, postEntry, filterList, ext, login, ext2, id, createUser, currentUser }) => {
  let renderDate;
  if (ext === 'entries') {
    renderDate = true;
  } else {
    renderDate = false;
  }
  const fieldsInit = { item: '', category: '', description: '', payment: '', amount: '', date: '2020-11-20T10:56:43.580Z' };

    // label = amount, description, etc.
  const [date, setDate] = useState('');
  const [fields, setFields] = useState(fieldsInit);

  const handleChange = (text, target) => {
    setFields((prev) => {
      const newState = { ...prev };
      newState[target] = text;
      return newState;
    });
  };

  let postOneSubmit;
  let extSubmit;

  const handleSubmit = (e) => {
    e.preventDefault();
    postEntry (fields);
  };

  const handleDateSub = (e) => {
    setDate(e);
  };

  return (
    <>
      {Object.keys(fields).map((el, i) => {
        if (el !== "date") {
          return <Field handleChange={(text) => handleChange(text, el)} el={el} key={i} />;
        }
        else {
          return <DateInput key={i}/>;
        }}
      )}
      <View styles={styles.buttonBox}>{flagCheck(form) ? <ButtonApp title="Submit" cb={handleSubmit} /> : <></>}</View>
    </>
  );
}; 

export default EntryForm;

const styles = StyleSheet.create({
  dateBox: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
  fieldBox: {
    marginBottom: 15,
  },
  buttonBox: {
    marginBottom: 15,
  },
});
