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
  const fieldsInit = { item: '', category: '', description: '', payment: '', amount: '', date: '' };

  const [date, setDate] = useState('');
  const [fields, setFields] = useState(fieldsInit);

  const handleChange = (text, target) => {
    console.log(text);
    console.log(target);
    console.log(fields);
    setFields((prev) => {
      const newState = { ...prev };
      newState[target] = text;
      return newState;
    });
  };

  let postOneSubmit;
  let extSubmit;

  const handleSubmit = (e, title) => {
    e.preventDefault();
    if (title === 'Login') {
      extSubmit = ext2;
      postOneSubmit = createUser;
    } else if (title === 'Submit') {
      postOneSubmit = postOne;
      extSubmit = 'entries';
    } else {
      extSubmit = ext;
      postOneSubmit = createUser;
    }
    handleSubmitForm(
      emptyFieldCheck,
      fields,
      postOneSubmit,
      resetField,
      setFields,
      Alert.alert,
      date,
      extSubmit,
      id,
      currentUser,
    );
  };

  const handleDateSub = (e) => {
    setDate(e);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateBox}>
        <View>
          <DateInput handleDateSub={handleDateSub} />
        </View>
      </View>
      <View style={styles.fieldBox}>
        {Object.keys(fields).map((el, i) => {
          return <Field handleChange={(text) => handleChange(text, el)} el={el} key={i} />;
        })}
      </View>

      <View styles={styles.buttonBox}>{flagCheck(form) ? <ButtonApp title="Submit" cb={handleSubmit} /> : <></>}</View>
    </View>
  );
};

export default EntryForm;

const styles = StyleSheet.create({
  dateBox: {
    backgroundColor: 'white',
    // borderRadius: 5,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginBottom: 10,
  },
  fieldBox: {
    marginBottom: 15,
  },
  buttonBox: {
    marginBottom: 15,
  },
});
