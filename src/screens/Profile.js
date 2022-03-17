import jwtDecode from 'jwt-decode';
import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import {hospital2Bg} from '../assets/images';
import {Button, CardItem} from '../components';
import {colors} from '../constant/colors';
import {secureGetData} from '../constant/storage';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState('');

  useEffect(async () => {
    const r = await secureGetData('token');
    const decodedToken = jwtDecode(r);
    setUser(decodedToken);
  }, []);

  const handleLogout = () => {
    dispatch({type: 'sign-out', payload: {navigation}});
  };

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
        <View style={styles.cardContainer}>
          <View style={styles.cardContent}>
            <CardItem title={'Name'} value={user?.name} />
            <CardItem title={'Email'} value={user?.email} />
            <CardItem title={'Phone'} value={user?.phone_number} />
          </View>
        </View>
      </ImageBackground>
      <View style={{alignSelf: 'center', position: 'absolute', bottom: '5%'}}>
        <Button
          title="Sign Out"
          width="35%"
          height="5.5%"
          onPress={() => handleLogout()}
        />
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
    height: heightPercentageToDP('35%'),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cardContainer: {
    flex: 1,
    padding: 5,
    width: widthPercentageToDP('85%'),
    height: heightPercentageToDP('18%'),
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
    position: 'absolute',
    top: heightPercentageToDP('30%'),
  },
  cardContent:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: heightPercentageToDP('1%'),
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: widthPercentageToDP('7%'),
  }
});
