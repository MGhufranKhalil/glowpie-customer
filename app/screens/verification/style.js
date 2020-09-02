import {
  Platform,
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {color, styles, font, spacing, typography} from '../../theme';
import {SM, XL} from '../../utils/helpers';

const VFLEX_PADDED = {
  ...styles.VFLEX_PADDED,
  justifyContent: 'flex-start',
  backgroundColor: color.screen_bg,
};

const CONTAINER = {
  paddingTop: 20,
  paddingHorizontal: 15,
};

const OTP = {
  marginTop: 30,
  borderTopWidth: 1,
  borderColor: color.gray,
  paddingTop: 30,
  paddingHorizontal: 15,
};

const OTP_CONTAINER = {
  height: SM ? 70 : 90,
};

const OTP_TEXT_FIELD = {
  height: SM ? 48 : 56,
  backgroundColor: color.white,
  borderColor: color.gray,
  borderWidth: 1,
  borderRadius: 6,
  textAlign: 'center',
  fontSize: font.h3,
  fontFamily: typography.semibold,
  color: color.dark,
};

const OTP_HIGHLIGHT = {
  borderColor: color.secondary,
};

export const style = StyleSheet.create({
  VFLEX_PADDED,
  CONTAINER,
  OTP,
  OTP_CONTAINER,
  OTP_TEXT_FIELD,
  OTP_HIGHLIGHT,
});
