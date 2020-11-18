import {DAY_NAMES} from '../store/constants';

/* decides where user will be sent to home screen after login, or pending registration */
export const isVendorInfoComplete = (info, type = null) => {
  console.tron.log('isCustomerInfoComplete', info);
  let hours = 0;
  // see if any one day is open for business, if yes we are good to go
  /* if (info && info.hours && info.hours.break_hours_start) {
    DAY_NAMES.forEach(d => {
      const key = `${d}_open_time`;
      if (info.hours[key]) {
        hours++;
      }
    });
  } */
  const flags = {
    account: info && info.account && info.account.email ? true : false,
    general: info && info.general && info.general.first_name ? true : false,
    /* business: info && info.business && info.business.business_name ? true : false, */
    /* address: info && info.address && info.address.address_line ? true : false, */
    /* hours: hours > 0 ? true : false, */
    /*  services:
      info && info.services && Object.keys(info.services).length > 0
        ? true
        : false, */
  };
  console.tron.log(flags);
  if (type === null) {
    return (
      flags.account &&
      flags.general /*&&
       flags.address &&
      flags.services &&
      flags.hours */
    );
  }

  return flags[type];
};

export const decideInitialScreen = info => {
  return isVendorInfoComplete(info) ? 'saloon' : 'register';
};

export const minutesToHours = minutes => {
  if (minutes < 60) {
    return `${minutes} Mins`;
  }
  const hours = (Number(minutes) / 60).toFixed(1);
  const hm = `${hours}`.split('.');
  let out = `${hm[0]} Hr`;
  if (hm[1] !== '0') {
    out += ` ${hm[1] * 6} Mins`;
  }

  return out;
};
