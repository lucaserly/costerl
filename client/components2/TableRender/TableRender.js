import React from 'react';
import {
  Alert,
} from 'react-native';
import {
  Table, TableWrapper, Row, Cell,
} from 'react-native-table-component';
import TableButton from '../TableButton';
import helperFunctions from '../../utils/helperFunctions';
import styles from './styles';

const tableHead = [
  'id',
  'item',
  'category',
  'amount',
  'delete',
];

const propertyChecker = (key) => {
  if (key !== 'flag'
    && key !== 'currency' && key !== 'createdAt'
    && key !== 'updatedAt' && key !== 'userId'
    && key !== 'flag' && key !== 'payment'
    && key !== 'date' && key !== 'description') return true;
  return false;
};

const alertMessage = (text) => {
  Alert.alert(text);
};

const TableRender = (props) => {
  const { expenses, deleteExpense } = props;
  return (
    <>
      {Array.isArray(expenses)
        ? (
          <Table borderStyle={{ borderColor: 'transparent' }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            {
              helperFunctions.valuesExtractor(expenses, propertyChecker).map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {
                    rowData.map((cellData, cellIndex, cellRow) => (
                      <Cell
                        key={cellIndex}
                        data={cellIndex === 4
                          ? (
                            <TableButton
                              title="🗑"
                              id={cellRow[0]}
                              text="The item has been deleted"
                              alertDelete={alertMessage}
                              deleteExpense={deleteExpense}
                            />
                          )
                          : cellData}
                        textStyle={styles.text}
                      />
                    ))
                  }
                </TableWrapper>
              ))
            }
          </Table>
        )
        : <></>}
    </>
  );
};

export default TableRender;
