import {Platform} from 'react-native';
import {RSAA} from 'redux-api-middleware';
import Config from 'react-native-config';
import {diags} from '../../utils/debug';
import {dataForm} from '../../utils/helpers';
import axios from 'axios';

export const GET_INDUSTRY_REQUEST = 'GET_INDUSTRY_REQUEST';
export const GET_INDUSTRY_SUCCESS = 'GET_INDUSTRY_SUCCESS';
export const GET_INDUSTRY_ERROR = 'GET_INDUSTRY_ERROR';

export const GET_INDUSTRY_FILTER_REQUEST = 'GET_INDUSTRY_FILTER_REQUEST';
export const GET_INDUSTRY_FILTER_SUCCESS = 'GET_INDUSTRY_FILTER_SUCCESS';
export const GET_INDUSTRY_FILTER_ERROR = 'GET_INDUSTRY_FILTER_ERROR';

export const fetchIndustry = payload => dispatch => {
  console.tron.log('fetchIndustry', payload);
  return dispatch(
    dataForm(
      `saloon/${payload.id}/?offset=${payload.offset}&limit=${payload.limit}`,
      {payload},
      [GET_INDUSTRY_REQUEST, GET_INDUSTRY_SUCCESS, GET_INDUSTRY_ERROR],
      'GET',
    ),
  );
};

export const fetchIndustryWithFilter = payload => dispatch => {
  console.tron.log('fetchIndustryWithFilter', payload);
  return dispatch(
    dataForm(
      `saloon/${payload.id}/?order=${payload.order}&order_by=${payload.order_by}&offset=${payload.offset}&limit=${payload.limit}`,
      { payload },
      [GET_INDUSTRY_FILTER_REQUEST, GET_INDUSTRY_FILTER_SUCCESS, GET_INDUSTRY_FILTER_ERROR],
      'GET',
    ),
  );
};
 