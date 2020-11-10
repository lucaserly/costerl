import React, { useState } from 'react';
import { Text, TextInput, View, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import FormDetails from './../formDetails/FormDetails';
import ButtonApp from './../button/Button';

const Form = ({ postOne }) => {

  const [item, setItem] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [payment, setPayment] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleChange = (e, cb) => {
    cb(e);
  };

  const createObj = () => {
    return {
      item,
      category,
      description,
      payment,
      amount,
      date
    };
  };

  const clearStates = () => {
    setItem('');
    setCategory('');
    setDescription('');
    setPayment('');
    setAmount('');
    setDate('');
  };

  const handleSubmit = () => {
    const obj = createObj();
    postOne(obj);
    clearStates();
  };

  return (
    <>
      <View style={styles.container}>
        <Text>Form</Text>
        <FormDetails placeholder='item' handleChange={handleChange} el={item} cb={setItem} />
        <FormDetails placeholder='category' handleChange={handleChange} el={category} cb={setCategory} />
        <FormDetails placeholder='description' handleChange={handleChange} el={description} cb={setDescription} />
        <FormDetails placeholder='payment' handleChange={handleChange} el={payment} cb={setPayment} />
        <FormDetails placeholder='amount' handleChange={handleChange} el={amount} cb={setAmount} />
        <FormDetails placeholder='date' handleChange={handleChange} el={date} cb={setDate} />
        <ButtonApp title="Submit" cb={handleSubmit} />
      </View>
    </>
  );
};

export default Form;