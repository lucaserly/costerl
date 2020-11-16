import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, FlatList, Button } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

const TableC = ({ entries, deleteOne }) => {

  const tableHead = [
    'id',
    'item',
    'category',
    'amount',
    '🗑'
  ];

  const valuesExtractor = (arr) => {
    const result = [];
    arr.forEach((el) => {
      let val = [];
      for (let key in el) {
        if (key !== 'flag'
          && key !== 'currency' && key !== 'createdAt' && key !== 'updatedAt'
          && key !== 'userId' && key !== 'flag' && key !== 'payment' && key !== 'date' && key !== 'description') {
          val.push(el[key]);
        }
      }
      val.push('');
      result.push(val);
    });
    return result;
  };


  const element = (data, id, index) => (
    <TouchableOpacity onPress={() => {
      deleteOne(id);
    }
    }>
      <View style={styles.btn}>
        <Text style={styles.btnText}>button</Text>
      </View>
    </TouchableOpacity >
  );


  return (
    <>
      <Table borderStyle={{ borderColor: 'transparent' }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        {
          valuesExtractor(entries).map((rowData, index) => (
            <TableWrapper key={index} style={styles.row}>
              {
                rowData.map((cellData, cellIndex, cellRow, rowIndex) => (
                  <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData,
                    cellRow[0]) : cellData} textStyle={styles.text} />
                ))
              }
            </TableWrapper>
          ))
        }
      </Table>
    </>

  );
};

export default TableC;


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6, fontWeight: 'bold' },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});