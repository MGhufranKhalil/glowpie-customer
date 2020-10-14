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

export const isValidPassword = payload => {
  const rules = { 
    password: {
      format: {
        pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$",
        message: "Password must contain a capital, lowercase, and number with 8 characters"
      },
    },
    new_password: {
      format: {
        pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$",
        message: "Password must contain a capital, lowercase, and number with 8 characters"
      },
    },
  };
  return validate(rules, payload);
};