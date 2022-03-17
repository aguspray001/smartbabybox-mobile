import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../constant/colors';
import CardItem from './CardItem';
import { fonts } from '../constant/fonts';
import { getHeadSizeDecision, getHeightBodyDecision, getTemperatureDecision, getWeightBodyDecision } from '../constant/logic';

const CardMeasurement = ({babyId, measurementDate, name, sex, age, head_size, height_body, weight, temperature,  width, height, mb}) => {

  const getFormatedDate = date => {
    return moment(date).format('DD/MM/YYYY').toString();
  };

  return (
    <View style={styles.container(width, height, mb)}>
      <View style={styles.header}>
        <Text style={{fontSize: fonts.size.normal, color: 'white', fontWeight: '500'}}>
          ID Bayi: {babyId}
        </Text>
        <Text style={{fontSize: fonts.size.normal, color: 'white', fontWeight: '500'}}>
          Pengukuran: {getFormatedDate(measurementDate)}
        </Text>
      </View>
      <View styles={styles.content}>
        <Text
          style={{
            fontSize: fonts.size.normal,
            fontWeight: '500',
            marginBottom: 10,
            marginLeft: 10,
            marginTop: 10,
          }}>
          {name} ({sex === 1 ? 'L' : 'P'})
        </Text>
        <CardItem
          title={"Usia"}
          value={age || "< 1"}
          unit={"bulan"}
        />
        <CardItem
          title={"Tinggi Badan"}
          value={height_body}
          unit={"cm"}
          decision={getHeightBodyDecision(sex, age, height_body)}
        />
       <CardItem
          title={"Berat Badan"}
          value={weight}
          unit={"kg"}
          decision={getWeightBodyDecision(sex, age, weight)}
        />
        <CardItem
          title={"Suhu Tubuh"}
          value={temperature}
          unit={"celcius"}
          decision={getTemperatureDecision(temperature)}
        />       
        <CardItem
          title={"Lingkar Kepala"}
          value={head_size}
          unit={"cm"}
          decision={getHeadSizeDecision(sex, age, head_size)}
        />
      </View>
    </View>
  );
};

export default CardMeasurement;

const styles = StyleSheet.create({
  container: (width, height, mb) => ({
    flex: 1,
    padding: 5,
    marginBottom: mb,
    width: wp(width),
    height: hp(height),
    backgroundColor: '#ffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 12,
    },
    shadowOpacity: 0.28,
    shadowRadius: 16.0,

    elevation: 5,
  }),
  textWrapper: {
    width: wp('80%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  valueWrapper: {width: wp('50%'), flexDirection: 'row'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.secondary,
    width: '100%',
    borderRadius: 10,
    padding: 15,
    marginTop: 5,
  },
});
