import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {IconBaby, IconHistory, IconProfile} from '../assets/icon';
import { fonts } from '../constant/fonts';

const Card = ({title, width, height, onPress}) => {
  return (
    <TouchableOpacity style={styles.container(width, height)} onPress={onPress}>
      {title === 'Add Baby' ? (
        <IconBaby width={wp('10%')} height={hp('7%')} />
      ) : title === 'Profile' ? (
        <IconProfile width={wp('10%')} height={hp('7%')} />
      ) : (
        <IconHistory width={wp('10%')} height={hp('7%')} />
      )}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: (width, height) => ({
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(width),
    height: hp(height),
    backgroundColor: '#ffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 12,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.0,

    elevation: 5,
  }),
  title: {
    fontSize: fonts.size.sm,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '400',
  },
});
