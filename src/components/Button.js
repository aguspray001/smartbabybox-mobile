import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../constant/colors';
import { fonts } from '../constant/fonts';

const Button = ({title, width, height, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container(width, height)}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (width, height) => ({
    width: wp(width),
    height: hp(height),
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  title: {
    fontSize: fonts.size.normal,
    color: colors.white,
    textAlign: 'center',
  },
});
