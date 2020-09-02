import {combineReducers} from 'redux';

import login from './login';
import registration from './registration';
import verification from './verification';
import vendor from './vendor';

export default combineReducers({
  login,
  registration,
  verification,
  vendor,
});
