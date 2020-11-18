export const MIN_PASSWORD_LENGTH = 8;
export const TIMER = 60;
export const OFFSET_LIMIT = 5;


export const genderOptions = ['Male', 'Female'];

export const SERVICE_TYPES = {
  '1': 'Hair Cutting',
  '2': 'Beauty',
  '3': 'Spa',
  '4': 'Massage',
  '5': 'Nail Art',
  '6': 'Others',
};

export const DURATIONS = {
  '30': '0.5 Hr',
  '60': '1 Hr',
  '90': '1 Hr 30 Mins',
  '120': '2 Hr',
  '150': '2 Hr 30 Mins',
  '180': '3 Hr',
  '210': '3 Hr 30 Mins',
  '240': '4 Hr',
  '270': '4 Hr 30 Mins',
  '300': '5 Hr',
  '330': '5 Hr 30 Mins',
  '360': '6 Hr',
  '390': '6 Hr 30 Mins',
};

const generateTimings = () => {
  const x = 5; //minutes interval
  const times = []; // time array
  let tt = 0; // start time
  const ap = ['AM', 'PM']; // AM-PM

  //loop to increment the time and push results in array
  for (var i = 0; tt < 24 * 60; i++) {
    const hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
    const mm = tt % 60; // getting minutes of the hour in 0-55 format
    const label =
      ('0' + (hh % 12)).slice(-2) +
      ':' +
      ('0' + mm).slice(-2) +
      ' ' +
      ap[Math.floor(hh / 12)];
    const val = ('0' + hh).slice(-2) + ':' + ('0' + mm).slice(-2) + ':00';
    times[i] = {
      label: label,
      value: val,
    };
    tt = tt + x;
  }
  return times;
};

export const BUSINESS_TIMINGS = generateTimings();

export const CURRENCIES = {
  AUD: 'AUD',
  USD: 'USD',
};

export const DAY_NAMES = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export const DAY_NAMES_SHORT = [
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
  'SUN',
];
export const twoDigits = n => {
  /*  n = setInterval(
      (n) => { n - 1},
     1000
   );
   console.log(n); */
  return n > 9 ? "" + n : "0" + n;
}

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const offsetLimitIncrease = limit => {
  return Number.parseInt(OFFSET_LIMIT + limit);
}
export const offsetDecrease = offset => {
  return Number.parseInt(OFFSET_LIMIT - limit);
}

