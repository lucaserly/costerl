import React, { useState } from 'react';
import { Text, TextInput, View, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';
// import styles from './styles';
// import FormDetails from './../formDetails/FormDetails';
import ButtonApp from './../button/Button';

import TestDetails from './../testDetails/TestDetails';

const Test = ({ form, postOne }) => {

  const [fields, setFields] = useState(
    form.map((field) => ({
      name: field.label,
      value: ''
    }))
  );

  const handleChange = (e) => {
    const text = e.nativeEvent.text;
    const target = e.nativeEvent.target.placeholder;
    const newFields = fields.map((field) => {
      if (field.name === target) {
        field.value = text;
      }
      return field;
    });
    setFields(newFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    postOne(fields);
    const resetField = fields.map((field) => {
      if (field !== '') {
        field.value = '';
      }
      return field;
    });
    setFields(resetField);
  };


  return (
    <>
      {fields.map((el) => {
        return <TestDetails handleChange={handleChange} el={el} />;
      })
      }
      <ButtonApp title="Submit" cb={handleSubmit} />
    </>
  );
};

export default Test;