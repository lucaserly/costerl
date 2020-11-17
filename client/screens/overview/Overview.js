import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, FlatList, Button, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

const TableC = ({ entries, deleteOne }) => {

  const tableHead = [
    'cat',
    '% tot',
    '>',
    'σ',
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

  const itemExtractor = (arr, filter, subfilter) => {
    return arr.filter((el) => {
      if (el[filter] === subfilter) {
        return el.amount;
      }
    }
    );
  };


  // const items = new Set(entries.map((el) => el.item));



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
  console.log('categories-->', categories);




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
    catPercentage.push([`${res}%`]);
  }

  // console.log('catPercentage-->', catPercentage);


  // THIRD COLUMN SHOWING LARGEST ITEM

  const foodItems = itemExtractor(entries, 'category', 'Food');
  // console.log('foodItems-->', foodItems);
  const sportItems = itemExtractor(entries, 'category', 'sport');
  const extraItems = itemExtractor(entries, 'category', 'extra');

  const allItems = [];

  categories.forEach((el) => {
    console.log('el-->', el);
    console.log('itemExtractorentries, category, el-->', itemExtractor(entries, 'category', el));
    allItems.push({ [el]: itemExtractor(entries, 'category', el) });
  });


  console.log('allItems-->', allItems);



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
    return `${res}%`;
  };

  // console.log('largestEntryExtractor(foodItems)-->', largestEntryExtractor(foodItems, 'Food'));
  const largestFoodItem = largestEntryExtractor(foodItems, 'Food');
  const largestSportItem = largestEntryExtractor(foodItems, 'Sport');
  const largesExtraItem = largestEntryExtractor(foodItems, 'Extra');

  // console.log('largestFoodItem-->', largestFoodItem);
  // console.log('largestSportItem-->', largestSportItem);
  // console.log('largesExtraItem-->', largesExtraItem);

  const largestPecentages = [];

  largestPecentages.push([largestFoodItem]);
  largestPecentages.push([largestSportItem]);
  largestPecentages.push([largesExtraItem]);
  // THIS IS THIRD COLUMN
  console.log('largestPecentages-->', largestPecentages);

  // 4TH COLUMNS IS STANDARD DEVIATION
    // INPUT IS ALLITMES
    // steps
    // get count of observations per category
    // sum all the observations amount of each category
    // calculate the mean
    // caluclate the variance
        // for each observation of the category substract the mean and square it
          // sum the above line's result of each observation
          // divivde the total by the count
          // square root of the above line

  const alertDelete = (item) => {
    Alert.alert(`The item has been deleted`);
  };

  const element = (data, id, index) => (
    <TouchableOpacity onPress={() => {
      alertDelete(data);
      deleteOne(id);
    }
    }>
      <View style={styles.btn}>
        <Text style={styles.btnText}>🗑</Text>
      </View>
    </TouchableOpacity >
  );

  const tableRender = () => {
    return <Table borderStyle={{ borderColor: 'transparent' }}>
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
    </Table>;
  };

  return (
    <>
      {Array.isArray(entries) ? tableRender() : <></>}

    </>

  );
};



const Overview = ({ userEntries, deleteOne }) => {


  // console.log('userEntries-->', userEntries);

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
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold'
  },
  textBox: {
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    marginBottom: 10,
  },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#2aa198', marginBottom: 5 },
  text: { margin: 6, color: 'white' },
  row: { flexDirection: 'row', backgroundColor: '#268bd2', marginBottom: 10 },
  btn: { width: 58, height: 18, backgroundColor: '#268bd2' },
  btnText: { textAlign: 'center', color: '#fff' },
});


