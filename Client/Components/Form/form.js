import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import styles from './styles';
import ButtonApp from '../button/Button';
import Field from '../field/Field';

import config from '../../config';
const { newFields, emptyFieldCheck, resetField, flagCheck } = config.helperFunctions;

const Form = ({ form, postOne, filterList }) => {

  const [fields, setFields] = useState(
    form.map((field) => ({
      name: field.label,
      value: ''
    }))
  );

  const handleChange = (text, target) => {
    if (flagCheck(form)) {
      const field = newFields(text, target, fields);
      setFields(field);
    } else {
      const field = newFields(text, target, fields);
      setFields(field);
      filterList(fields, target);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const check = emptyFieldCheck(fields);
    if (!check) {
      postOne(fields);
      const field = resetField(fields);
      setFields(field);
    } else {
      Alert.alert('Please enter both input and amount');
    }
  };



  return (
    <>
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