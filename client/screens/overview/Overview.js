import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

const TableC = ({ entries, deleteOne }) => {

  const tableHead = [
    'CAT',
    '% TOT',
    '>',
    'σ',
  ];

  const itemExtractor = (arr, filter, subfilter) => {
    return arr.filter((el) => {
      if (el[filter] === subfilter) {
        return el.amount;
      }
    }
    );
  };

  const categories = new Set(entries.map((el) => el.category));
  let cat = [];
  categories.forEach((el) => cat.push(el));

  const totalSumOfEntries = entries.reduce((pv, cv) => {
    return Number(cv.amount) + pv;
  }, 0);

  const categoryValues = {};

  entries.forEach((el) => {
    if (categoryValues[el.category]) {
      categoryValues[el.category] += Number(el.amount);
    } else {
      categoryValues[el.category] = Number(el.amount);
    }
  });

  const catPercentage = [];

  for (let key in categoryValues) {
    const res = Math.round((categoryValues[key] / totalSumOfEntries) * 100);
    catPercentage.push([`${res} %`]);
  }

  const largestEntryExtractor = (arr, filter) => {
    let largestEntryVal = 0;
    arr.forEach((el) => {
      for (let key in el) {
        if (largestEntryVal < el.amount) {
          largestEntryVal = el.amount;
        }
      }
    });
    const res = Math.round((largestEntryVal / categoryValues[filter]) * 100);
    return `${res} %`;
  };

  const largestPecentages = [];

  cat.forEach((el) => {
    const item = itemExtractor(entries, 'category', el);
    const res = largestEntryExtractor(item, el);
    largestPecentages.push([res]);
  });

  const allItems = [];

  categories.forEach((el) => {
    allItems.push({ [el]: itemExtractor(entries, 'category', el) });
  });

  const standardDeviations = [];

  allItems.forEach((el) => {
    const key = Object.keys(el);
    let counter = 0;
    let sum = 0;
    let mean = 0;
    el[key].forEach((el) => {
      counter++;
      sum += Number(el.amount);
    });
    mean = sum / counter;
    let sumOfVariance = 0;
    el[key].forEach((el) => {
      sumOfVariance += Math.pow((Number(el.amount) - mean), 2);
    });
    let variance = sumOfVariance / counter;
    let stdDev = Math.round(Math.sqrt(variance));
    standardDeviations.push([`${stdDev} σ`]);
  });

  let final = [];

  const flatCatP = catPercentage.flat();
  const flatLarP = largestPecentages.flat();
  const flatStd = standardDeviations.flat();

  for (let i = 0; i < cat.length; i++) {
    final.push([cat[i], flatCatP[i], flatLarP[i], flatStd[i]]);
  }

  const tableRender = () => {
    return <Table borderStyle={{ borderColor: 'transparent' }}>
      <Row data={tableHead} style={styles.head} textStyle={styles.text} />
      {
        final.map((rowData, index) => (
          <TableWrapper key={index} style={styles.row}>
            {
              rowData.map((cellData, cellIndex, cellRow, rowIndex) => (
                <Cell key={cellIndex} data={cellData} textStyle={styles.text} />
              ))
            }
          </TableWrapper>
        ))
      }
    </Table>;
  };

  return (
    <>
      {Array.isArray(entries) ? tableRender() : <></>}

    </>

  );
};

const Overview = ({ userEntries, deleteOne }) => {

  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.textTitle}>Overview</Text>
      </View>

      <ScrollView style={styles.entriesBox}>
        <TableC entries={userEntries.map((el) => {
          el.flag = true;
          return el;
        })} deleteOne={deleteOne} />
      </ScrollView>
    </View>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  textTitle: {
    marginBottom: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  textBox: {
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    marginBottom: 18,
  },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#2aa198', marginBottom: 5 },
  text: { margin: 6, color: 'white' },
  row: { flexDirection: 'row', backgroundColor: '#268bd2', marginBottom: 10 },
  btn: { width: 58, height: 18, backgroundColor: '#268bd2' },
  btnText: { textAlign: 'center', color: '#fff' },
});


