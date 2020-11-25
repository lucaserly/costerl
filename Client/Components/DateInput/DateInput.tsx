import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
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
  const [show, setShow] = useState<boolean>(false);
  
  const onChange = (e: Event) => {
    setShow(Platform.OS === 'ios');
    // @ts-expect-error
    var dateToSet = e.nativeEvent.timestamp;
    setDate(dateToSet);
    handleDateSub(date);
  }; 

  const showMode = () => {
    setShow(true);
  };

  return (   
      <View style={styles.container}>
          <Text style={styles.input} onPress={showMode} >
            add date
          </Text>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
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