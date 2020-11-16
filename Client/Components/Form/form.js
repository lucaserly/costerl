import React, { useState } from 'react';
import { View, Alert, Button, Text } from 'react-native';
import styles from './styles';
import ButtonApp from '../button/Button';
import Field from '../field/Field';
import DateInput from '../dateinput/DateInput';

import config from '../../config';
const { newFields, emptyFieldCheck, resetField, flagCheck, dateInputFinder, handleChangeForm, handleSubmitForm } = config.helperFunctions;

const Form = ({ form, postOne, filterList, ext, login, ext2, id, createUser, currentUser }) => {


  // console.log('ext-->', ext);
  // console.log('ext2-->', ext2);
  // console.log('form-->', form);

  let renderDate;
  // if ext entries then render date else don't
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

    e.preventDefault();
    handleSubmitForm(emptyFieldCheck, fields, postOneSubmit,
      resetField, setFields, Alert.alert, date, extSubmit, id, currentUser);
  };

  const handleDateSub = (e) => {
    setDate(e);
  };

  const oneButtonRender = (
    <>
      {renderDate ? <View>
        <DateInput handleDateSub={handleDateSub} />
      </View> : <></>
      }
      <View style={styles.container}>
        {fields.map((el, i) => {
          return <Field handleChange={handleChange} el={el} key={i} />;
        })
        }
        {flagCheck(form) ? <ButtonApp title="Submit" cb={handleSubmit} /> : <></>}
      </View>
    </>
  );

  const twoButtonRender = (
    <>
      {renderDate ? <View>
        <DateInput handleDateSub={handleDateSub} />
      </View> : <></>
      }
      <View style={styles.container}>
        {fields.map((el, i) => {
          return <Field handleChange={handleChange} el={el} key={i} />;
        })
        }
        {flagCheck(form) ? <ButtonApp title="Register" cb={handleSubmit} /> : <></>}
        {flagCheck(form) ? <ButtonApp title="Login" cb={handleSubmit} /> : <></>}
      </View>
    </>

  );

  return (
    <>
      {login === 'login' ? twoButtonRender : oneButtonRender}
    </>
  );
};

export default Form;