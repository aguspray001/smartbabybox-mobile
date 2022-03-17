import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import {IconSplash} from '../assets/icon';
import {Button} from '../components';
import {showMessage} from '../constant/alert';
import {colors} from '../constant/colors';
import { fonts } from '../constant/fonts';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const dispatch = useDispatch();

  const handleRegis = () => {
    const payload = {
      email : email.toLowerCase(),
      name,
      password,
      phone_number: phoneNumber,
    };
    if (
      email !== '' ||
      name !== '' ||
      phoneNumber !== '' ||
      password !== '' ||
      rePassword !== ''
    ) {
      if (password === rePassword) {
        dispatch({type: 'sign-up', payload: {...payload, navigation}});
      } else {
        showMessage('Konfirmasi password tidak cocok', 'error');
      }
    } else {
      showMessage('Kesalahan pada pengisian data registrasi', 'error');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <IconSplash width={90} height={90} />
        <Text style={{fontSize: fonts.size.normal, fontWeight: '500', marginTop: 30}}>
          Create your Account
        </Text>
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
          label="Nama Lengkap"
          onChangeText={e => setName(e)}
        />
        <TextInput
          style={styles.textInput}
          keyboardType={'number-pad'}
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
          label="Nomor Telefon"
          onChangeText={e => setPhoneNumber(e)}
        />
        <TextInput
          style={styles.textInput}
          keyboardType={'email-address'}
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
          label="Email"
          onChangeText={e => setEmail(e)}
        />
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
          label="Password"
          secureTextEntry={true}
          onChangeText={e => setPassword(e)}
        />
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
          label="Re-Password"
          secureTextEntry={true}
          onChangeText={e => setRePassword(e)}
        />
        <View style={{alignSelf: 'center', marginTop: 40}}>
          <Button
            title="Sign Up"
            width="45%"
            height="5.8%"
            onPress={() => handleRegis()}
          />
          <TouchableOpacity
            style={styles.register}
            onPress={() => navigation.navigate('Login')}>
            <Text style={{fontSize: fonts.size.normal}}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingHorizontal: 30,
    position: 'relative',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  title: {
    marginBottom: 40,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '500',
    fontSize:  fonts.size.normal,
  },
  textInput: {
    fontSize:  fonts.size.normal,
    height: heightPercentageToDP('6%'),
    width: widthPercentageToDP('60%'),
    marginTop: 20,
  },
  register: {alignSelf: 'center', marginTop: 20},
});
