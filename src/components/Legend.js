import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { fonts } from '../constant/fonts';

const Legend = ({title}) => {
  return (
    <View style={styles.container}>
      <View style={styles.boxLegend(title)}></View>
      <Text style={{fontSize: fonts.size.normal}}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxLegend: title => ({
    width: widthPercentageToDP('8%'),
    height: heightPercentageToDP('2%'),
    backgroundColor:
      title === 'Over' ? 'red' : title === 'Under' ? 'orange' : 'black',
    marginRight: 5,
  }),
});

export default Legend;
