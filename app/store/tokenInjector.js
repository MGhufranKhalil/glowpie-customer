import {RSAA} from 'redux-api-middleware';

const tokenInjector = store => next => action => {
  const callApi = action[RSAA];

  if (callApi) {
    callApi.headers = {
      ...callApi.headers,
    };

    let {token} = store.getState().login;
    if (token) {
      callApi.headers.Authorization = `Bearer ${token}`;
      console.tron.log('token injected from login', token);
    } else {
      // fallback to registration token if available during registration phase
      token = store.getState().registration.token;
      if (token) {
        callApi.headers.Authorization = `Bearer ${token}`;
        console.tron.log('token injected from registration', token);
      }
    }

    // console.tron.log(callApi);
  }

  return next(action);
};

export default tokenInjector;
