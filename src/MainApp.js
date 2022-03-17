import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogBox} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {Provider as PaperProvider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import {useSelector} from 'react-redux';
import {secureGetData} from './constant/storage';
import {RootStack} from './navigation';
import {Loading} from './screens';
// Ignore all log notifications:
LogBox.ignoreAllLogs();

const MainApp = () => {
  const {loader} = useSelector(state => state.globalReducer);
  const [signed, setSigned] = React.useState('');

  React.useEffect(async () => {
    const token = await secureGetData('token');

    if (token === '' || token === null || token === undefined) {
      setSigned(false);
      SplashScreen.hide();
    } else {
      setSigned(true);
      SplashScreen.hide();
    }

  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        {signed !== '' && <RootStack isLogin={signed === false ? false : true} />}
        <FlashMessage position="top" duration={4000} hideStatusBar={false} />
      </NavigationContainer>
      {loader && <Loading />}
    </PaperProvider>
  );
};

export default MainApp;
