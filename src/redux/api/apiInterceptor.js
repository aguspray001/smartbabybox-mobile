import {call, select} from 'redux-saga/effects';
import {showMessage} from '../../constant/alert';
import {secureGetData} from '../../constant/storage';
import {get, post} from './service';

const processRespData = resp => {
  const {data, status} = resp;
  if (parseInt(status) === 401) {
    showMessage('Terjadi kesalahan pada API interceptor', 'error');
    return false;
  } else if (parseInt(status) === 200) {
    // showMessage('Success fetch data', 'success');
    return data.data;
  }
};

export function* doPost(payload) {
  try {
    const token = yield call(secureGetData, 'token');

    console.log("dopost:", payload)
    const data = token !== '' ? {...payload, token} : payload;
    console.log("data dopost => ", data)
    let resp = yield call(post, data);
    console.log('resp dopost:', resp);
    return yield call(processRespData, resp);
  } catch (e) {
    throw e;
  }
}

export function* doGet(payload) {
  try {
    const token = yield call(secureGetData, 'token');
    console.log("token => ", token)
    const data = token ? {...payload, token} : payload;
    let resp = yield call(get, data);
    console.log("resp => ", resp)
    return yield call(processRespData, resp);
  } catch (e) {
    throw e;
  }
}
