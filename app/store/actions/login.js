import {RSAA} from 'redux-api-middleware';
import Config from 'react-native-config';
import {remove} from '../../utils/storage';
import {loginValidator} from '../validators/login';
import {diags} from '../../utils/debug';
import {dataForm} from '../../utils/helpers';
import DeviceInfo from 'react-native-device-info';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';

export const USER_REGISTRATION_REQUEST = 'USER_REGISTRATION_REQUEST';
export const USER_REGISTRATION_SUCCESS = 'USER_REGISTRATION_SUCCESS';
export const USER_REGISTRATION_ERROR = 'USER_REGISTRATION_ERROR';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_ERROR = 'USER_LOGOUT_ERROR';

export const USER_RESET_PASSWORD = 'USER_RESET_PASSWORD';

export const USER_REFRESH_TOKEN = 'USER_REFRESH_TOKEN';

export const doLogin = payload => dispatch => {
  const errors = loginValidator(payload);
  if (errors && errors.length) {
    return dispatch({
      type: USER_LOGIN_ERROR,
      errors,
    });
  }

  const {loginid, password} = payload;
  return dispatch(
    dataForm(
      'vendors/login',
      {email: loginid, password, device_id: DeviceInfo.getUniqueId()},
      [USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR],
    ),
  );
};

export const doLogout = () => dispatch => {
  /*return dispatch({
    [RSAA]: {
      endpoint: `${Config.API_URL}user/signoff`,
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      types: [USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_LOGOUT_ERROR],
    },
  });*/
  dispatch({
    type: USER_LOGOUT_SUCCESS,
  });
};

export const resetPassword = () => ({
  type: USER_RESET_PASSWORD,
});

export const refreshLoginToken = token => ({
  type: USER_REFRESH_TOKEN,
  token,
});
