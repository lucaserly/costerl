import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonApp from '../Button/Button';
import Field from '../Field/Field';
import DateInput from '../DateInput/DateInput';
import { Entry } from '../../interfaces';
import config from '../../config';

const {
  flagCheck
} = config.helperFunctions;

interface PostEntry {
  (entry: Entry)
 : void }

interface Props {
  form: Entry ;
  postEntry: PostEntry;
  ext : string;
}

const EntryForm = ({ form, postEntry, ext }: Props) : JSX.Element => {
  
  let renderDate : boolean;

  if (ext === 'entries') {
    renderDate = true;
  } else {
    renderDate = false;
  }

  const fieldsInit : Entry = { item: '', category: '', description: '', payment: null, amount: '', date: new Date().toISOString(), createdAt: '', currency: '', updatedAt: '', id: 0, userId: 0 };
  const [date, setDate] = useState<Date>(new Date());
  const [fields, setFields] = useState<Entry>(fieldsInit);
 
  const handleChange = (text: string | number | Date, target : keyof Entry) => {
    setFields((prev) => {
      return Object.assign({...prev}, {[target]: text});
    });
  };

  const handleSubmit = () => {
    postEntry (fields);
  };

  const handleDateSub = (convertDate: Date) => {
    console.log("#####");
    setFields(fields => ({...fields, date: convertDate.toISOString()}));
  };

  return (
    <>
    {console.log(fields.date)}
      {Object.keys(fields).map((el, i) => {
        if (el !== 'date' && el !== 'id' && el !== 'userId' && el !== 'createdAt' && el !== 'updatedAt' && el !== 'currency') {
          return <Field el={el} handleChange={(text : string | Date | number, target: keyof Entry) => handleChange(text, target)} key={i} />;
        }
        else {
          if (el === 'date') {
            return <DateInput key="dateInput" handleDateSub={handleDateSub}/>;
          }
        }}
      )}
      <View>{flagCheck(form) ? <ButtonApp id={fields.id} title={"Submit"} cb={handleSubmit} /> : <></>}</View>
    </>
  );
}; 

// item: '', category: '', description: '', payment: null, amount: '', date:

/**
 * <Field el={fields.item} handleChange={(text: string, target: keyof Entry) => handleChange(text, target)} />
 * <Field el={fields.payment} handleChange={(amount: number, target: keyof Entry) => handleChange(amount, target)} />
 * <DateInput el={fields.date} handleChange={handleDateSub} />
 * 
 */

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
