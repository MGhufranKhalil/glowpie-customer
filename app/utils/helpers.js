import {Platform, Dimensions} from 'react-native';
import Config from 'react-native-config';
import {RSAA} from 'redux-api-middleware';

const majorVersionIOS = parseInt(Platform.Version, 10);
export const isAutoFillSupported =
  Platform.OS === 'ios' && majorVersionIOS >= 12;

export const {height: h, width: w} = Dimensions.get('window');

export const SW = w;
export const SH = h;
// small screen like h SE
export const SM = h < 600;
// very small screen, probably crappy android
export const XSM = h < 560;
// iPhoneX or similar with more height than we anticipate
export const XL = h > 680;

const IP6_WIDTH = 375;
const IP6_HEIGHT = 667;

const scaleByWidth = (size, baseWidth = IP6_WIDTH) =>
  Math.floor((w / baseWidth) * size);
const scaleByHeight = (size, baseHeight = IP6_HEIGHT) =>
  Math.floor((h / baseHeight) * size);

export const scale = size => {
  const phoneRatio = h / w;
  if (phoneRatio > 1.6) {
    return scaleByWidth(size);
  }
  return scaleByHeight(size);
};

export const imageUrl = img => {
  const url = {uri: `${Config.SERVER_URL}${img}`};
  console.tron.log('image source url', url);
  return url;
};

export const dataForm = (url, data, actions, method = 'POST') => {
  const body = Object.keys(data).reduce(
    (val, key) => val + `${key}=${encodeURIComponent(data[key])}&`,
    '',
  );
  // console.tron.log(body);
  return {
    [RSAA]: {
      endpoint: `${Config.API_URL}${url}`,
      method,
      body: method === 'GET' ? null : body,
      headers:
        method === 'GET'
          ? {}
          : {'Content-Type': 'application/x-www-form-urlencoded'},
      types: [
        actions[0],
        {
          type: actions[1],
          meta: {request: data},
        },
        actions[2],
      ],
    },
  };
};

// get error message from api, or the default provided
export const getActionError = (action, defError) => {
  console.tron.log('getActionError', action);
  if (action.payload && action.payload.message) {
    if (action.payload.message.length) {
      // array of errors
      if (Array.isArray(action.payload.message)) {
        return action.payload.message.map(val => val.error).join('\n');
      }
      // simple error message within reponse
      return action.payload.message;
    }
    // individual field validation error
    if (action.payload.message.error) {
      return action.payload.message.error;
    }
  }

  // internal validation errors mainly
  if (action.errors && action.errors.length) {
    return action.errors[0];
  }

  return defError;
};

export const sanitizeNumber = phone => phone.replace(/[\(\)\s-]/g, '');

export const capitalizeFirstLetter = str => {
  if (!str) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const arrayToSelect = values => {
  // console.tron.log("arrayToSelect", values, Object.entries(values));
  return Object.entries(values).map(k => {
    return {
      value: `${k[0]}`,
      label: `${k[1]}`,
    };
  });
};

export const formatTime = time => {
  if (!time || time.length === 0) {
    return '';
  }
  const t = time.split(':');
  let hours = Number(t[0]);
  let minutes = Number(t[1]);
  let m = 'AM';
  if (hours > 12) {
    m = 'PM';
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  } else if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes} ${m}`;
};
