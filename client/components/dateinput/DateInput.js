import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
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
    <View>
      <View style={styles.dateButton}>
        <Button onPress={showDatepicker} title="Select Date" color="white" />
      </View>

      <View style={styles.dateButton}>
        <Button onPress={submitDate} title="Inser Date" color="white" />
      </View>

      <View style={styles.dateButton}>
        <Button onPress={hideDatePicker} title="Exit" color="white" />
      </View>

      {/* <TouchableOpacity onPress={showDatepicker} />
      <TouchableOpacity onPress={submitDate} />
      <TouchableOpacity onPress={hideDatePicker} /> */}

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
  dateButton: {
    height: 40,
    backgroundColor: 'teal',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
