import {MIN_PASSWORD_LENGTH} from '../constants';
import {validate} from '../../utils/validate';

export const loginValidator = payload => {
  const rules = {
    loginid: {
      email: {
        message: 'Valid Email address required to login',
      },
    },
    password: {
      length: {
        minimum: MIN_PASSWORD_LENGTH,
        message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
      },
    },
  };
  return validate(rules, payload);
};
