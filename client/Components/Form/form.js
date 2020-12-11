import React, { useState } from 'react';
import { View, Alert, Button, Text, StyleSheet } from 'react-native';
// import styles from './styles';
import ButtonApp from '../button/Button';
import Field from '../field/Field';
import DateInput from '../dateinput/DateInput';

import config from '../../config';
const { newFields, emptyFieldCheck, resetField, flagCheck, dateInputFinder, handleChangeForm, handleSubmitForm } = config.helperFunctions;

const Form = ({ form, postOne, filterList, ext, login, ext2, id, createUser, currentUser }) => {

  let renderDate;
  if (ext === 'entries') {
    renderDate = true;
  } else {
    renderDate = false;
  }



  const [date, setDate] = useState('');
  const [fields, setFields] = useState(
    form.map((field) => ({
      name: field.label,
      value: ''
    }))
  );

  const handleChange = (text, target) => {
    handleChangeForm(flagCheck, form, newFields, text,
      target, fields, setFields, filterList);
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
    handleSubmitForm(emptyFieldCheck, fields, postOneSubmit,
      resetField, setFields, Alert.alert, date, extSubmit, id, currentUser);
  };

  const handleDateSub = (e) => {
    setDate(e);
  };

  const oneButtonRender = (
    <View style={styles.container}>

      <View style={styles.dateBox}>
        {renderDate ? <View>
          <DateInput handleDateSub={handleDateSub} />
        </View> : <></>
        }
      </View>

      <View style={styles.fieldBox}>
        {fields.map((el, i) => {
          return <Field handleChange={handleChange} el={el} key={i} />;
        })
        }
      </View>

      <View styles={styles.buttonBox}>
        {flagCheck(form) ? <ButtonApp title="Submit" cb={handleSubmit} /> : <></>}
      </View>

    </View>
  );

  const twoButtonRender = (

    <View>

      <View style={styles.dateBox}>
        {renderDate ? <View>
          <DateInput handleDateSub={handleDateSub} />
        </View> : <></>
        }
      </View>

      <View styles={styles.fieldBox}>
        {fields.map((el, i) => {
          return <Field handleChange={handleChange} el={el} key={i} />;
        })
        }
      </View>

      <View styles={styles.buttonBox}>
        {flagCheck(form) ? <ButtonApp title="Register" cb={handleSubmit} /> : <></>}
        {flagCheck(form) ? <ButtonApp title="Login" cb={handleSubmit} /> : <></>}
      </View>

    </View>

  );

  return (
    <>
      {login === 'login' ? twoButtonRender : oneButtonRender}
    </>
  );
};

export default Form;


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

