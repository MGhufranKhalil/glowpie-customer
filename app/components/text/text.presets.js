import {font, color} from '../../theme';

const BASE = {
  textAlign: 'left',
  color: color.dark,
};

export const presets = {
  default: {
    ...BASE,
    fontSize: font.text,
  },
  h1: {
    ...BASE,
    fontSize: font.h1,
    
  },
  h2: {
    ...BASE,
    fontSize: font.h2,
    
  },
  h3: {
    ...BASE,
    fontSize: font.h3,
  },
  message: {
    ...BASE,
    fontSize: font.message,
		marginBottom: 16
  },
};
