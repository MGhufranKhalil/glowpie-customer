import {
  REG_ACCOUNT_REQUEST,
  REG_ACCOUNT_SUCCESS,
  REG_ACCOUNT_ERROR,
  REG_BUSINESS_REQUEST,
  REG_BUSINESS_SUCCESS,
  REG_BUSINESS_ERROR,
  REG_ADDRESS_REQUEST,
  REG_ADDRESS_SUCCESS,
  REG_ADDRESS_ERROR,
  REG_HOURS_REQUEST,
  REG_HOURS_SUCCESS,
  REG_HOURS_ERROR,
  REG_SERVICE_REQUEST,
  REG_SERVICE_SUCCESS,
  REG_SERVICE_ERROR,
  REG_POST_VERIFICATION,
} from '../actions/registration';
import {getActionError} from '../../utils/helpers';
import {saveString, remove} from '../../utils/storage';

const initialState = {
  registered: false,
  token: '',
  error: '',
  registered_business: false,
  registered_address: false,
  registered_hours: false,
  registered_services: false,
};

const generalError = (state, action) => {
  console.tron.log('general error', action);
  return {
    ...state,
    error: getActionError(
      action,
      'An error occured. Please check your network connection.',
    ),
  };
};

export default (state = initialState, action) => {
  const {success, code} = action.payload || {};
  // console.tron.log(action);
  switch (action.type) {
    case REG_ACCOUNT_REQUEST:
    case REG_BUSINESS_REQUEST:
    case REG_ADDRESS_REQUEST:
    case REG_HOURS_REQUEST:
    case REG_SERVICE_REQUEST:
      return {
        ...state,
        error: '',
      };
    case REG_ACCOUNT_SUCCESS:
      if (success && code && [200, 201].indexOf(Number(code)) >= 0) {
        console.tron.log('registered with token', action.payload.data.token);
        // remember for the first time after signup
        saveString('loginid', action.meta.request.email);
        saveString('password', action.meta.request.password);
        return {
          ...state,
          registered: true,
          token: action.payload.data.token,
          error: '',
        };
      }
      return generalError(state, action);
    case REG_BUSINESS_SUCCESS:
      if (success && code && [200, 201].indexOf(Number(code)) >= 0) {
        console.tron.log('registered business info');
        return {
          ...state,
          registered_business: true,
          error: '',
        };
      }
      return generalError(state, action);
    case REG_ADDRESS_SUCCESS:
      if (success && code && [200, 201].indexOf(Number(code)) >= 0) {
        console.tron.log('registered business address');
        return {
          ...state,
          registered_address: true,
          error: '',
        };
      }
      return generalError(state, action);
    case REG_HOURS_SUCCESS:
      if (success && code && [200, 201].indexOf(Number(code)) >= 0) {
        console.tron.log('registered hours');
        return {
          ...state,
          registered_hours: true,
          error: '',
        };
      }
      return generalError(state, action);
    case REG_SERVICE_SUCCESS:
      if (success && code && [200, 201].indexOf(Number(code)) >= 0) {
        console.tron.log('registered service');
        return {
          ...state,
          registered_services: true,
          error: '',
        };
      }
      return generalError(state, action);
    case REG_ACCOUNT_ERROR:
    case REG_BUSINESS_ERROR:
    case REG_ADDRESS_ERROR:
    case REG_HOURS_ERROR:
      return generalError(state, action);
    case REG_POST_VERIFICATION:
      // destroy registration token once its verified
      if (success && code && Number(code) === 200) {
        return {
          ...state,
          token: '',
        };
      }
      return state;
    default:
      return state;
  }
};
