import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { Entry } from '../../interfaces';

interface DeleteOne {
  (id: number): void;
}

interface Props {
  deleteOne: DeleteOne;
  userEntries: Entry[];
}

const EntriesTable = ({ userEntries, deleteOne }: Props): JSX.Element => {
  const tableHead = ['id', 'item', 'category', 'amount', 'delete'];

  const element = (id: number): JSX.Element => (
    <TouchableOpacity
      onPress={() => {
        Alert.alert(`The item has been deleted`);
        deleteOne(id);
      }}
    >
      <View style={styles.btn}>
        <Text style={styles.btnText}>🗑</Text>
      </View>
    </TouchableOpacity>
  );

  const tableRender = (): JSX.Element => {
    return (
      <Table borderStyle={{ borderColor: 'transparent' }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        {userEntries.map((entry: Entry, index: number) => {
          return (
            <TableWrapper key={index} style={styles.row}>
              {['id', 'item', 'category', 'amount', 'delete'].map((cellData, cellIndex: number) => (
                <Cell
                  key={cellIndex}
                  data={cellIndex === 4 ? element(cellIndex) : entry[cellData]}
                  textStyle={styles.text}
                />
              ))}
            </TableWrapper>
          );
        })}
      </Table>
    );
  };

  return <>{Array.isArray(userEntries) ? tableRender() : <></>}</>;
};

export default EntriesTable;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#2aa198', marginBottom: 5 },
  text: { margin: 6, color: 'white' },
  row: { flexDirection: 'row', backgroundColor: '#268bd2', marginBottom: 10 },
  btn: { width: 58, height: 18, backgroundColor: '#268bd2' },
  btnText: { textAlign: 'center', color: '#fff' },
});
