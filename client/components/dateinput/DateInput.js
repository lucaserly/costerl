import React, { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateInput = ({ handleDateSub }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    submitDate(date);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const submitDate = () => {
    handleDateSub(date);
    hideDatePicker();
  };

  return (   
      <View style={styles.container}>
          <Text style={styles.input} onPress={showDatepicker} >
            add date
          </Text>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
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