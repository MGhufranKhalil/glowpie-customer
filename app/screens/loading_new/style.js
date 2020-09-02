import {StyleSheet} from 'react-native';
import {color, styles, font, spacing, typography} from '../../theme';
import {SM, SW, SH, XL, scale} from '../../utils/helpers';

const VFLEX_PADDED = {
  ...styles.VFLEX_PADDED,
  justifyContent: 'flex-end',
  paddingBottom: 0,
};

const CONTAINER = {
  paddingHorizontal: 20,

  
};

const WELCOME_IMAGE = {
  position: 'absolute',
  resizeMode: 'cover',
  height: XL || SM ? '70%' : '65%',
  top: 0,
  left: 0,
  marginLeft: SW > 400 ? 0 : SM ? -230 : -180,

  
};

const GRADIENT = {
  position: 'absolute',
  resizeMode: 'cover',
  height: 194,
  bottom: '40%',
};

const LOGO = {
  width: SM ? 70 : 100,
  height: SM ? 70 : 100,
  marginLeft: 16,
};

const TEXT_HEADER = {
  ...styles.CONTENT,
  fontSize: SM ? font.h1 * 1.8 : font.h1,
  fontFamily: typography.regular,
  color: color.white,
};

const TEXT = {
  ...styles.CONTENT,
  fontSize: SM ? font.h1 * 1.2 : font.h1 * 1.3 + 3,
  color: color.black,
};

const TEXT_BOLD = {
  ...TEXT,
  fontFamily: typography.bold,
};

const MESSAGE = {
  ...styles.CONTENT,
  marginTop: 10,
  marginBottom: SM ? 120 : 140,
  fontSize: font.text + (SM ? 2 : 3),
};

const SEP = {
  width: 10,
};
const SKIP_BUTTON = {
  position: 'absolute',
  top: 20,
  right: 10,
  justifyContent: 'center',
  borderRadius: 30,
  paddingVertical: 10,
  fontFamily: typography.bold,
};
export const style = StyleSheet.create({
  VFLEX_PADDED,
  CONTAINER,
  WELCOME_IMAGE,
  GRADIENT,
  LOGO,
  TEXT_HEADER,
  TEXT,
  TEXT_BOLD,
  MESSAGE,
  SEP,SKIP_BUTTON
});
