import React, { useContext, useEffect, useState } from 'react';
import ApiService from '../services/ApiService';
import helperFunctions from '../utils/helperFunctions';
import { useAuth } from './AuthProvider';
import { useUser } from './UserProvider';

const ExpensesContext = React.createContext();
const useExpenses = () => useContext(ExpensesContext);

const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [authenticated] = useAuth();
  const [user] = useUser();

  useEffect(() => {
    if (authenticated) {
      ApiService.getUserExpenses('user', user[0].id)
        .then((data) => setExpenses(data[0].entries));
    }
  }, [authenticated]);

  const addExpense = (expense, endPoint, id) => {
    const cleanedExpense = helperFunctions.removeEmptyProperties(expense);
    ApiService.addExpense(cleanedExpense, endPoint, id)
      .then((data) => setExpenses([...expenses, data]));
  };

  const deleteExpense = (id) => {
    ApiService.deleteExpense(id)
      .then(() => setExpenses((data) => data.filter((el) => el.id !== id)));
  };

  return (
    <ExpensesContext.Provider
      value={[expenses, addExpense, deleteExpense]}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export {
  ExpensesProvider,
  useExpenses,
};
