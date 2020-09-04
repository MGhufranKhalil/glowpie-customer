import {
  Platform,
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {color, styles, font, spacing, typography} from '../../theme';
import {SM, XL, SW} from '../../utils/helpers';

const VFLEX_PADDED = {
  ...styles.VFLEX_PADDED,
  justifyContent: 'flex-end',
  paddingBottom: 0,
};

const CONTAINER = {
  paddingTop: 20,
  paddingHorizontal: 15,
};

const OTP = {
  marginTop: 30,
  // borderTopWidth: 1,
  // borderColor: color.gray,
  // paddingTop: 30,
  paddingHorizontal: 15,
};

const OTP_CONTAINER = {
  height: SM ? 70 : 140,
};

const OTP_TEXT_FIELD = {
  height: SM ? 48 : 50,
  width: SM ? 48 : 40,
  backgroundColor: color.white,
  borderColor: color.gray,
  borderWidth: 1,
  borderRadius: 6,
  textAlign: 'center',
  fontSize: font.h3,
  fontFamily: typography.bold,
  color: color.dark,
  paddingLeft:10,
  fontWeight:'900',
};

const OTP_HIGHLIGHT = {
  borderColor: color.secondary,
};
const WELCOME_IMAGE = {
  position: 'absolute',
  resizeMode: 'cover',
  height: XL || SM ? '70%' : '65%',
  top: 0,
  left: 0,
  marginLeft: SW > 400 ? 0 : SM ? -230 : -180,
};
const ACCEPT_SWITCH = {
  flexDirection: 'row',
  // justifyContent: 'space-between',
  // alignItems: 'center',
  width: '100%',
  paddingTop: 10,
  paddingBottom: 10,
};

const SWITCH = {
  flexDirection: 'row',
  alignItems: 'center',
};

const SWITCH_TEXT = {
  fontSize: font.text,
  color:color.darkgray,
  fontFamily:typography.regular
};
const RESEND_BUTTON = {
  top: 0,
  right: 10,
  justifyContent: 'center',
  borderRadius: 30,
  paddingVertical: 10,
  paddingHorizontal:25,
  marginLeft: 10,
  backgroundColor: '#ffbadc',
  color: color.secondary,
}
const RESEND_BUTTON_TEXT = {
  fontSize: 12, 
  fontFamily: typography.regular
}

const TERMS_LINK = {
  paddingLeft: 5,
  fontSize: font.text + 2,
  fontFamily: typography.semibold,
};
export const style = StyleSheet.create({
  VFLEX_PADDED,
  CONTAINER,
  OTP,
  OTP_CONTAINER,
  OTP_TEXT_FIELD,
  OTP_HIGHLIGHT,
  WELCOME_IMAGE,
  TERMS_LINK,
  SWITCH_TEXT,
  SWITCH,
  ACCEPT_SWITCH,
  RESEND_BUTTON,
  RESEND_BUTTON_TEXT
});
