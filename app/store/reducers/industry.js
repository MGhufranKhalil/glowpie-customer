import {
  GET_INDUSTRY_REQUEST,
  GET_INDUSTRY_SUCCESS,
  GET_INDUSTRY_ERROR, 
} from '../actions/industry';
import {getActionError} from '../../utils/helpers';
import {saveString, remove, clear} from '../../utils/storage';

const initialState = {
  /* loginid: '',
  password: '',
  error: '',
  success: false,
  loading: false,
  token: '', // after auto login, this will be loaded from storage */
  services: {},
};
const mapServices = services => {
  let out = {};
  if (services && services.length) {
    services.forEach(s => {
      out[s.vs_id] = s;
    });
  }
  return out;
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
  const {success, code, message, data} = action.payload || {};
  switch (action.type) {
    case GET_INDUSTRY_REQUEST:
      return {
        ...state,
        error: '',
      };
    case GET_INDUSTRY_SUCCESS:
      if (success && code && [200, 201].indexOf(Number(code)) >= 0) {
        console.tron.log('get industories', action.payload);
        const services = mapServices(action.payload.data);
        return {
          ...state,
          services,
          error: '',
        };
      }
      return generalError(state, action);
    case GET_INDUSTRY_ERROR:
      return generalError(state, action);
    default:
      return state;
  }
};
