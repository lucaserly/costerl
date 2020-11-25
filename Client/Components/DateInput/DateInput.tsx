import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface HandleDateSub {
  (
   date: Date
  ) : void;
}

interface Props {
  handleDateSub : HandleDateSub
}

const DateInput = ({ handleDateSub }: Props) : JSX.Element => {
  const [date, setDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<string>('date'); // remove?
  const [show, setShow] = useState<boolean>(false);
  

  const onChange = (e: Event) => {
    setShow(Platform.OS === 'ios');
    // @ts-expect-error
    var dateToSet = e.nativeEvent.timestamp;
    setDate(dateToSet); // still in timestamp format
    handleDateSub(date);
  }; 

  const showMode = () => {
    setShow(true);
    // setMode(currentMode);
  };

  // const showDatepicker = () => {
  //   showMode('date'); 
  // };

  // const submitDate = () => {
  //   handleDateSub(date);
  //   // console.log("------");
  //   // console.log(date);
  // };

  return (   
      <View style={styles.container}>
          <Text style={styles.input} onPress={showMode} >
            add date
          </Text>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          // mode= {mode}
          is24Hour={true}
          display="spinner"
          onChange={onChange} 
        />
      )}
    </View>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },

  input: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    color: "grey",
  },
});