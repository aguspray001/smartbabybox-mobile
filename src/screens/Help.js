import jwtDecode from 'jwt-decode';
import React, {useEffect} from 'react';
import {ImageBackground, Linking, StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import {hospital2Bg} from '../assets/images';
import {Button} from '../components';
import {colors} from '../constant/colors';
import {secureGetData} from '../constant/storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { fonts } from '../constant/fonts';

const Profile = ({navigation}) => {
  const [user, setUser] = React.useState('');
  const [statusUser, setStatusUser] = React.useState(null);
  const shareWAContent = `Hey, I need your help!`;

  useEffect(async () => {
    const r = await secureGetData('token');
    const decodedToken = jwtDecode(r);
    setUser(decodedToken);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={hospital2Bg}
        style={styles.hero}
        imageStyle={{
          opacity: 0.5,
          backgroundColor: 'green',
          borderBottomRightRadius: 30,
        }}
        resizeMode="cover">
        <View
          style={{
            alignSelf: 'center',
            position: 'absolute',
            bottom: wp('-5px'),
          }}>
          <Button
            title="Help"
            width="40%"
            height="5.5%"
            onPress={() =>
              Linking.openURL(
                `whatsapp://send?text=${shareWAContent}&phone=+6285706568224`,
              )
            }
          />
        </View>
      </ImageBackground>
      <View
        style={{
          alignSelf: 'center',
          marginTop: wp('15%'),
          marginHorizontal: wp('10%'),
        }}>
        <Text style={{textAlign: 'center', padding: 10, fontSize: fonts.size.normal}}>Note:</Text>
        <Text style={{textAlign: 'center', padding: 10, fontSize: fonts.size.normal}}>
          Aplikasi Smart Baby Box adalah aplikasi pelayanan kesehatan untuk
          pengukuran antropometri pada bayi yang meliputi (Tinggi Badan, Berat
          Badan, Suhu Tubuh, dan Lingkar Kepala). Jika membutuhkan bantuan untuk
          menggunakan Aplikasi Smart Baby Box, Anda dapat menekan Button "Help"
          di atas.
        </Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  hero: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  name: {
    fontSize: RFPercentage(2),
    fontWeight: '600',
    color: '#ffff',
    marginTop: 10,
  },
  status: {
    fontSize: RFPercentage(2),
    fontWeight: '400',
    color: '#000',
  },
  avatarWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  cardWrapper: {
    position: 'absolute',
    bottom: -60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    marginTop: 100,
    flexDirection: 'column',
    backgroundColor: colors.white,
    borderRadius: 20,
  },
});
