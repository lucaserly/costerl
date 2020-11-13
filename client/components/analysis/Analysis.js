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
  const [firstFilter, setFirstFilter] = useState(getLabels(entries[0])[0]);
  const [secondFilter, setSecondFilter] = useState('');
  const [thirdFilter, setThirdFilter] = useState('');
  const [selectedAnalysys, setSelectedAnalysys] = useState(getLabels(entries[0])[0]);
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
    totalsum: (arr, firstFil, secFil, thirdFil) => {
      console.log('firstFil-->', firstFil);
      console.log('arr-->', arr);
      console.log('thirdFil-->', thirdFil);

      const filteredList = filterBySub(arr, secFil, thirdFil);
      console.log('filteredList-->', filteredList);
      if (filteredList.length === 1) {
        return filteredList[0][firstFil];
      } else {
        return filteredList.reduce((pv, cv) => {
          console.log('INSIDE 2ND REDUCE-->');
          console.log('pv-->', pv);
          console.log('cv-->', cv);
          console.log('pv[firstFil]-->', pv[firstFil]);
          console.log('cv[firstFil-->', cv[firstFil]);

          // const res = { res: Number(pv[firstFil]) + Number(cv[firstFil]) };
          // return res.res;
          return pv + Number(cv[firstFil]);

          // return Number(pv[firstFil]) + Number(cv[firstFil]);
        }, 0);
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

  const handleOutput = (arr, firstFil, secFil, thirdFil, selAnalys) => {
    console.log('selAnalys-->', selAnalys);
    console.log('secFil-->', secFil);
    console.log('thirdFil-->', thirdFil);
    const output = analysisTypes[selAnalys](arr, firstFil, secFil, thirdFil);
    // console.log('output-->', output);
    setResult(output);
  };

  const filterBySub = (arr, secfil, thirdfil) => {
    console.log('INSIDE FILTERBYSUB-->');
    console.log('arr-->', arr);
    console.log('secfil-->', secfil);
    console.log('thirdfil-->', thirdfil);
    // if (thirdfil === 'all') {
    //   return arr.filter((el) => {
    //     return
    //   })
    // }

    return arr.filter((el) => {
      if (thirdfil === 'all') {
        return el[secfil];
      } else {
        // console.log('el INSIDE FILTERBYSUB-->', el);
        return el[secfil] === thirdfil;
      }
    });
  };

  const filteredShit = (arr, filter) => {
    // console.log('INSIDE FILTEREDSHIT-->');
    // console.log('arr-->', arr);
    // console.log('filter-->', filter);

    const notUniq = arr.map((el) => {
      // console.log('el-->', el);
      // console.log('el[filter]-->', el[filter]);
      return el[filter] + '';
    });
    const res = [...new Set(notUniq)];
    res.push('all');
    return res;
    // return [...new Set(notUniq)];
  };

  const setDefaultSubFilter = (el) => {
    console.log('INSIDE SETDEFAULTSUBFILTER-->');
    // console.log('secondFilter-->', secondFilter);
    // console.log('filteredShit(entries, secondFilter)-->', filteredShit(entries, secondFilter));
    // console.log('(filteredShit(entries, secondFilter))[0]-->', (filteredShit(entries, secondFilter))[0]);
    setThirdFilter((filteredShit(entries, el))[0]);
    console.log('thirdFilter-->', thirdFilter);

  };

  const pickers = (
    <>
      <ScrollView>
        <View styles={styles.container} >
          <Text>Selected which item to Analyse</Text>
          <Picker
            selectedValue={firstFilter}
            onValueChange={(el) => setFirstFilter(el)}>
            {getLabels(entries[0]).map((el, i) => {
              return <Picker.Item key={i} label={el} value={el} />;
            })
            }
          </Picker>

          <Text>Selected which Filter</Text>
          <Picker
            selectedValue={secondFilter}
            onValueChange={(el) => {
              setSecondFilter(el);
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
            selectedValue={thirdFilter}
            onValueChange={(el) => setThirdFilter(el)}>
            {
              filteredShit(entries, secondFilter).map((el, i) => {
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
              handleOutput(entries, firstFilter, secondFilter, thirdFilter, selectedAnalysys);
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
      {!analysis ? pickers : renderAnalysisResult(firstFilter, selectedAnalysys, result)}
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
