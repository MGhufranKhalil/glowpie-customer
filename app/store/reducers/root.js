import {combineReducers} from 'redux';

import login from './login';
import registration from './registration';
import verification from './verification';
import vendor from './vendor';
import forgotpassword from './forgotpassword';

export default combineReducers({
  login,
  registration,
  verification,
  vendor,
  forgotpassword,
});
