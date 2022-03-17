import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button} from '.';
import {colors} from '../constant/colors';
import { fonts } from '../constant/fonts';
import Carditem from './CardItem';

const CardHistory = ({
  title,
  navigation,
  bornDate,
  babyId,
  sex,
  age,
  createdAt,
  width,
  height,
  mb,
}) => {

  return (
    <View style={styles.container(width, height, mb)}>
      <View style={styles.header}>
        <Text style={{fontSize: RFPercentage(2), color: 'white', fontWeight: '500'}}>
          ID Bayi: {babyId}
        </Text>
        <Text style={{fontSize: fonts.size.normal, color: 'white', fontWeight: '500'}}>
          Terdaftar: {createdAt}
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
          {title}
        </Text>
        <Carditem
          title={"Tanggal lahir"}
          value={bornDate}
        />
        <Carditem
          title={"Jenis Kelamin"}
          value={sex === 1 ? "Laki-Laki" : "Perempuan"}
        />
        <Carditem
          title={"Usia saat ini"}
          value={age || "< 1"}
          unit="bulan"
        />
      </View>
      <View style={{position: 'absolute', right: wp('5%'), bottom: wp('3%')}}>
        <Button
          title="Check"
          width="22%"
          height="5%"
          onPress={() =>
            navigation.replace('DetailHistory', {
              babyId: babyId,
            })
          }
        />
      </View>
    </View>
  );
};

export default CardHistory;

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
