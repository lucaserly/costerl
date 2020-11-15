import React, { useState } from 'react';
import { View, Alert, Button, Text } from 'react-native';
import styles from './styles';
import ButtonApp from '../button/Button';
import Field from '../field/Field';
import DateInput from '../dateinput/DateInput';

import config from '../../config';
const { newFields, emptyFieldCheck, resetField, flagCheck, dateInputFinder, handleChangeForm, handleSubmitForm } = config.helperFunctions;

const Form = ({ form, postOne, filterList, ext, login }) => {

  const [date, setDate] = useState('');
  const [fields, setFields] = useState(
    form.map((field) => ({
      name: field.label,
      value: ''
    }))
  );

  const handleChange = (text, target) => {
    handleChangeForm(flagCheck, form, newFields, text, target, fields, setFields, filterList);
  };

  const handleSubmit = (e, title) => {
    console.log('title-->', title);
    e.preventDefault();
    handleSubmitForm(emptyFieldCheck, fields, postOne, resetField, setFields, Alert.alert, date, ext);
  };

  const handleDateSub = (e) => {
    setDate(e);
  };

  const oneButtonRender = (
    <>
      {dateInputFinder(fields) ? <View>
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
      {dateInputFinder(fields) ? <View>
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

  console.log('login-->', login);

  return (
    <>
      {login === 'login' ? twoButtonRender : oneButtonRender}
    </>
  );
};

export default Form;