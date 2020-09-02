import {RSAA} from 'redux-api-middleware';

// eslint-disable-next-line no-unused-vars
const credentialsInjector = store => next => action => {
  const callApi = action[RSAA];

  if (callApi) {
    callApi.headers = {
      ...callApi.headers,
    };
    callApi.credentials = 'include';
  }

  return next(action);
};

export default credentialsInjector;
