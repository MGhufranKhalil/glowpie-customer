import {Platform} from 'react-native';
import {RSAA} from 'redux-api-middleware';
import Config from 'react-native-config';
import {diags} from '../../utils/debug';
import {dataForm} from '../../utils/helpers';
import axios from 'axios';

export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_ERROR = 'UPLOAD_IMAGE_ERROR';

export const uploadVendorImage = payload => (dispatch, getState) => {
  console.tron.log('uploadVendorImage', payload);

  const {image, filename, callback} = payload;
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
    type: UPLOAD_IMAGE_REQUEST,
  });

  return axios
    .post(`${Config.API_URL}vendors/image`, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: callback,
    })
    .then(response => {
      dispatch({
        type: UPLOAD_IMAGE_SUCCESS,
        payload: response.data,
      });
    })
    .catch(error => {
      console.tron.log(error);
      dispatch({
        type: UPLOAD_IMAGE_ERROR,
        payload: {message: 'An error occured while uploading the image'},
      });
    });
};
