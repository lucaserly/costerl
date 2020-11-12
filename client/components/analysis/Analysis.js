import React, { useState } from 'react';
import { Text, View, FlatList, Button, Picker, Dimensions, ScrollView } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit';

import config from './../../config';
const { getLabels } = config.helperFunctions;

const Analysis = ({ entries }) => {
  const [selectedValue, setSelectedValue] = useState(getLabels(entries[0])[0]);
  const [selectedAnalysys, setSelectedAnalysys] = useState(getLabels(entries[0])[0]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedSubFilter, setSelectedSubFilter] = useState('');
  const [result, setResult] = useState('');
  const [analysis, setAnalysis] = useState(false);

  const renderAnalysisResult = (var1, var2, var3) => {
    return <>
      <Text>{var1} -- {var2} -- {var3}</Text>
      <View>
        <Text>Bezier Line Chart</Text>
        <BarChart
          data={{
            labels: [var2, 'test'],
            datasets: [
              {
                data: [
                  var3,
                  50,
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
    </>;
  };

  const analysisTypes = {
    horizontal: () => {

    },
    trend: () => {

    },
    commonsize: () => {

    },
    totalsum: (filter, arr, selFil, selSubFil) => {
      const filteredList = filterBySub(arr, selFil, selSubFil);
      if (filteredList.length === 1) {
        return filteredList[0][filter];
      } else {
        return filteredList.reduce((pv, cv) => {
          return Number(pv[filter]) + Number(cv[filter]);
        });
      }
    },
    percentageovertot: (filter, arr, selFil, selSubFil) => {
      // console.log('filter-->', filter);
      // console.log('arr-->', arr);
      // console.log('selFil-->', selFil);
      // console.log('selSubFil-->', selSubFil);
      // const tot
    },
    sumcategor: () => {

    },
  };

  const handleOutput = (arr, filter, selAnalys, selFil, selSubFil) => {
    console.log('selAnalys-->', selAnalys);
    console.log('selFil-->', selFil);
    console.log('selSubFil-->', selSubFil);


    const output = analysisTypes[selAnalys](filter, arr, selFil, selSubFil);
    // console.log('output-->', output);
    setResult(output);
  };

  const filterBySub = (arr, secfil, filter) => {
    // console.log('arr-->', arr);
    // console.log('secfil-->', secfil);
    // console.log('filter-->', filter);



    return arr.filter((el) => {
      // console.log('el INSIDE FILTERBYSUB-->', el);

      return el[secfil] === filter;
    });
  };

  const filteredShit = (arr, filter) => {
    const notUniq = arr.map((el) => {
      return el[filter];
    });
    return [...new Set(notUniq)];
  };

  const setDefaultSubFilter = (el) => {
    console.log('INSIDE SETDEFAULTSUBFILTER-->');
    // console.log('selectedFilter-->', selectedFilter);
    // console.log('filteredShit(entries, selectedFilter)-->', filteredShit(entries, selectedFilter));
    // console.log('(filteredShit(entries, selectedFilter))[0]-->', (filteredShit(entries, selectedFilter))[0]);
    setSelectedSubFilter((filteredShit(entries, el))[0]);
  };

  const pickers = (
    <>
      <ScrollView>
        <View styles={styles.container} >
          <Text>Selected which item to Analyse</Text>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(el) => setSelectedValue(el)}>
            {getLabels(entries[0]).map((el, i) => {
              return <Picker.Item key={i} label={el} value={el} />;
            })
            }
          </Picker>

          <Text>Selected which Filter</Text>
          <Picker
            selectedValue={selectedFilter}
            onValueChange={(el) => {
              setSelectedFilter(el);
              console.log('el INSIDE 2 FILTER-->', el);
              setDefaultSubFilter(el);
            }}>
            {getLabels(entries[0]).map((el, i) => {
              return <Picker.Item key={i} label={el} value={el} />;
            })
            }
          </Picker>

          <Text>Selected which SubFilter</Text>
          <Picker
            selectedValue={selectedSubFilter}
            onValueChange={(el) => setSelectedSubFilter(el)}>
            {
              filteredShit(entries, selectedFilter).map((el, i) => {
                return <Picker.Item key={i} label={el} value={el} />;
              })
            }
          </Picker>

          <Text>Selected which type of Analysis</Text>
          <Picker
            selectedValue={selectedAnalysys}
            onValueChange={(el) => setSelectedAnalysys(el)}>
            {getLabels(analysisTypes).map((el, i) => {
              return <Picker.Item key={i} label={el} value={el} />;
            })
            }
          </Picker>

          <Button
            onPress={(e) => {
              handleOutput(entries, selectedValue, selectedAnalysys, selectedFilter, selectedSubFilter);
              setAnalysis(true);
            }}
            title='Analyse'
          />
        </View>
      </ScrollView>
    </>
  );

  return (
    <>
      {!analysis ? pickers : renderAnalysisResult(selectedValue, selectedAnalysys, result)}
    </>
  );
};

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    // flex: 3,
    // paddingTop: 30,
    // alignItems: 'center',
  }
});


export default Analysis;
