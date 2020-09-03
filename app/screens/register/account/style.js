import {
  Platform,
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {color, styles, font, spacing, typography} from '../../../theme';
import {SM, XL,SW} from '../../../utils/helpers';

const VFLEX_PADDED = {
  ...styles.VFLEX_PADDED,
  justifyContent: 'flex-end',
  paddingBottom: 0,
};

const CONTAINER = {
  paddingTop: 20,
  paddingHorizontal: 15,
};

const ACCEPT_SWITCH = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
};

const SWITCH = {
  flexDirection: 'row',
  alignItems: 'center',
};

const SWITCH_TEXT = {
  fontSize: font.text + 2,
};

const TERMS_LINK = {
  paddingLeft: 5,
  fontSize: font.text + 2,
  fontFamily: typography.semibold,
};

 
const WELCOME_IMAGE = {
  position: 'absolute',
  resizeMode: 'cover',
  height: XL || SM ? '70%' : '65%',
  top: 0,
  left: 0,
  marginLeft: SW > 400 ? 0 : SM ? -230 : -180,
};
const SIGNUP_BUTTON_TEXT = {color: '#FF62B0', fontWeight: '900'};

const LOGO = {
  width: SM ? 70 : 100,
  height: SM ? 70 : 100,
  marginLeft: 16,
};
const PERSONAL = {
  fontSize: SM ? font.h1 * 1.2 : font.h1 * 1,
  fontFamily: typography.bold,
  paddingTop: 5,
  paddingBottom: 5,
};


export const style = StyleSheet.create({
  VFLEX_PADDED,
  CONTAINER,
  ACCEPT_SWITCH,
  SWITCH,
  SWITCH_TEXT,
  TERMS_LINK,
  WELCOME_IMAGE, 
  SIGNUP_BUTTON_TEXT,
  LOGO,
  PERSONAL
});
