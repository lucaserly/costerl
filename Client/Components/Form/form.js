import React, { useState } from 'react';
import { View, Alert, Button, Text } from 'react-native';
import styles from './styles';
import ButtonApp from '../button/Button';
import Field from '../field/Field';
import DateInput from '../dateinput/DateInput';

import config from '../../config';
const { newFields, emptyFieldCheck, resetField, flagCheck, dateInputFinder, handleChangeForm, handleSubmitForm } = config.helperFunctions;

const Form = ({ form, postOne, filterList, ext, login, loginUser, ext2, id, createUser }) => {

  const [date, setDate] = useState('');
  const [fields, setFields] = useState(
    form.map((field) => ({
      name: field.label,
      value: ''
    }))
  );

  const handleChange = (text, target) => {
    // console.log('text-->', text);
    // console.log('target-->', target);
    handleChangeForm(flagCheck, form, newFields, text, target, fields, setFields, filterList);
  };

  // let postOneSubmit,
  //   let extSubmit, ;

  // if (title === 'login') {
  //   ext = ext2,
  //   } else {
  //   postOneSubmit = postOne,
  //     extSubmit = ext,
  //   }

  let postOneSubmit;
  let extSubmit;


  const handleSubmit = (e, title) => {
    console.log('title-->', title);
    // console.log('fields-->', fields);

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

    console.log('postOneSubmit-->', postOneSubmit);

    e.preventDefault();
    // console.log('postOneSubmit-->', postOneSubmit);
    // console.log('extSubmit-->', extSubmit);

    handleSubmitForm(emptyFieldCheck, fields, postOneSubmit, resetField, setFields, Alert.alert, date, extSubmit, id);
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

  // if (id) {

  // }

  // console.log('FORMCOMPONENT ZIO PORCO')
  // console.log('id-->', id);
  // console.log('login-->', login);

  return (
    <>
      {login === 'login' ? twoButtonRender : oneButtonRender}
    </>
  );
};

export default Form;