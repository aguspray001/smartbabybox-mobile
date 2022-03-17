import {all} from 'redux-saga/effects';
import AuthSaga from './authSaga';
import RequestSaga from './requestSaga';
import BabySaga from './babySaga';
import MeasurementSaga from './measurementSaga';

export default function* rootSaga() {
  yield all([AuthSaga(), RequestSaga(), BabySaga(), MeasurementSaga()]);
}
