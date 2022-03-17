import {combineReducers} from 'redux';
import authReducer from './authReducer';
import globalReducer from './globalReducer';
import requestReducer from './requestReducer';
import babyReducer from './babyReducer';
import measurementReducer from './measurementReducer';

const reducer = combineReducers({
  authReducer,
  globalReducer,
  requestReducer,
  babyReducer,
  measurementReducer,
});

export default reducer;
