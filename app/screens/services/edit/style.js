import {StyleSheet} from 'react-native';
import {color, styles, font, spacing, typography} from '../../../theme';
import {SM, SW, XL} from '../../../utils/helpers';

const VFLEX = {
  ...styles.VFLEX,
  justifyContent: 'flex-start',
  backgroundColor: color.screen_bg,
};

const SERVICE_FORM = {
  marginBottom: 90,
  marginHorizontal: 15,
};

const SERVICE_IMAGE = {
  width: '100%',
  height: 150,
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: color.primary,
  borderRadius: 4,
  marginBottom: 10,
  overflow: 'hidden',
};

const SERVICE_IMAGE_TEXT = {
  width: '100%',
  textAlign: 'center',
  color: color.white,
  fontSize: font.text - 2,
  fontWeight: 'bold', // using system font here
  marginTop: 10,
};

const REAL_IMAGE = {
  width: SW - 30,
  height: 150,
  resizeMode: 'cover',
};

const PLACEHOLDER_IMAGE = {
  width: SM ? 60 : 70,
  height: SM ? 60 : 70,
  resizeMode: 'contain',
  marginTop: 30,
};

const DOUBLE_SELECT = {
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const DOUBLE_SELECT_LIST = {
  width: (SW - 30) / 2 - 8,
  marginRight: 15,
};

const DOUBLE_SELECT_INPUT = {
  width: (SW - 30) / 2 - 7,
};

export const style = StyleSheet.create({
  VFLEX,
  SERVICE_FORM,
  SERVICE_IMAGE,
  SERVICE_IMAGE_TEXT,
  REAL_IMAGE,
  PLACEHOLDER_IMAGE,
  DOUBLE_SELECT,
  DOUBLE_SELECT_LIST,
  DOUBLE_SELECT_INPUT,
});
