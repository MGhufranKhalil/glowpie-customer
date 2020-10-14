import {
  FORGOT_PW_SUCCESS,
  FORGOT_PW_REQUEST,
  FORGOT_PW_ERROR, 
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_ERROR 
} from '../actions/forgotpassword';
import {getActionError} from '../../utils/helpers';
 
const initialState = {
  email: '',
  password_sent: false, 
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
    password_sent: false,
  };
};

export default (state = initialState, action) => {
  const { success, code } = action.payload || {};
  switch (action.type) {
    case FORGOT_PW_REQUEST:
    case NEW_PASSWORD_REQUEST:
      return {
        ...state,
        error: '',
      };
    case FORGOT_PW_SUCCESS:
      if (success && code && [200, 201].indexOf(Number(code)) >= 0) {
        state.password_sent = true;
        console.tron.log('password sent with payload', state);
        return {
          ...state,
          error: '',
          password_sent:true,
        };
      }
      return codeError(state, action);
    case FORGOT_PW_ERROR:
      return codeError(state, action);
    case NEW_PASSWORD_SUCCESS:
      if (success && code && [200, 201].indexOf(Number(code)) >= 0) {
        state.password_sent = true;
        console.tron.log('password sent with payload', state);
        return {
          ...state,
          error: '',
          password_sent: true,
        };
      }
      return codeError(state, action);
    case NEW_PASSWORD_ERROR:
      return codeError(state, action);
    default:
      return state;
  }
};
