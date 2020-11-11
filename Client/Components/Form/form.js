import React, { useState } from 'react';
import { Text, TextInput, View, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import ButtonApp from '../button/Button';
import Field from '../field/Field';

const Form = ({ form, postOne }) => {

  const [fields, setFields] = useState(
    form.map((field) => ({
      name: field.label,
      value: ''
    }))
  );

  const handleChange = (text, target) => {
    const newFields = fields.map((field) => {
      if (field.name === target) {
        field.value = text;
      }
      return field;
    });
    setFields(newFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <View style={styles.container}>
        {fields.map((el, i) => {
          return <Field handleChange={handleChange} el={el} key={i} />;
        })
        }
        <ButtonApp title="Submit" cb={handleSubmit} />
      </View>
    </>
  );
};

export default Form;