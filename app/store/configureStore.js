import {createStore, applyMiddleware, compose} from 'redux';
import {apiMiddleware} from 'redux-api-middleware';
import thunk from 'redux-thunk';

import rootReducer from './reducers/root';
import credentialsInjector from './credentialsInjector';
import tokenInjector from './tokenInjector';
import tron from '../utils/console';
// import validationMiddleware from './middleware/validation';

export default () => {
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(
        // validationMiddleware,
        credentialsInjector,
        tokenInjector,
        apiMiddleware,
        thunk,
      ),
      tron.createEnhancer(),
    ),
  );
};
