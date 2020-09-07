import {RSAA} from 'redux-api-middleware';
import Config from 'react-native-config';
import {remove} from '../../utils/storage';
import {
  registrationValidator,
  businessValidator,
  addressValidator,
  serviceValidator,
  generalValidator,
} from '../validators/registration';
import {diags} from '../../utils/debug';
import {dataForm} from '../../utils/helpers';
import {isVendorInfoComplete} from '../../utils/app';

export const REG_ACCOUNT_REQUEST = 'REG_ACCOUNT_REQUEST';
export const REG_ACCOUNT_SUCCESS = 'REG_ACCOUNT_SUCCESS';
export const REG_ACCOUNT_ERROR = 'REG_ACCOUNT_ERROR';

export const REG_GENERAL_REQUEST = 'REG_GENERAL_REQUEST';
export const REG_GENERAL_SUCCESS = 'REG_GENERAL_SUCCESS';
export const REG_GENERAL_ERROR = 'REG_GENERAL_ERROR';

export const REG_BUSINESS_REQUEST = 'REG_BUSINESS_REQUEST';
export const REG_BUSINESS_SUCCESS = 'REG_BUSINESS_SUCCESS';
export const REG_BUSINESS_ERROR = 'REG_BUSINESS_ERROR';

export const REG_ADDRESS_REQUEST = 'REG_ADDRESS_REQUEST';
export const REG_ADDRESS_SUCCESS = 'REG_ADDRESS_SUCCESS';
export const REG_ADDRESS_ERROR = 'REG_ADDRESS_ERROR';

export const REG_HOURS_REQUEST = 'REG_HOURS_REQUEST';
export const REG_HOURS_SUCCESS = 'REG_HOURS_SUCCESS';
export const REG_HOURS_ERROR = 'REG_HOURS_ERROR';

export const REG_SERVICE_REQUEST = 'REG_SERVICE_REQUEST';
export const REG_SERVICE_SUCCESS = 'REG_SERVICE_SUCCESS';
export const REG_SERVICE_ERROR = 'REG_SERVICE_ERROR';

export const REG_POST_VERIFICATION = 'REG_POST_VERIFICATION';

export const verificationComplete = () => ({
  type: REG_POST_VERIFICATION,
});

export const registerAccount = payload => dispatch => {
  const errors = registrationValidator(payload);
  if (errors && errors.length) {
    return dispatch({
      type: REG_ACCOUNT_ERROR,
      errors,
    });
  }

  console.tron.log('registerAccount', payload);
  return dispatch(
    dataForm(
      'customers/new',
      payload,
      [REG_ACCOUNT_REQUEST, REG_ACCOUNT_SUCCESS, REG_ACCOUNT_ERROR],
      'PUT',
    ),
  );
};

export const registerGeneral = payload => dispatch => {
  const errors = generalValidator(payload);
  if (errors && errors.length) {
    return dispatch({
      type: REG_GENERAL_ERROR,
      errors,
    });
  }

  console.tron.log('registerGeneral', payload);
  return dispatch(
    dataForm('customers/info', payload, [
      REG_GENERAL_REQUEST,
      REG_GENERAL_SUCCESS,
      REG_GENERAL_ERROR,
    ]),
  );
};
export const registerBusiness = payload => dispatch => {
  const errors = businessValidator(payload);
  if (errors && errors.length) {
    return dispatch({
      type: REG_BUSINESS_ERROR,
      errors,
    });
  }

  console.tron.log('registerBusiness', payload);
  return dispatch(
    dataForm('vendors/info', payload, [
      REG_BUSINESS_REQUEST,
      REG_BUSINESS_SUCCESS,
      REG_BUSINESS_ERROR,
    ]),
  );
};

export const registerAddress = payload => dispatch => {
  const errors = addressValidator(payload);
  if (errors && errors.length) {
    return dispatch({
      type: REG_ADDRESS_ERROR,
      errors,
    });
  }

  console.tron.log('registerAddress', payload);
  return dispatch(
    dataForm('vendors/address', payload, [
      REG_ADDRESS_REQUEST,
      REG_ADDRESS_SUCCESS,
      REG_ADDRESS_ERROR,
    ]),
  );
};

export const registerHours = payload => dispatch => {
  // create a temporary object that look like vendor info with hours only
  // for validation
  if (isVendorInfoComplete({hours: payload})) {
    return dispatch({
      type: REG_HOURS_ERROR,
      errors: ['Please select at least one day of week for opening'],
    });
  }

  console.tron.log('registerHours', payload);
  return dispatch(
    dataForm('vendors/business-hours', payload, [
      REG_HOURS_REQUEST,
      REG_HOURS_SUCCESS,
      REG_HOURS_ERROR,
    ]),
  );
};

export const registerService = payload => dispatch => {
  const errors = serviceValidator(payload);
  if (errors && errors.length) {
    return dispatch({
      type: REG_SERVICE_ERROR,
      errors,
    });
  }

  console.tron.log('registerService', payload);
  return dispatch(
    dataForm(
      'vendors/business-hours',
      payload,
      [REG_SERVICE_REQUEST, REG_SERVICE_SUCCESS, REG_SERVICE_ERROR],
      'PUT',
    ),
  );
};
