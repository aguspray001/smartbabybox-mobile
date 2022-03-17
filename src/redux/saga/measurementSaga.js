import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import {showMessage} from '../../constant/alert';
import {doGet, doPost} from '../api/apiInterceptor';
import {BaseUrl} from '../../constant/url';

const getMeasuremntUrl = `${BaseUrl}/measurement/`;
const downloadMeasurementUrl = `${BaseUrl}/measurement/download/`;

function* doGetMeasurements({payload}) {
  const {babyId} = payload;
  try {
    yield put({type: 'show-loader'});
    yield put({type: 'process-get-measurement'});
    const resp = yield call(doGet, {url: getMeasuremntUrl + `${babyId}`});
    console.log('do get measurement: => ', resp);
    yield put({type: 'success-get-measurement', payload: resp});
    yield put({type: 'hide-loader'});
  } catch (error) {
    console.error(error);
    yield showMessage('Terjadi kesalahan', 'error');
    yield put({type: 'failed-get-measurement'});
    yield put({type: 'hide-loader'});
  }
}

function* doDownloadMeasurement({payload}) {
  const {babyId} = payload;
  try {
    yield put({type: 'show-loader'});
    const resp = yield call(doGet, {url: downloadMeasurementUrl + `${babyId}`});
    if (resp) {
      showMessage('Data berhasil didownload!', 'success');
    }
    yield put({type: 'hide-loader'});
  } catch (error) {
    yield showMessage('Terjadi kesalahan', 'error');
    yield put({type: 'hide-loader'});
  }
}

export function* getMeasurementSaga() {
  yield takeEvery('measurement-get', doGetMeasurements);
}

export function* downloadMeasurementSaga() {
  yield takeEvery('measurement-download', doDownloadMeasurement);
}

export default function* rootSaga() {
  yield all([fork(getMeasurementSaga), fork(downloadMeasurementSaga)]);
}
