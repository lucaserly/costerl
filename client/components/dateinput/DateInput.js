import React, { useState } from 'react';
import { TextInput, View, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateInput = ({ handleDateSub }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const submitDate = () => {
    handleDateSub(date);
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  return (  
      <View style={styles.container}>
        <TextInput
        style={styles.input}
        placeholder={"date"}
        />
    
    
      {/* <View style={styles.dateButton}>
        <Button onPress={submitDate} title="Insert Date" color="white" />
      </View> */}

      {/* <View style={styles.dateButton}>
        <Button onPress={hideDatePicker} title="Exit" color="white" />
      </View> */}

      {/* <TouchableOpacity onPress={showDatepicker} />
      <TouchableOpacity onPress={submitDate} />
      <TouchableOpacity onPress={hideDatePicker} /> */}

      {/* {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
      )} */}
    </View>
  );
};

export default DateInput;

// const styles = StyleSheet.create({
//   dateButton: {
//     height: 40,
//     backgroundColor: 'teal',
//     borderRadius: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });


const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: 'white',
    // flex: 1
  },
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    // borderRadius: 5,
  },
});