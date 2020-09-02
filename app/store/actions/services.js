import {Platform} from 'react-native';
import {RSAA} from 'redux-api-middleware';
import Config from 'react-native-config';
import {diags} from '../../utils/debug';
import {dataForm} from '../../utils/helpers';
import axios from 'axios';

export const SERVICE_DELETE_REQUEST = 'SERVICE_DELETE_REQUEST';
export const SERVICE_DELETE_SUCCESS = 'SERVICE_DELETE_SUCCESS';
export const SERVICE_DELETE_ERROR = 'SERVICE_DELETE_ERROR';

export const SERVICE_UPDATE_REQUEST = 'SERVICE_UPDATE_REQUEST';
export const SERVICE_UPDATE_SUCCESS = 'SERVICE_UPDATE_SUCCESS';
export const SERVICE_UPDATE_ERROR = 'SERVICE_UPDATE_ERROR';

/*export const serviceDeleted = () => ({
  type: REG_POST_VERIFICATION,
});*/

export const deleteService = id => dispatch => {
  console.tron.log('deleteService', id);
  return dispatch(
    dataForm(
      `vendors/services/${id}`,
      {id},
      [SERVICE_DELETE_REQUEST, SERVICE_DELETE_SUCCESS, SERVICE_DELETE_ERROR],
      'DELETE',
    ),
  );
};

export const addService = payload => dispatch => {
  console.tron.log('addService', payload);
  return dispatch(
    dataForm(
      'vendors/services',
      payload,
      [SERVICE_UPDATE_REQUEST, SERVICE_UPDATE_SUCCESS, SERVICE_UPDATE_ERROR],
      'PUT',
    ),
  );
};

export const updateService = (id, payload) => dispatch => {
  console.tron.log('updateService', id, payload);
  return dispatch(
    dataForm(`vendors/services/${id}`, payload, [
      SERVICE_UPDATE_REQUEST,
      SERVICE_UPDATE_SUCCESS,
      SERVICE_UPDATE_ERROR,
    ]),
  );
};

export const UPLOAD_SERVICE_IMAGE_REQUEST = 'UPLOAD_SERVICE_IMAGE_REQUEST';
export const UPLOAD_SERVICE_IMAGE_SUCCESS = 'UPLOAD_SERVICE_IMAGE_SUCCESS';
export const UPLOAD_SERVICE_IMAGE_ERROR = 'UPLOAD_SERVICE_IMAGE_ERROR';

export const uploadServiceImage = payload => (dispatch, getState) => {
  console.tron.log('uploadServiceImage', payload);

  const {id, image, filename, callback} = payload;
  const formData = new FormData();
  formData.append('image', {
    name: filename,
    uri: Platform.OS === 'android' ? image : image.replace('file://', ''),
  });

  /*Object.keys(body).forEach(key => {
      data.append(key, body[key]);
  });*/

  const {token} = getState().login;

  dispatch({
    type: UPLOAD_SERVICE_IMAGE_REQUEST,
  });

  return axios
    .post(`${Config.API_URL}vendors/services/${id}/image`, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: callback,
    })
    .then(response => {
      console.tron.log('service image upload action success');
      dispatch({
        type: UPLOAD_SERVICE_IMAGE_SUCCESS,
        payload: response.data,
        meta: {id},
      });
    })
    .catch(error => {
      console.tron.log('service image upload action error', error.response);
      dispatch({
        type: UPLOAD_SERVICE_IMAGE_ERROR,
        payload: {
          message: 'An error occured while uploading the service image',
        },
        meta: {id},
      });
    });
};
