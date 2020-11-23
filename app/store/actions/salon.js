import {dataForm} from '../../utils/helpers'; 

export const GET_SALON_SERVICES_REQUEST = 'GET_SALON_SERVICES_REQUEST';
export const GET_SALON_SERVICES_SUCCESS = 'GET_SALON_SERVICES_SUCCESS';
export const GET_SALON_SERVICES_ERROR   = 'GET_SALON_SERVICES_ERROR';
 
export const GET_SALON_DEALS_REQUEST = 'GET_SALON_DEALS_REQUEST';
export const GET_SALON_DEALS_SUCCESS = 'GET_SALON_DEALS_SUCCESS';
export const GET_SALON_DEALS_ERROR   = 'GET_SALON_DEALS_ERROR';


export const GET_SALON_REVIEWS_REQUEST = 'GET_SALON_REVIEWS_REQUEST';
export const GET_SALON_REVIEWS_SUCCESS = 'GET_SALON_REVIEWS_SUCCESS';
export const GET_SALON_REVIEWS_ERROR   = 'GET_SALON_REVIEWS_ERROR';


export const GET_SALON_DEALS_DETAIL_REQUEST = 'GET_SALON_DEALS_DETAIL_REQUEST';
export const GET_SALON_DEALS_DETAIL_SUCCESS = 'GET_SALON_DEALS_DETAIL_SUCCESS';
export const GET_SALON_DEALS_DETAIL_ERROR   = 'GET_SALON_DEALS_DETAIL_ERROR';

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

export const fetchReview = payload => dispatch => {
  console.tron.log('fetchReview', payload);
  return dispatch(
    dataForm(
      `saloon-reviews/${payload.id}/?offset=${payload.offset}`,
      { payload },
      [GET_SALON_REVIEWS_REQUEST, GET_SALON_REVIEWS_SUCCESS, GET_SALON_REVIEWS_ERROR],
      'GET',
    ),
  );
};


export const fetchDealDetails = payload => dispatch => {
  console.tron.log('fetch Single Deal', payload);
  return dispatch(
    dataForm(
      `vendors/deal/${payload.deal_id}`,
      { payload },
      [GET_SALON_DEALS_DETAIL_REQUEST, GET_SALON_DEALS_DETAIL_SUCCESS, GET_SALON_DEALS_DETAIL_ERROR],
      'GET',
    ),
  );
};