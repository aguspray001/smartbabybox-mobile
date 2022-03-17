import moment from 'moment';
import {PermissionsAndroid} from 'react-native';
import XLSX from 'xlsx';
import {showMessage} from './alert';
var RNFS = require('react-native-fs');

export const convertToRupiah = angka => {
  var rupiah = '';
  var angkarev = angka.toString().split('').reverse().join('');
  for (var i = 0; i < angkarev.length; i++)
    if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
  return rupiah
    .split('', rupiah.length - 1)
    .reverse()
    .join('');
};

const getFormatedDate = date => {
  return moment(date).format('DD-MM-YYYY').toString();
};

const exportDataToExcel = (babyId, dataRows) => {
  let babyData = dataRows?.map(d => {
    return {
      id: d?.baby_id,
      height: d?.height,
      weight: d?.weight,
      temperature: d?.temperature,
      head_size: d?.head_size,
      tanggal: getFormatedDate(d?.createdAt),
      usia: d?.baby?.baby_age,
    };
  });

  let wb = XLSX.utils.book_new();
  let ws = XLSX.utils.json_to_sheet(babyData);
  XLSX.utils.book_append_sheet(wb, ws, 'Users');
  const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});

  // Write generated excel to Storage
  RNFS.writeFile(
    RNFS.DownloadDirectoryPath +
      `/${babyId}-${getFormatedDate(new Date())}.xlsx`,
    wbout,
    'ascii',
  )
    .then(r => {
      showMessage('Yeay! Success download data and saved in : ' + RNFS.DownloadDirectoryPath +
      `/${babyId}-${getFormatedDate(new Date())}.xlsx`, 'success');
    })
    .catch(e => {
      showMessage('Ouch, Failed download data.', 'error');
    });
};

export const downloadFile = async (babyId, dataRows) => {
  try {
    // Check for Permission (check if permission is already given or not)
    let isPermitedExternalStorage = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (!isPermitedExternalStorage) {
      // Ask for permission
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage permission needed',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission Granted (calling our exportDataToExcel function)
        showMessage('Permission Granted', 'error');
        exportDataToExcel(babyId, dataRows);
      } else {
        // Permission denied
        showMessage('Permission denied', 'error');
      }
    } else {
      // Already have Permission (calling our exportDataToExcel function)
      exportDataToExcel(babyId, dataRows);
    }
  } catch (e) {
    showMessage('Error while checking permission', 'error');
  }
};

// const downloadFromBrowser = babyId => {
//   Linking.openURL(`${BaseUrl}/measurement/download/${babyId}`)
//     .then(r => console.log(r))
//     .catch(e => console.log(e));
// };
