import React, { useState } from 'react';
import { Text, View, FlatList, Button, Picker, Dimensions, ScrollView, Alert } from 'react-native';
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
const screenWidth = Dimensions.get("window").width;

import colors from './../../colors';
console.log('colors-->', colors[1]);


const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const chartTypes = [
  'none',
  'LineChart',
  'BarChart',
  'PieChart',
  'ProgressChart',
  'ContributionGraph',
  'StackedBarChart'
];




const Analysis = ({ entries }) => {
  const [firstFilter, setFirstFilter] = useState(getLabels(entries[0])[0]);
  const [secondFilter, setSecondFilter] = useState('');
  const [thirdFilter, setThirdFilter] = useState('');
  const [selectedAnalysys, setSelectedAnalysys] = useState(getLabels(entries[0])[0]);
  const [selectedChart, setSelectedChart] = useState('');
  const [result, setResult] = useState('');
  const [analysis, setAnalysis] = useState(false);
  const [chartShow, setChartShow] = useState(false);



  const resCleaner = (str) => {
    const arr = str.split('');
    const percentageIndex = arr.findIndex((el) => el === '%');
    return Number(arr.slice(0, percentageIndex).join(''));
  };



  const percentageConverter = (el, tot) => {
    const res = Number(((Number(el) / tot) * 100).toFixed(2));
    return res;
  };

  const randomColorIndexGenerator = () => {
    // const index = Math.round(Math.random() * colors.length);
    const index = Math.floor(Math.random() * Math.floor(colors[1].length));
    console.log('index-->', index);
    return index;

  };

  const dataGraphCreator = (arr, item) => {
    const tot = analysisTypes.sum(arr, 'amount');
    console.log('tot-->', tot);
    const commoneach = [];
    arr.forEach((el) => {
      commoneach.push(Number(((Number(el.amount) / tot) * 100).toFixed(2)));
    });


    let res = [];
    for (let i = 0; i < arr.length; i++) {
      let newObj = {
        name: `% ${arr[i].item}`,
        population: percentageConverter(arr[i].amount, tot),
        color: colors[1][randomColorIndexGenerator()],
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      };
      res.push(newObj);
    }
    console.log('res-->', res);
    return res;
  };

  const hardCoded = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  const showPieChart = (data) => {
    const dataGraph = dataGraphCreator(data);
    return (
      <PieChart
        data={dataGraph}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    );
  };

  const renderAnalysisResult = (...args) => {
    const firstFil = args[0];
    const secFil = args[1];
    const thirdFil = args[2];
    const selAnalysis = args[3];
    const result = typeof args[4] === string ? resCleaner(result) : args[4];
    const string = `The result of the ${selAnalysis} of ${secFil} - ${thirdFil} is: ${result}`;

    const chart = (<View>
      {/* <Text>Bezier Line Chart</Text> */}
      <Text>{string}</Text>

    </View>
    );
    return <>
      { selAnalysis === 'sum' ? <Text>{string}</Text> : chart}
    </>;
  };

  const analysisTypes = {
    sum: (arr, firstFil, secFil, thirdFil) => {
      const filteredList = filterBySub(arr, secFil, thirdFil);
      if (filteredList.length === 1) {
        return filteredList[0][firstFil];
      } else {
        return filteredList.reduce((pv, cv) => {
          return pv + Number(cv[firstFil]);
        }, 0);
      }
    },
    commonsize: (...args) => {
      const arr = args[0];
      const firstFil = args[1];
      const secFil = args[2];
      const thirdFil = args[3];
      const totalExp = analysisTypes.sum(arr, firstFil);
      const filteredTotalExp = analysisTypes.sum(arr, firstFil, secFil, thirdFil);
      const res = `${((filteredTotalExp / totalExp) * 100).toFixed(2)}%`;
      return res;
    },

    // percentageovertot: (filter, arr, selFil, selSubFil) => {
    // },
    // sumcategor: () => {
    // },
    // horizontal: () => {
    // },
    // trend: () => {
    // },
    // commonsize: () => {
    // },
  };

  const handleOutput = (...args) => {
    const arr = args[0];
    const firstFil = args[1];
    const secFil = args[2];
    const thirdFil = args[3];
    const selAnalys = args[4];
    const selGraph = args[5];
    if (selGraph === 'none') {
      if (firstFil === 'none' || selAnalys === 'none') {
        Alert.alert('Plese select at least item second last or graph');
        setAnalysis(false);
      } else {
        const output = analysisTypes[selAnalys](arr, firstFil, secFil, thirdFil);
        setResult(output);
      }
    } else {
      setChartShow(true);
      setSelectedChart(selGraph);
    }
  };

  const filterBySub = (arr, secfil, thirdfil) => {
    return arr.filter((el) => {
      if (thirdfil === 'all') {
        return el[secfil];
      } else {
        return el[secfil] === thirdfil;
      }
    });
  };

  const filteredShit = (arr, filter) => {
    const notUniq = arr.map((el) => {
      return el[filter] + '';
    });
    const res = [...new Set(notUniq)];
    res.push('all');
    return res;
  };

  const setDefaultSubFilter = (el) => {
    setThirdFilter((filteredShit(entries, el))[0]);
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

          <Text>Selected which type of Graph</Text>
          <Picker
            selectedValue={selectedChart}
            onValueChange={(el) => setSelectedChart(el)}>
            {chartTypes.map((el, i) => {
              return <Picker.Item key={i} label={el} value={el} />;
            })
            }
          </Picker>

          <Button
            onPress={(e) => {
              setAnalysis(true);
              handleOutput(entries, firstFilter, secondFilter, thirdFilter, selectedAnalysys, selectedChart);
            }}
            title='Analyse'
          />
        </View>
      </ScrollView>
    </>
  );

  let renderEverything;
  if (!chartShow) {
    if (!analysis) {
      renderEverything = pickers;
    } else {
      renderEverything = renderAnalysisResult(firstFilter, secondFilter, thirdFilter, selectedAnalysys, result);
    }
  } else {
    renderEverything = showPieChart(entries);
  }

  return (
    <>
      {renderEverything}
    </>
  );
};

import { StyleSheet } from 'react-native';
import { render } from 'react-dom';

const styles = StyleSheet.create({
  container: {
    // flex: 3,
    // paddingTop: 30,
    // alignItems: 'center',
  }
});


export default Analysis;
