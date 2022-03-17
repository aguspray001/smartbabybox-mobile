import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {fonts} from '../constant/fonts';

const Carditem = ({title, value, unit = '', decision='normal'}) => {
  console.log("decision => ", decision)

  return (
    <View style={styles.textWrapper}>
      <Text style={{fontSize: fonts.size.normal}}>{title}</Text>
      <View style={styles.valueWrapper}>
        <Text style={{fontSize: fonts.size.normal}}> :</Text>
        <Text style={styles.textValue(decision)}>
          {' '}
          {value} {unit}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    width: wp('80%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  valueWrapper: {width: wp('50%'), flexDirection: 'row'},
  textValue: (decision) => ({
    fontSize: fonts.size.normal,
    color : decision === 'under' ? 'orange' : decision === 'over' ? 'red' : 'black',
  }),
});

export default Carditem;
