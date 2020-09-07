import {RSAA} from 'redux-api-middleware';
import Config from 'react-native-config';
import {remove} from '../../utils/storage';
import {diags} from '../../utils/debug';
import {dataForm} from '../../utils/helpers';
import {isValidPhone, isValidCode} from '../validators/common';

export const REG_SENDCODE_REQUEST = 'REG_SENDCODE_REQUEST';
export const REG_SENDCODE_SUCCESS = 'REG_SENDCODE_SUCCESS';
export const REG_SENDCODE_ERROR = 'REG_SENDCODE_ERROR';

export const REG_VERIFYCODE_REQUEST = 'REG_VERIFYCODE_REQUEST';
export const REG_VERIFYCODE_SUCCESS = 'REG_VERIFYCODE_SUCCESS';
export const REG_VERIFYCODE_ERROR = 'REG_VERIFYCODE_ERROR';

export const sendCode = payload => dispatch => {
  console.tron.log('send code', payload);
  // if (!isValidPhone(payload.number)) {
  //   console.tron.log('not valid');
  //   return dispatch({
  //     type: REG_SENDCODE_ERROR,
  //     errors: ['Enter correct phone number to contine.'],
  //   });
  // }

  // const {number} = payload;
  console.tron.log('send code dispatching');
  return dispatch(
    dataForm('user/verify', {}, [
      REG_SENDCODE_REQUEST,
      REG_SENDCODE_SUCCESS,
      REG_SENDCODE_ERROR,
    ]),
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
