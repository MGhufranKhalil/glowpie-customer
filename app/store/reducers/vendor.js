import {USER_LOGIN_SUCCESS} from '../actions/login';
import {
  REG_ACCOUNT_SUCCESS,
  REG_BUSINESS_SUCCESS,
  REG_BUSINESS_ERROR,
  REG_ADDRESS_SUCCESS,
  REG_ADDRESS_ERROR,
  REG_HOURS_SUCCESS,
  REG_HOURS_ERROR,
  REG_SERVICE_SUCCESS,
} from '../actions/registration';
import {UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_ERROR} from '../actions/vendor';
import {
  UPLOAD_SERVICE_IMAGE_SUCCESS,
  UPLOAD_SERVICE_IMAGE_ERROR,
} from '../actions/services';
import {
  SERVICE_DELETE_SUCCESS,
  SERVICE_DELETE_ERROR,
  SERVICE_UPDATE_SUCCESS,
  SERVICE_UPDATE_ERROR,
} from '../actions/services';
import {getActionError} from '../../utils/helpers';
import {saveString, remove} from '../../utils/storage';

 const mapServices = services => {
  let out = {};
  if (services && services.length) {
    services.forEach(s => {
      out[s.vs_id] = s;
    });
  }

  return out;
}; 

const initialState = {
  account: {
    email: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    image: '',
  },
  general: {
    first_name: '',
    last_name: '',
    date_of_birth: '',
    mm: '',
    dd: '',
    yyyy: '',
    gender: '',
    image: '',
  },
  business: {
    /* business_name: '',
    business_number: '',
    company_number: '',
    australian_business_number: '',
    no_of_seats: '', */
  },
  address: {
    /* address_line1: '',
    address_line2: '',
    city: '',
    postal_code: '',
    latitude: 0,
    longitude: 0, */
  },
  services: {},
  hours: {
    /* time_zone: '',
    monday_open_time: '',
    monday_close_time: '',
    tuesday_open_time: '',
    tuesday_close_time: '',
    wednesday_open_time: '',
    wednesday_close_time: '',
    thursday_open_time: '',
    thursday_close_time: '',
    friday_open_time: '',
    friday_close_time: '',
    saturday_open_time: '',
    saturday_close_time: '',
    sunday_open_time: '',
    sunday_close_time: '',
    break_hours_start: '',
    break_hours_close: '', */
  },
  error: '',
  lastUpdatedServiceId: null,
};

const generalError = (state, action) => {
  return {
    ...state,
    error: getActionError(
      action,
      'An error occured. Please check your network connection.',
    ),
  };
};

export default (state = initialState, action) => {
  const {success, code, data} = action.payload || {};
  switch (action.type) {
    case REG_ACCOUNT_SUCCESS:
      if (success && code && [200, 201].indexOf(Number(code)) >= 0) {
        const {email, first_name, last_name} = action.meta.request;
        return {
          ...state,
          account: {
            email,
            first_name,
            last_name,
            image: '',
          },
          error: '',
        };
      }
      return state;
    case USER_LOGIN_SUCCESS:
      if (success && code && Number(code) === 200 && data.token) {
        const {email, first_name, last_name, image} = data;
        const services = mapServices(data.vendor_services);
       
        return {
          ...state,
          account: {
            email,
            first_name,
            last_name,
            image: image || '',
          },
          general: {
            ...state.general,
            ...data.general,
          },
          business: {
            ...state.business,
            ...data.business_details,
          },
          address: {
            ...state.address,
            ...data.vendor_address,
          },
          services,
          hours: {
            ...state.hours,
            ...data.vendor_business_hours,
          },
          error: '',
        };
      }
      return state;
    case REG_BUSINESS_SUCCESS:
      if (success && code && [200, 201].indexOf(Number(code)) >= 0) {
        return {
          ...state,
          business: {
            ...action.meta.request,
          },
          error: '',
        };
      }
      return generalError(state, action);
    case REG_ADDRESS_SUCCESS:
      if (success && code && [200, 201].indexOf(Number(code)) >= 0) {
        return {
          ...state,
          address: {
            ...action.meta.request,
          },
          error: '',
        };
      }
      return generalError(state, action);
    case REG_HOURS_SUCCESS:
      if (success && code && [200, 201].indexOf(Number(code)) >= 0) {
        console.tron.log('hours updated', action.payload, action.meta);
        return {
          ...state,
          hours: {
            ...action.meta.request,
          },
          error: '',
        };
      }
      return generalError(state, action);
    case REG_BUSINESS_ERROR:
    case REG_ADDRESS_ERROR:
    case REG_HOURS_ERROR:
      console.tron.log('update error in business/address/hours', action);
      return {
        ...state,
        error: getActionError(action),
      };
    case REG_SERVICE_SUCCESS:
      if (success && code && [200, 201].indexOf(Number(code)) >= 0) {
        const {vs_id} = action.payload.data;
        return {
          ...state,
          services: {
            ...state.services,
            [vs_id]: {
              ...action.meta.request,
            },
          },
          error: '',
        };
      }
      return generalError(state, action);
    case SERVICE_DELETE_SUCCESS:
      if (success && code && [200, 201].indexOf(Number(code)) >= 0) {
        const key = action.meta.request.id;
        const {[key]: value, ...newServices} = state.services;
        return {
          ...state,
          services: {
            ...newServices,
          },
          error: '',
        };
      }
      return generalError(state, action);
    case SERVICE_DELETE_ERROR:
      console.tron.log('service delete error', action);
      return {
        ...state,
        error: getActionError(action),
      };
    case SERVICE_UPDATE_SUCCESS:
      if (success && code && [200, 201].indexOf(Number(code)) >= 0) {
        const {vs_id} = data;
        const newServices = {...state.services};
        newServices[vs_id] = {...data};
        return {
          ...state,
          services: {
            ...newServices,
          },
          lastUpdatedServiceId: vs_id,
          error: '',
        };
      }
      return generalError(state, action);
    case SERVICE_UPDATE_ERROR:
      console.tron.log('service update error', action);
      return {
        ...state,
        error: getActionError(action),
      };
    case UPLOAD_IMAGE_SUCCESS:
      if (success && code && [200, 201].indexOf(Number(code)) >= 0) {
        console.tron.log('upload success', action);
        return {
          ...state,
          account: {
            ...state.account,
            image: action.payload.data.image || '',
          },
          error: '',
        };
      }
      console.tron.log('upload success but error', action);
      return generalError(state, action);
    case UPLOAD_IMAGE_ERROR:
      console.tron.log('upload error', action);
      return {
        ...state,
        account: {
          ...state.account,
        },
        error: getActionError(action),
      };
    case UPLOAD_SERVICE_IMAGE_SUCCESS:
      if (success && code && [200, 201].indexOf(Number(code)) >= 0) {
        const {id} = action.meta;
        const newServices = {...state.services};
        let service = {
          ...newServices[id],
        };
        service.image = data.image;
        newServices[id] = {
          ...service,
        };
        return {
          ...state,
          services: {
            ...newServices,
          },
          lastUpdatedServiceId: id,
          error: '',
        };
      }
      console.tron.log('service image upload success but error', action);
      return generalError(state, action);
    case UPLOAD_SERVICE_IMAGE_ERROR:
      console.tron.log('service image upload error', action);
      return {
        ...state,
        error: getActionError(action),
      };
    default:
      return state;
  }
};
