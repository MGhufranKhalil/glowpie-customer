import {MIN_PASSWORD_LENGTH} from '../constants';
import {validate} from '../../utils/validate';

export const registrationValidator = payload => {
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
    email: {
      email: {
        message: 'Require a valid Email address to signup',
      },
    },
    password: {
      length: {
        minimum: MIN_PASSWORD_LENGTH,
        message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
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
