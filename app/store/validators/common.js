import { validate } from '../../utils/validate';

export const isValidPhone = number => {
  return number && number.length === 10 ? true : false;
};

export const isValidCode = code => {
  return code && code.length === 6 ? true : false;
};


export const isValidEmail = payload => {
  const rules = {
    email: {
      email: {
        message: 'Valid Email address required',
      },
    }
  };
  return validate(rules, payload);
};
