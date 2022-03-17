import {all, call, fork, put, select, takeEvery} from 'redux-saga/effects';
import {showMessage} from '../../constant/alert';
import {doGet, doPost} from '../api/apiInterceptor';
import Decoder from 'jwt-decode';
import {secureGetData, secureStoreData} from '../../constant/storage';
import {BaseUrl} from '../../constant/url';

const postBaby = `${BaseUrl}/baby/create`;
const getBaby = `${BaseUrl}/baby/`;

function* doGetBabies({payload}) {
  try {
    yield put({type: 'show-loader'});
    yield put({type: 'process-get-baby'});
    const resp = yield call(doGet, {url: getBaby});
    console.log('do get babies: => ', resp);
    yield put({type: 'success-get-baby', payload: resp});
    yield put({type: 'hide-loader'});
  } catch (error) {
    console.error(error)
    yield showMessage('Terjadi kesalahan', 'error');
    yield put({type: 'failed-get-baby'});
    yield put({type: 'hide-loader'});
  }
}

function* doPostBaby({payload}) {
  const {name, born_date, sex} = payload;
  try {
    yield put({type: 'show-loader'});

    const resp = yield call(doPost, {
      data: {
        name,
        born_date,
        sex,
      },
      url: postBaby,
    });
    console.log('post baby: => ', resp);
    if (resp) {
      yield showMessage('Success add your baby', 'success');
      yield put({type: 'hide-loader'});
    }else if( resp === undefined){
      yield showMessage('Failed add your baby', 'error');
      yield put({type: 'hide-loader'});
    }
  } catch (error) {
    yield showMessage('Failed add your baby', 'error');
    yield put({type: 'hide-loader'});
  }
}

export function* getBabiesSaga() {
  yield takeEvery('baby-get', doGetBabies);
}

export function* postBabySaga() {
  yield takeEvery('baby-post', doPostBaby);
}

export default function* rootSaga() {
  yield all([fork(getBabiesSaga), fork(postBabySaga)]);
}
