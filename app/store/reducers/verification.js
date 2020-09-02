import {
  REG_SENDCODE_REQUEST,
  REG_SENDCODE_SUCCESS,
  REG_SENDCODE_ERROR,
  REG_VERIFYCODE_REQUEST,
  REG_VERIFYCODE_SUCCESS,
  REG_VERIFYCODE_ERROR,
} from '../actions/verification';
import {getActionError} from '../../utils/helpers';
import {saveString, remove} from '../../utils/storage';
import moment from 'moment';

const initialState = {
  last_code_sent: null,
  code_verified: false,
  error: '',
};

const numberError = (state, action) => {
  return {
    ...state,
    error: getActionError(
      action,
      'An error occured. Please check your network connection.',
    ),
  };
};

const codeError = (state, action) => {
  return {
    ...state,
    error: getActionError(
      action,
      'An error occured. Please check your network connection.',
    ),
    code_verified: false,
  };
};

export default (state = initialState, action) => {
  const {success, code} = action.payload || {};
  // console.tron.log(action);
  switch (action.type) {
    // ------------------------------------
    /*case REG_SENDCODE_REQUEST:
      return {
        ...state,
        code_verified: false,
      };*/
    case REG_SENDCODE_SUCCESS:
      if (success && code && Number(code) === 200) {
        return {
          ...state,
          error: '',
          last_code_sent: moment(),
        };
      }
      return numberError(state, action);
    case REG_SENDCODE_ERROR:
      return numberError(state, action);
    // ------------------------------------
    case REG_VERIFYCODE_REQUEST:
      return {
        ...state,
        error: '',
        code_verified: false,
      };
    case REG_VERIFYCODE_SUCCESS:
      if (success && code && Number(code) === 200) {
        return {
          error: '',
          code_verified: true,
        };
      }
      return codeError(state, action);
    case REG_VERIFYCODE_ERROR:
      return codeError(state, action);
    default:
      return state;
  }
};
