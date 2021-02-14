import React from 'react';
import { ScrollView } from 'react-native';
import TableRender from '../../components2/TableRender';
import { useExpenses } from '../../providers/ExpensesProvider';
import styles from './styles';

const Entries = () => {
  const [expenses, addExpense, deleteExpense] = useExpenses();
  return (
    <ScrollView style={styles.entriesBox}>
      <TableRender
        expenses={expenses.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        })
          .map((expense) => {
            const flaggedExpense = { ...expense, flag: true };
            return flaggedExpense;
          })}
        deleteExpense={deleteExpense}
      />
    </ScrollView>
  );
};

export default Entries;
