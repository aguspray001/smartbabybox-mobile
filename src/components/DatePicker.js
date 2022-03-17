import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {View} from 'react-native';

const DatePicker = ({onChange, date}) => {
  return (
    <View>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={'date'}
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
    </View>
  );
};

export default DatePicker;
