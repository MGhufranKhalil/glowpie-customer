import {MIN_PASSWORD_LENGTH} from '../constants';
import {validate} from '../../utils/validate';

export const registrationValidator = payload => {
  const rules = {
    // first_name: {
    //   length: {
    //     minimum: 1,
    //     message: 'First Name required',
    //   },
    // },
    // last_name: {
    //   length: {
    //     minimum: 1,
    //     message: 'Last Name required',
    //   },
    // },
    email: {
      email: {
        message: 'Require a valid Email address to signup',
      },
    },
    password: {
      format: {
        pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$",
        message: "Password must contain a capital, lowercase, and number with 8 characters"
      },
    },
    confirmPassword: {
      equality: {
        attribute: 'password',
        message: 'Confirm password is not equal to password',
        comparator: function(v1, v2) {
          return JSON.stringify(v1) === JSON.stringify(v2);
        },
      },
    },
    agree: {
      equality: {
        attribute: 'agree',
        message: 'Please confirm that you agree to the terms and conditions',
        comparator: function(v1, v2) {
          return v1 === true;
        },
      },
    },
  };
  return validate(rules, payload);
};

export const generalValidator = payload => {
  const rules = {
    first_name: {
      length: {
        minimum: 1,
        message: 'First Name required',
      },
    },
    last_name: {
      length: {
        minimum: 1,
        message: 'Last Name required',
      },
    },
    date_of_birth: {
      // date: {
      //   dateOnly: true,
      //   message: 'Please enter valid date',
      // },
      length: {
        minimum: 2,
        message: 'Please enter valid date of birth',
      },
    },
    gender: {
      equality: {
        attribute: 'gender',
        message: 'Please enter valid gender',
        comparator: function(v1, v2) {
          if (v1 === 'male') {
            return true;
          } else if (v1 === 'female') {
            return true;
          } else {
            return false;
          }
        },
      },
    },
  };
  return validate(rules, payload);
};

export const businessValidator = payload => {
  const rules = {
    business_name: {
      length: {
        minimum: 2,
        message: 'Business Name is required',
      },
    },
    business_number: {
      length: {
        minimum: 10,
        message: 'Business contact number is required',
      },
    },
    australian_business_number: {
      length: {
        minimum: 11,
        message: 'Business Number is required',
      },
    },
    company_number: {
      length: {
        minimum: 11,
        message: 'Company Number is required',
      },
    },
    no_of_seats: {
      numericality: {
        onlyInteger: true,
        greaterThan: 0,
        lessThanOrEqualTo: 20,
        message: 'Please select number of service stations',
      },
    },
  };
  return validate(rules, payload);
};

export const addressValidator = payload => {
  const rules = {
    address_line1: {
      length: {
        minimum: 1,
        message: 'Street Address is required',
      },
    },
    address_line2: {
      length: {
        minimum: 1,
        message: 'Shop Address is required',
      },
    },
    city: {
      length: {
        minimum: 2,
        message: 'City Name must be provided',
      },
    },
    postal_code: {
      length: {
        minimum: 2,
        message: 'Postal Code is required',
      },
    },
  };
  return validate(rules, payload);
};
