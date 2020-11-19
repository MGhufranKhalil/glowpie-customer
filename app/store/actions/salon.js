import {dataForm} from '../../utils/helpers'; 

export const GET_SALON_SERVICES_REQUEST = 'GET_SALON_SERVICES_REQUEST';
export const GET_SALON_SERVICES_SUCCESS = 'GET_SALON_SERVICES_SUCCESS';
export const GET_SALON_SERVICES_ERROR = 'GET_SALON_SERVICES_ERROR';
 
export const GET_SALON_DEALS_REQUEST = 'GET_SALON_DEALS_REQUEST';
export const GET_SALON_DEALS_SUCCESS = 'GET_SALON_DEALS_SUCCESS';
export const GET_SALON_DEALS_ERROR = 'GET_SALON_DEALS_ERROR';

export const fetchSalonServices = payload => dispatch => {
  console.tron.log('fetchSalonServices', payload);
  return dispatch(
    dataForm(
      `saloon-services/${payload.id}/?offset=${payload.offset}`,
      {payload},
      [GET_SALON_SERVICES_REQUEST, GET_SALON_SERVICES_SUCCESS, GET_SALON_SERVICES_ERROR],
      'GET',
    ),
  );
};

export const fetchDeals = payload => dispatch => {
  console.tron.log('fetchDeals', payload);
  return dispatch(
    dataForm(
      `saloon-deals/${payload.id}/?offset=${payload.offset}`,
      { payload },
      [GET_SALON_DEALS_REQUEST, GET_SALON_DEALS_SUCCESS, GET_SALON_DEALS_ERROR],
      'GET',
    ),
  );
};
 
 