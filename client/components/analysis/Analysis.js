import React, { useState } from 'react';
import { render } from 'react-dom';
import { Text, View, FlatList, Button, Picker } from 'react-native';

const Analysis = ({ entries }) => {
  console.log('entries from AnalysisC-->', entries);
  const [selectedValue, setSelectedValue] = useState('select');
  const [selectedAnalysys, setSelectedAnalysys] = useState('select');

  const [result, setResult] = useState('');

  const getLabels = (obj) => {
    const res = [];
    for (let key in obj) {
      res.push(key);
    }
    return res;
  };

  const onValPickerChange = (itemValue, cb) => {
    cb(itemValue);
    // call method that renders based on item and type of analysys
  };

  console.log('selectedValue-->', selectedValue);

  const analysisTypes = {
    horizontal: () => {

    },
    trend: () => {

    },
    commonsize: () => {

    },
    totalsum: () => {

    },
    sumoverall: () => {

    },
    sumcategor: () => {

    },
  };



  const totalSum = (filter, arr) => {
    return arr.reduce((pv, cv) => {
      return Number(cv[filter]) + Number(pv[filter]);
    });
  };

  const renderOutput = (arr, filter) => {
    console.log('output-->', output);
    const output = totalSum(filter, arr);
    setResult(output);
  };

  // const horizontalAnalysis = (arr, item, type) => {
  //   return totalSum(item, arr);
  // };

  return (
    <>
      <Text>Selected which item to Analyse</Text>
      <Picker value={selectedValue} onValueChange={(el) => (onValPickerChange(el, setSelectedValue))}>
        {getLabels(entries[0]).map((el, i) => {
          return <Picker.Item key={i} label={el} value={el} />;
        })
        }
      </Picker>

      <Text>Selected which type of Analysis</Text>
      <Picker value={selectedAnalysys} onValueChange={(el) => (onValPickerChange(el, setSelectedAnalysys))}>
        {getLabels(analysisTypes).map((el, i) => {
          return <Picker.Item key={i} label={el} value={el} />;
        })
        }
      </Picker>

      <Button
        onPress={(e) => {
          renderOutput(entries, selectedValue);
        }}
        title='Analyse'
      />

      <View>
        <Text>
          {result}
        </Text>
      </View>
    </>
  );
};

export default Analysis;