import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGOUT_SUCCESS,
} from '../actions/login';
import {REG_ACCOUNT_REQUEST} from '../actions/registration';
import {getActionError} from '../../utils/helpers';
import {saveString, remove, clear} from '../../utils/storage';

const initialState = {
  loginid: '',
  password: '',
  error: '',
  success: false,
  loading: false,
  token: '', // after auto login, this will be loaded from storage
};

export default (state = initialState, action) => {
  const {success, code, message, data} = action.payload || {};
  // console.tron.log(action);
  switch (action.type) {
    /*case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        success: false,
      };*/
    case USER_LOGIN_SUCCESS:
      // loginid is saved as email in the request object before api call
      if (success && code && Number(code) === 200 && data.token) {
        console.tron.log(`Saving user login info`);
				console.tron.log(data);
        // @@TODO: save securely, and think of encryption when releasing ios build
        saveString('loginid', action.meta.request.email);
        saveString('password', action.meta.request.password);
        return {
          ...state,
          loginid: data.email,
          token: data.token,
          error: '',
          success: true,
          loading: false,
        };
      }
      // delete saved login if it does not work
      remove('loginid');
      remove('password');
      return {
        ...state,
        error: getActionError(
          action,
          'Login Failed. Please check your network connection.',
        ),
        loading: false,
        success: false,
      };
    case USER_LOGIN_ERROR:
      console.tron.log(action);
      return {
        ...state,
        error: getActionError(action, 'Login Failed'),
        loading: false,
        success: false,
      };
    case USER_LOGOUT_SUCCESS:
      console.tron.log('Logout');
      remove('loginid');
      remove('password');
      clear();
      return {};
    case REG_ACCOUNT_REQUEST:
      // clear all login errors when registration is successful
      return {
        ...state,
        error: '',
        loading: false,
      };
    default:
      return state;
  }
};
