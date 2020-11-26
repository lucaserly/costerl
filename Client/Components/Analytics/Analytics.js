import React, { useState } from 'react';
import { Text, View, Picker, Dimensions, ScrollView, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

import config from '../../config';
const { getLabels } = config.helperFunctions;
const screenWidth = Dimensions.get('window').width;

import colors from '../../colors';

const chartConfigs = {
  pieChart: {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  },
  lineChart: {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#cb4b16',
    backgroundGradientTo: '#cb4b16',
    backgroundGradientToOpacity: 0.8,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    // labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  },
};

const Analytics = ({ entries }) => {
  const [firstFilter, setFirstFilter] = useState(getLabels(entries[0])[0]);
  const [secondFilter, setSecondFilter] = useState('');
  const [thirdFilter, setThirdFilter] = useState('');
  const [selectedAnalysys, setSelectedAnalysys] = useState(getLabels(entries[0])[0]);
  const [selectedChart, setSelectedChart] = useState('none');
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
    const index = Math.floor(Math.random() * Math.floor(colors[1].length));

    return index;
  };

  const months = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };

  const dataGraphCreators = {
    pieChart: (...args) => {
      const arr = args[0];
      const firstFil = args[1];
      const secFil = args[2];
      const thirFil = args[3];
      const tot = analysisTypes.sum(arr, 'amount');
      const commoneach = [];
      arr.forEach((el) => {
        commoneach.push(Number(((Number(el.amount) / tot) * 100).toFixed(2)));
      });

      let key;
      if (firstFil === 'none') {
        key = 'item';
      } else {
        key = secFil;
      }

      let res = [];
      for (let i = 0; i < arr.length; i++) {
        let newObj = {
          name: `% ${arr[i][key]}`,
          population: percentageConverter(arr[i].amount, tot),
          color: colors[1][randomColorIndexGenerator()],
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        };
        res.push(newObj);
      }

      return res;
    },
    lineChart: (...args) => {
      const monthExtractor = (el) => {
        const res = months[el.date.split('').slice(5, 7).join('')];
        return res;
      };

      const arr = args[0];
      const firstFil = args[1];
      const secFil = args[2];
      const thirFil = args[3];

      let input;

      if (firstFil !== 'none' || secFil !== '' || thirFil !== '') {
        input = filterBySub(arr, secFil, thirFil);
      } else {
        input = arr;
      }

      const labels2 = {};

      input.forEach((el) => {
        if (labels2[monthExtractor(el)]) {
          labels2[monthExtractor(el)] += Number(el.amount);
        } else {
          labels2[monthExtractor(el)] = Number(el.amount);
        }
      });

      // GOOTA SORT LABELS2 BASED ON MONTHS

      for (let num in months) {
        for (let month in labels2) {
          if (months[num] === month) {
            labels2[month] = [labels2[month], num];
          }
        }
      }

      const arrToSort = [];
      for (let key in labels2) {
        arrToSort.push({
          [key]: labels2[key],
        });
      }

      const sortedArr = arrToSort.sort((a, b) => {
        const month1 = Number(Object.values(a)[0][1]);
        const month2 = Number(Object.values(b)[0][1]);
        return month1 - month2;
      });

      const flattener = (arr, cb, index) => {
        if (index) return arr.map((el) => cb(el)[index][index]).flat();
        else return arr.map((el) => cb(el)).flat();
      };

      const dataS = {
        labels: flattener(sortedArr, Object.keys),
        datasets: [
          {
            data: flattener(sortedArr, Object.values, '0'),
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2, // optional
          },
        ],
        legend: [thirFil],
      };

      return dataS;
    },
  };

  const renderAnalysisResult = (...args) => {
    const firstFil = args[0];
    const secFil = args[1];
    const thirdFil = args[2];
    const selAnalysis = args[3];
    const result = typeof args[4] === string ? resCleaner(result) : args[4];
    const stringHeader = `The result of the ${selAnalysis} analysis of ${secFil}`;
    const string = ` - ${thirdFil} is: ${result} €`;
    const chart = (
      <View>
        {/* <Text>Bezier Line Chart</Text> */}
        <Text>{string}</Text>
      </View>
    );

    return (
      <>
        {selAnalysis === 'sum' || 'commonsize' ? (
          <>
            <View style={styles.container}>
              <View style={styles.textAnalysisBox}>
                <Text style={styles.textAnalysis}>{stringHeader}</Text>
              </View>
              <View style={styles.textAnalysisBox}>
                <Text style={styles.textAnalysis}>{string}</Text>
              </View>
            </View>
          </>
        ) : (
          chart
        )}
      </>
    );
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
    setThirdFilter(filteredShit(entries, el)[0]);
  };

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Rainy Days'], // optional
  };

  const chartFuncs = {
    pieChart: (...args) => {
      const data = args[0];
      const dataGraphCreator = args[1];
      const screenWidth = args[2];
      const chartConfig = args[3];
      const firstFil = args[4];
      const secFil = args[5];
      const thirFil = args[6];

      let dataGraph;
      if (firstFil !== 'none' || secFil !== '' || thirFil !== '') {
        const filteredData = filterBySub(data, secFil, thirFil);

        let congragatedSum = {};

        filteredData.forEach((el) => {
          if (congragatedSum[secFil]) {
            congragatedSum[el[secFil]] += Number(el.amount);
          } else {
            congragatedSum[el[secFil]] = Number(el.amount);
          }
        });

        let congragatedArr = [];

        for (let key in congragatedSum) {
          congragatedArr.push({
            [secFil]: key,
            [firstFil]: String(congragatedSum[key]),
          });
        }
        dataGraph = dataGraphCreator(congragatedArr, firstFil, secFil, thirFil);
      } else {
        dataGraph = dataGraphCreator(data, firstFil);
      }
      
      return (
        <View style={styles.pieChart}>
          <View style={styles.textBox}>
            <Text style={styles.text}>PIE CHART</Text>
          </View>

          <View>
            <PieChart
              data={dataGraph}
              width={screenWidth - 30}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        </View>
      );
    },
    lineChart: (...args) => {
      const data = args[0];
      const dataGraphCreator = args[1];
      const screenWidth = args[2];
      const chartConfig = args[3];
      const firstFil = args[4];
      const secFil = args[5];
      const thirFil = args[6];
      const dataGraph = dataGraphCreator(data, firstFil, secFil, thirFil);

      return (
        <View style={styles.pieChart}>
          <View style={styles.textBox}>
            <Text style={styles.text}>PIE CHART</Text>
          </View>

          {/* <View> */}
          <LineChart data={dataGraph} width={screenWidth - 20} height={220} chartConfig={chartConfig} />
          {/* </View> */}
        </View>
      );
    },
  };

  const charts = Object.keys(chartFuncs);
  charts.unshift('none');

  const pickers = (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.textBox}>
            <Text style={styles.text}>Selected Item</Text>
          </View>
          <Picker selectedValue={firstFilter} onValueChange={(el) => setFirstFilter(el)}>
            {getLabels(entries[0]).map((el, i) => {
              return <Picker.Item key={i} label={el} value={el} />;
            })}
          </Picker>

          <View style={styles.textBox}>
            <Text style={styles.text}>Select Filter</Text>
          </View>
          <Picker
            selectedValue={secondFilter}
            onValueChange={(el) => {
              setSecondFilter(el);
              setDefaultSubFilter(el);
            }}
          >
            {getLabels(entries[0]).map((el, i) => {
              return <Picker.Item key={i} label={el} value={el} />;
            })}
          </Picker>

          <View style={styles.textBox}>
            <Text style={styles.text}>Select Filter</Text>
          </View>
          <Picker selectedValue={thirdFilter} onValueChange={(el) => setThirdFilter(el)}>
            {filteredShit(entries, secondFilter).map((el, i) => {
              return <Picker.Item key={i} label={el} value={el} />;
            })}
          </Picker>

          <View style={styles.textBox}>
            <Text style={styles.text}>Analysis Method</Text>
          </View>
          <Picker selectedValue={selectedAnalysys} onValueChange={(el) => setSelectedAnalysys(el)}>
            {getLabels(analysisTypes).map((el, i) => {
              return <Picker.Item key={i} label={el} value={el} />;
            })}
          </Picker>

          <View style={styles.textBox}>
            <Text style={styles.text}>Graphs</Text>
          </View>
          <Picker selectedValue={selectedChart} onValueChange={(el) => setSelectedChart(el)}>
            {charts.map((el, i) => {
              return <Picker.Item key={i} label={el} value={el} />;
            })}
          </Picker>

          <TouchableOpacity
            style={styles.button}
            onPress={(e) => {
              setAnalysis(true);
              handleOutput(entries, firstFilter, secondFilter, thirdFilter, selectedAnalysys, selectedChart);
            }}
            title="Analyse"
          >
            <Text style={styles.buttonText}>Analyse</Text>
          </TouchableOpacity>
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
    renderEverything = chartFuncs[selectedChart](
      entries,
      dataGraphCreators[selectedChart],
      screenWidth,
      chartConfigs[selectedChart],
      firstFilter,
      secondFilter,
      thirdFilter,
    );
  }

  return <>{renderEverything}</>;
};

export default Analytics;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  textBox: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#cb4b16',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  pieChart: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  button: {
    height: 40,
    backgroundColor: '#cb4b16',
    // borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  textAnalysisBox: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#cb4b16',
  },
  textAnalysis: {
    color: 'black',
    fontWeight: 'bold',
  },
});
