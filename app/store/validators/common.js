export const isValidPhone = number => {
  return number && number.length === 10 ? true : false;
};

export const isValidCode = code => {
  return code && code.length === 6 ? true : false;
};
