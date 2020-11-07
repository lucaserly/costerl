import React, { useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';

const Form = (props) => {

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
    props.postOne(obj);
    clearStates();
  };

  return (
    <>
      <Text>Form</Text>

      <TextInput
        placeholder="item"
        onChangeText={(e) => {
          handleChange(e, setItem);
        }}
        value={item}
      />
      <TextInput
        placeholder="category"
        onChangeText={(text) => setCategory(text)}
        value={category}
      />
      <TextInput
        placeholder="description"
        onChangeText={(text) => setDescription(text)}
        value={description}
      />
      <TextInput
        placeholder="payment"
        onChangeText={(text) => setPayment(text)}
        value={payment}
      />
      <TextInput
        placeholder="amount"
        onChangeText={(text) => setAmount(text)}
        value={amount}
      />

      <Button
        onPress={() => {
          { handleSubmit(); }
        }}
        title="Submit"
      />

    </>
  );
};

export default Form;