import jwtDecode from 'jwt-decode';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Modal, Portal, TextInput, RadioButton} from 'react-native-paper';
import {hospital2Bg} from '../assets/images';
import {Button, DatePicker} from '../components';
import Card from '../components/Card';
import {colors} from '../constant/colors';
import {secureGetData} from '../constant/storage';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {modalStyle} from '../constant/style';
import {fonts} from '../constant/fonts';

const Home = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [sex, setSex] = useState(1);
  const [birthDate, setBirthDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(async () => {
    const r = await secureGetData('token');
    const decodedToken = jwtDecode(r);
    setUser(decodedToken);
  }, []);

  const showModal = () => setVisible(true);

  const setBabyDataToDefault = () => {
    // set add baby form to be null:
    setBirthDate(null);
    setDate(new Date());
    setName('');
    setSex(1);
  };
  const hideModal = () => {
    setVisible(false);
    setBabyDataToDefault();
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setBirthDate(moment(currentDate).format('DD-MM-YYYY').toString());
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const addBaby = () => {
    dispatch({type: 'baby-post', payload: {name, born_date: birthDate, sex}});
    setTimeout(() => {
      hideModal();
    }, 600);
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
        <View style={styles.avatarWrapper}>
          <Text style={styles.status}>
            {user === '' ? '' : `Hi, ${user?.name}`}
          </Text>
          <Text style={styles.status}>Wellcome to Smart Baby Box's App</Text>
        </View>
        <View style={styles.cardWrapper}>
          <Card
            width="27%"
            height="14%"
            title="Profile"
            onPress={() => navigation.navigate('Profile')}
          />
          <Card width="27%" height="14%" title="Add Baby" onPress={showModal} />
          <Card
            width="27%"
            height="14%"
            title="List Baby"
            onPress={() => navigation.navigate('History')}
          />
        </View>
      </ImageBackground>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={modalStyle}>
          <Text style={{fontSize: fonts.size.normal}}>Add your baby here:</Text>
          <TextInput
            style={styles.textInput}
            outlineColor={colors.primary}
            mode="outlined"
            onChangeText={e => setName(e)}
            value={name}
            theme={{
              colors: {
                primary: 'green',
                underlineColor: 'transparent',
                text: '#000',
                background: '#fff',
                placeholder: colors.primary,
              },
            }}
            label="Nama"
          />
          <TouchableOpacity onPress={() => showDatepicker()}>
            <TextInput
              style={styles.textInput}
              outlineColor={colors.primary}
              mode="outlined"
              theme={{
                colors: {
                  primary: 'green',
                  underlineColor: 'transparent',
                  text: '#000',
                  background: '#fff',
                  placeholder: colors.primary,
                },
              }}
              label="Tanggal Lahir"
              value={birthDate}
              onFocus={() => showDatepicker()}
              onChangeText={e => setBirthDate(e)}
            />
          </TouchableOpacity>
          {show && <DatePicker onChange={onChange} date={date} />}
          <RadioButton.Group onValueChange={v => setSex(v)} value={sex}>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 30,
                }}>
                <RadioButton uncheckedColor={'grey'} value={1} />
                <Text style={{fontSize: fonts.size.normal}}>Laki-Laki</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <RadioButton uncheckedColor={'grey'} value={2} />
                <Text style={{fontSize: fonts.size.normal}}>Perempuan</Text>
              </View>
            </View>
          </RadioButton.Group>
          <View style={{marginTop: hp('7%')}}>
            <Button
              title="Add Baby"
              width="35%"
              height="5.5%"
              onPress={() => addBaby()}
            />
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default Home;

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
  status: {
    fontSize: fonts.size.md,
    fontWeight: '600',
    color: '#ffff',
  },
  textInput: {
    fontSize: fonts.size.normal,
    height: hp('6%'),
    width: wp('60%'),
    marginTop: 10,
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
