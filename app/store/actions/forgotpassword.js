import {dataForm} from '../../utils/helpers';
import { isValidEmail, isValidPassword} from '../validators/common';

export const FORGOT_PW_REQUEST = 'FORGOT_PW_REQUEST';
export const FORGOT_PW_SUCCESS = 'FORGOT_PW_SUCCESS';
export const FORGOT_PW_ERROR = 'FORGOT_PW_ERROR';

export const NEW_PASSWORD_REQUEST = 'NEW_PASSWORD_REQUEST';
export const NEW_PASSWORD_SUCCESS = 'NEW_PASSWORD_SUCCESS';
export const NEW_PASSWORD_ERROR = 'NEW_PASSWORD_ERROR';

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

export const sendNewPassword = payload => dispatch => {
  const errors = isValidPassword(payload);
  if (errors && errors.length) {
    return dispatch({
      type: FORGOT_PW_ERROR,
      errors,
    });
  }

  return dispatch(
    dataForm('change-password/customer',  payload , [
      NEW_PASSWORD_REQUEST,
      NEW_PASSWORD_SUCCESS,
      NEW_PASSWORD_ERROR,
    ]),
  );
};
