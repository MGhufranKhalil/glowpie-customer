import {
  GET_SALON_SERVICES_REQUEST,
  GET_SALON_SERVICES_SUCCESS,
  GET_SALON_SERVICES_ERROR, 

  GET_SALON_DEALS_REQUEST,
  GET_SALON_DEALS_SUCCESS,
  GET_SALON_DEALS_ERROR, 
} from '../actions/salon';
import {getActionError} from '../../utils/helpers'; 
const initialState = {
   
  salonServices: {},
  salonDeals: {},
  error: '',

};
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
    case GET_SALON_SERVICES_REQUEST:
    case GET_SALON_DEALS_REQUEST: 
      return {
        ...state,
        error: '',
      };
    case GET_SALON_SERVICES_SUCCESS:
      if (success && code && [200, 201].indexOf(Number(code)) >= 0) {
        const salonServices = action.payload.data;
        console.tron.log('salonServices', salonServices);
        return {
          ...state,
          salonServices,
          error: '',
        };
      }
      return generalError(state, action);
    case GET_SALON_DEALS_SUCCESS:
      if (success && code && [200, 201].indexOf(Number(code)) >= 0) {
        const salonServices = action.payload.data;
        console.tron.log('salonServices', salonServices);
        return {
          ...state,
          salonServices,
          error: '',
        };
      }
      return generalError(state, action);
    case GET_SALON_SERVICES_ERROR:
    case GET_SALON_DEALS_ERROR: 
      return generalError(state, action);
    default:
      return state;
  }
};
