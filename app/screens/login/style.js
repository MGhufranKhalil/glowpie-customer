import {
  Platform,
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {color, styles, font, spacing, typography} from '../../theme';
import {SM, XL,  SW, SH,  scale} from '../../utils/helpers';

const HEADING = {
  marginTop: SM ? 25 : 45,
  marginBottom: SM ? 15 : 20,
};

const HEADING_TEXT = {
  ...styles.CONTENT_BASE,
  fontSize: font.h3,
  fontFamily: typography.bold,
};

const SUBHEADING_TEXT = {
  ...styles.CONTENT_BASE,
  fontFamily: typography.regular,
  fontSize: font.h4,
  marginTop: SM ? 5 :10,
};

const FORGOT_LINK = {
  alignSelf: 'center',
  marginTop: SM ? 6 : 8,
};

const FORGOT_LINK_TEXT = {
  lineHeight: SM ? 14 : 22,
  fontFamily: typography.regular,
  fontSize: font.text + 2,
  color: color.black,
};

const OR_TEXT = {
  justifyContent: 'center',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 2,
};

const OR_LINE = {
  height: 1,
  backgroundColor: color.gray,
  width: '30%',
};

const OR = {
  marginHorizontal: 10,
  fontFamily: typography.bold,
  fontSize: font.text + 5,
  color: color.gray,
};

const NO_ACCOUNT = {
  alignSelf: 'center',
  color: color.dark,
  textAlign: 'center',
  fontFamily: typography.regular,
  fontSize: font.text - 1,
};
 

const BUTTON_LOGIN = {
  marginTop: SM ? 5 : 10,
};
 const SOCIAL_BUTTONS = {
   flexDirection: 'row',
   justifyContent: 'space-around',
   alignItems: 'center',
   marginTop: 12,
 };
 const SOCIAL_BUTTON = {
   ...styles.BUTTON,
   paddingVertical: SM ? 12 : 16,
   backgroundColor: '#3A5997',
   flex: 1,
   paddingLeft: SM ? 12 : 16,
   justifyContent: 'flex-start',
 };

 const BUTTON_FB = {
   ...SOCIAL_BUTTON,
   backgroundColor: '#3a5997',
   marginRight: 6,
 };

 const BUTTON_GOOGLE = {
   ...SOCIAL_BUTTON,
   backgroundColor: '#4285f4',
   marginLeft: 6,
 };

 const SOCIAL_BUTTON_ICON = {
   ...styles.BUTTON_ICON,
   width: SM ? 18 : 22,
   height: SM ? 18 : 22,
 };

 const SOCIAL_BUTTON_TEXT = {
   ...styles.BUTTON_TEXT,
   textAlign: 'left',
   marginLeft: SM ? 10 : 14,
 };


const WELCOME_IMAGE = {
  position: 'absolute',
  resizeMode: 'cover',
  height: XL || SM ? '70%' : '65%',
  top: 0,
  left: 0,
  marginLeft: SW > 400 ? 0 : SM ? -230 : -180,
};
const SKIP_BUTTON = {
  position: 'absolute',
  top: 20,
  right: 10,
  justifyContent: 'center',
  borderRadius: 30,
  paddingVertical: 10,
  fontFamily: typography.bold,
  backgroundColor:color.white,
  // color:color.secondary
};
const SIGNUP_BUTTON_TEXT = {color: '#FF62B0', fontWeight: '900'};


const CONTAINER = {
  paddingHorizontal: 20,
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
const SIGN_IN_TEXT = {
  fontSize: SM ? font.h1 * 1.2 : font.h1 * 0.6,
  fontFamily: typography.bold,
  paddingTop: 5,
  paddingBottom: 5,
};
const SEP = {
  width: 10,
};
const VFLEX_PADDED = {
  ...styles.VFLEX_PADDED,
  justifyContent: 'flex-end',
  paddingBottom: 0,
};
export const style = StyleSheet.create({
  HEADING,
  HEADING_TEXT,
  SUBHEADING_TEXT,
  FORGOT_LINK,
  FORGOT_LINK_TEXT,
  OR_TEXT,
  OR_LINE,
  OR,
  NO_ACCOUNT,
  BUTTON_LOGIN,
  SOCIAL_BUTTONS,
  BUTTON_FB,
  BUTTON_GOOGLE,
  SOCIAL_BUTTON_ICON,
  SOCIAL_BUTTON_TEXT,
  WELCOME_IMAGE,
  SKIP_BUTTON,
  CONTAINER,
  LOGO,
  TEXT_HEADER,
  TEXT_BOLD,
  SEP,
  VFLEX_PADDED,
  SIGN_IN_TEXT,
  SIGNUP_BUTTON_TEXT
});
