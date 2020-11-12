import React, { useState } from 'react';
import { View, Alert, Button, Text } from 'react-native';
import styles from './styles';
import ButtonApp from '../button/Button';
import Field from '../field/Field';
import DateInput from '../dateinput/DateInput';

import config from '../../config';
const { newFields, emptyFieldCheck, resetField, flagCheck, dateInputFinder, handleChangeForm, handleSubmitForm } = config.helperFunctions;

const Form = ({ form, postOne, filterList }) => {

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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitForm(emptyFieldCheck, fields, postOne, resetField, setFields, Alert.alert, date);
  };

  const handleDateSub = (e) => {
    setDate(e);
  };

  return (
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
};

export default Form;