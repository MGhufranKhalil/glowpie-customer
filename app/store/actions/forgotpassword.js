import {dataForm} from '../../utils/helpers';
import { isValidEmail, isValidCode} from '../validators/common';

export const FORGOT_PW_REQUEST = 'FORGOT_PW_REQUEST';
export const FORGOT_PW_SUCCESS = 'FORGOT_PW_SUCCESS';
export const FORGOT_PW_ERROR = 'FORGOT_PW_ERROR';

export const REG_VERIFYCODE_REQUEST = 'REG_VERIFYCODE_REQUEST';
export const REG_VERIFYCODE_SUCCESS = 'REG_VERIFYCODE_SUCCESS';
export const REG_VERIFYCODE_ERROR = 'REG_VERIFYCODE_ERROR';

export const sendPassword = payload => dispatch => {
  const errors = isValidEmail(payload);
  if (errors && errors.length) {
    return dispatch({
      type: FORGOT_PW_ERROR,
      errors,
    });
  }

  const {email} = payload;
  console.tron.log('password dispatching');
  return dispatch(
    dataForm(
      'customers/forget-password', 
      {email}, 
      [FORGOT_PW_REQUEST, FORGOT_PW_SUCCESS, FORGOT_PW_ERROR]
    ),
  );
};

export const verifyCode = payload => dispatch => {
  if (!isValidCode(payload.code)) {
    return dispatch({
      type: REG_VERIFYCODE_ERROR,
      errors: ['Enter the verification code you received on your device.'],
    });
  }

  const {code} = payload;
  return dispatch(
    dataForm('user/verify/code', {code}, [
      REG_VERIFYCODE_REQUEST,
      REG_VERIFYCODE_SUCCESS,
      REG_VERIFYCODE_ERROR,
    ]),
  );
};
