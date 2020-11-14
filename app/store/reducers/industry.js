import {
  GET_INDUSTRY_REQUEST,
  GET_INDUSTRY_SUCCESS,
  GET_INDUSTRY_ERROR, 

  GET_INDUSTRY_FILTER_REQUEST,
  GET_INDUSTRY_FILTER_SUCCESS,
  GET_INDUSTRY_FILTER_ERROR, 
} from '../actions/industry';
import {getActionError} from '../../utils/helpers';
import {saveString, remove, clear} from '../../utils/storage';

const initialState = {
  /* loginid: '',
  password: '',
  success: false,
  loading: false,
  token: '', // after auto login, this will be loaded from storage */
  services: {},
  error: '',

};
/* const mapServices = services => {
  let out = {};
  if (services && services.length) {
    services.forEach(s => {
      out[s.vs_id] = s;
    });
  }
  return out;
};  */

const generalError = (state, action) => {
  console.tron.log('general error', action);
  return {
    ...state,
    services: {},
    error: getActionError(
      action,
      'An error occured. Please check your network connection.',
    ),
  };
};

export default (state = initialState, action) => {
  const {success, code, message, data} = action.payload || {};
  switch (action.type) {
    case GET_INDUSTRY_REQUEST:
    case GET_INDUSTRY_FILTER_REQUEST:
      return {
        ...state,
        error: '',
      };
    case GET_INDUSTRY_SUCCESS:
      if (success && code && [200, 201].indexOf(Number(code)) >= 0) {
        console.tron.log('get industories', action.payload);
        const services = action.payload.data;
        return {
          ...state,
          services,
          error: '',
        };
      }
      // console.tron.log('innitial state', initialState);
      // console.tron.log('check error', generalError(state, action));
      return generalError(state, action);
    case GET_INDUSTRY_FILTER_SUCCESS:
      if (success && code && [200, 201].indexOf(Number(code)) >= 0) {
        console.tron.log('get industories with filter', action.payload);
        const services =  action.payload.data ;
        return {
          ...state,
          services,
          error: '',
        };
      }
      return generalError(state, action);
    case GET_INDUSTRY_ERROR:
    case GET_INDUSTRY_FILTER_ERROR:
      return generalError(state, action);
    default:
      return state;
  }
};
