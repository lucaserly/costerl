import React, { useState } from 'react';
import InputField from '../../components2/InputField';
import Button from '../../components2/Button';
import { useExpenses } from '../../providers/ExpensesProvider';

const initialState = {
  item: '',
  category: '',
  description: '',
  payment: '',
  amount: '',
  date: '',
};

const ExpensesForm = (props) => {
  const [state, setState] = useState(initialState);
  const [date, setDate] = useState('');
  const [expenses, addExpense, deleteExpense] = useExpenses();

  const handleChange = (value, target) => {
    setState((prevState) => ({ ...prevState, [target]: value }));
  };

  const handleSubmit = () => {

  }

};
