import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, FlatList, Button, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

const TableC = ({ entries, deleteOne }) => {
  const tableHead = ['CAT', '% TOT', '>', 'σ'];

  const itemExtractor = (arr, filter, subfilter) => {
    return arr.filter((el) => {
      if (el[filter] === subfilter) {
        return el.amount;
      }
    });
  };

  // TODO
  /*
  TABLE DATA
    [
    [Food, %tot, biggestItem, delta, deviation]
      [Sport, %tot, biggestItem, delta, deviation]
      [Extra, %tot, biggestItem, delta, deviation]
    ]
  */

  // FIRST COLUMN OF TABLE DATA -> below -> { 'Extra', 'Food', 'Sport' }
  const categories = new Set(entries.map((el) => el.category));
  // console.log('categories-->', categories);
  let cat = [];
  categories.forEach((el) => cat.push(el));

  // console.log('cat-->', cat);

  // SECOND COLUMN OF TABLE DATA -> for each item in categoryvalues divide by totalsumofentries
  const totalSumOfEntries = entries.reduce((pv, cv) => {
    return Number(cv.amount) + pv;
  }, 0);
  // console.log('totalSumOfEntries-->', totalSumOfEntries);

  const categoryValues = {};

  entries.forEach((el) => {
    if (categoryValues[el.category]) {
      categoryValues[el.category] += Number(el.amount);
    } else {
      categoryValues[el.category] = Number(el.amount);
    }
  });

  // console.log('categoryValues-->', categoryValues);

  // needs to be like this [[76%], [2%], [22%]]
  // THIS IS SECOND COLUMN
  const catPercentage = [];

  for (let key in categoryValues) {
    const res = Math.round((categoryValues[key] / totalSumOfEntries) * 100);
    catPercentage.push([`${res} %`]);
  }

  // console.log('catPercentage-->', catPercentage);

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

  // THIRD COLUMN SHOWING LARGEST ITEM
  const largestPecentages = [];
  // console.log('BEFORE CATFOREACH-->');
  // console.log('cat-->', cat);

  cat.forEach((el) => {
    const item = itemExtractor(entries, 'category', el);
    // console.log('item-->', item);
    const res = largestEntryExtractor(item, el);
    // console.log('res-->', res);
    largestPecentages.push([res]);
  });

  // console.log('largestPecentages-->', largestPecentages);

  const allItems = [];

  categories.forEach((el) => {
    allItems.push({ [el]: itemExtractor(entries, 'category', el) });
  });

  // THIS IS THIRD COLUMN
  // console.log('largestPecentages-->', largestPecentages);

  // 4TH COLUMNS IS STANDARD DEVIATION
  // INPUT IS ALLITMES
  // steps
  // get count of observations per category

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
      sumOfVariance += Math.pow(Number(el.amount) - mean, 2);
    });
    let variance = sumOfVariance / counter;
    let stdDev = Math.round(Math.sqrt(variance));
    standardDeviations.push([`${stdDev} σ`]);
  });
  // sum all the observations amount of each category
  // calculate the mean
  // caluclate the variance
  // for each observation of the category substract the mean and square it
  // sum the above line's result of each observation
  // divivde the total by the count
  // square root of the above line

  // THIS IS FOURTH COLUMN
  // console.log('DATA TO RENDER-->');
  // console.log('catPercentage-->', catPercentage);
  // console.log('largestPecentages-->', largestPecentages);
  //
  // console.log('standardDeviations-->', standardDeviations);

  let final = [];

  const flatCatP = catPercentage.flat();
  const flatLarP = largestPecentages.flat();
  const flatStd = standardDeviations.flat();

  for (let i = 0; i < cat.length; i++) {
    final.push([cat[i], flatCatP[i], flatLarP[i], flatStd[i]]);
  }

  const tableRender = () => {
    return (
      <Table borderStyle={{ borderColor: 'transparent' }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        {final.map((rowData, index) => (
          <TableWrapper key={index} style={styles.row}>
            {rowData.map((cellData, cellIndex, cellRow, rowIndex) => (
              <Cell key={cellIndex} data={cellData} textStyle={styles.text} />
            ))}
          </TableWrapper>
        ))}
      </Table>
    );
  };

  return <>{Array.isArray(entries) ? tableRender() : <></>}</>;
};

const Overview = ({ userEntries, deleteOne }) => {
  // console.log('userEntries-->', userEntries);

  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.textTitle}>Overview</Text>
      </View>

      <ScrollView style={styles.entriesBox}>
        <TableC
          entries={userEntries.map((el) => {
            el.flag = true;
            return el;
          })}
          deleteOne={deleteOne}
        />
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
    fontWeight: 'bold',
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
