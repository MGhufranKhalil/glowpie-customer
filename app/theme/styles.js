import {
  Platform,
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {SH, SM, SW} from '../utils/helpers';

export const typography = {
  regular: Platform.select({
    ios: 'Montserrat-Regular',
    android: 'Montserrat-Regular',
  }),
  semibold: Platform.select({
    ios: 'Montserrat-SemiBold',
    android: 'Montserrat-SemiBold',
  }),
  bold: Platform.select({ios: 'Montserrat-Bold', android: 'Montserrat-Bold'}),
  italic: Platform.select({
    ios: 'Montserrat-Italic',
    android: 'Montserrat-Italic',
  }),
  title_bold: Platform.select({
    ios: 'Absolut Pro reduced',
    android: 'Absolut_Pro_Bold_reduced',
  }),
  title_light: Platform.select({
    ios: 'Absolut Pro reduced',
    android: 'Absolut_Pro_Light_reduced',
  }),
};

export const inputRadius = 6;

export const font = {
  h1: SM ? 27 : 30,
  h2: SM ? 24 : 24,
  h3: SM ? 20 : 21,
  h4: SM ? 15 : 17,
  message: SM ? 13 : 14,
  text: SM ? 11 : 12,
};

export const color = {
  transparent: 'rgba(0, 0, 0, 0)',
  overlay: 'rgba(0, 0, 0, 0.2)',
  screen_bg: '#fafafa',
  black: '#000000',
  white: '#FFFFFF',
  dark: '#2B2B2B',
  light: '#FCFCFC',
  primary: '#2DB1FF',
  secondary: '#FF62B0',
  gray: '#E3E3E3',
  darkgray: '#BABABA',
  input_border: '#E0E0E0',
  dark_button: '#313131',
  note_bg: '#FF7DBC',
  error_message: '#FF006E', // 941C2F, F03A47
  notice: '#2B2B2B',
};

export const timing = {
  quick: 300,
  medium: 700,
  slow: 1000,
};

const FULL = {
  flex: 1,
  /* no idea why the below are used in ignite, need to see effect */
  /*maxHeight: 700,
  paddingTop: Math.round((SH - 700) / 4),*/
};

const SCREEN = {
  backgroundColor: color.white,
  paddingHorizontal: 0,
  paddingVertical: 0,
  margin: 0,
  flex: 1,
  // without - 30, android footer view goes below screen height for some reason :P
  minHeight: SH - 30,
};

const SCREEN_PADDED = {
  backgroundColor: color.transparent,
  paddingHorizontal: 20,
  flex: 1,
};

const VFLEX = {
  justifyContent: 'space-between',
  flex: 1,
};

const VFLEX_PADDED = {
  ...VFLEX,
  paddingBottom: 20,
};

const VFLEX_CONTAINER_PADDED = {
  ...VFLEX,
  paddingHorizontal: 40,
  paddingBottom: 20,
  justifyContent: 'center',
  alignItems: 'center',
};

/* all styles available for app */
const LOGO = {
  alignSelf: 'center',
  maxWidth: '55%',
  resizeMode: 'contain',
};

const CONTENT_BASE = {
  fontFamily: typography.regular,
  fontSize: font.text,
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'left',
};

const CONTENT = {
  ...CONTENT_BASE,
  color: color.dark,
};

const CONTENT_LIGHT = {
  ...CONTENT_BASE,
  color: color.light,
};

export const pageHeaderHeight = 50;
export const pageHeaderBigHeight = SM ? 115 : 130;

const PAGE_HEADER_WITH_BUTTON = {flexDirection: 'row', top: 10};
const PAGE_HEADER = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundColor: color.white,
  zIndex: 2,
  height: pageHeaderHeight,
  paddingHorizontal: 20,
  paddingTop: SM ? 10 : 16,
  paddingBottom: 10,
};

const PAGE_HEADER_TRANSPARENT = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundColor: color.transparent,
  zIndex: 2,
  height: pageHeaderHeight,
  paddingHorizontal: 20,
  paddingTop: SM ? 10 : 16,
  paddingBottom: 10,
};

const PAGE_HEADER_SHADOW = {
  ...PAGE_HEADER,
  shadowColor: color.dark,
  shadowOffset: {width: 0, height: 3},
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 3,
  backgroundColor: color.white,
  marginBottom: 18,
  paddingBottom: 5,
};

const PAGE_HEADER_BIG = {
  zIndex: 2,
  paddingHorizontal: 10,
  paddingBottom: 15,
  backgroundColor: color.white,
};

const PAGE_HEADER_BIG_SHADOW = {
  ...PAGE_HEADER_BIG,
  shadowColor: color.dark,
  shadowOffset: {width: 0, height: 3},
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 3,
  backgroundColor: color.white,
};

const PAGE_HEADER_HEADING = {
  ...CONTENT,
  fontSize: font.h2,
  fontFamily: typography.bold,
  marginBottom: SM ? 5 : 8,
};

const PAGE_HEADER_SUB = {
  ...CONTENT,
  fontSize: font.message,
  marginBottom: 16,
};

const PAGE_HEADER_TITLE = {
  ...CONTENT,
  flex: 1,
  fontSize: font.h4,
  fontFamily: typography.semibold,
  marginBottom: SM ? 5 : 8,
  textAlign: 'center',
};

const PAGE_HEADER_TITLE_LINK = {
  paddingVertical: SM ? 5 : 9,
};

const PAGE_HEADER_PROGRESS = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  height: 4,
  backgroundColor: color.gray,
  width: SW,
};

/* buttons */
const BUTTON = {
  paddingVertical: SM ? 16 : 20,
  paddingHorizontal: 30,
  borderRadius: 4,
  alignItems: 'center',
  backgroundColor: color.primary,
  flexDirection: 'row',
  justifyContent: 'space-between',
};
const BUTTON_FULL_WIDTH = {
  ...BUTTON,
  borderRadius: 50,
};

const BUTTON_FULL_WIDTH_TEXT = {
  fontFamily: typography.semibold,
  fontSize: font.text + 4,
  lineHeight: 20,
  color: color.white,
  textAlign: 'center',
  alignSelf: 'flex-start',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const BUTTON_TEXT = {
  fontFamily: typography.semibold,
  fontSize: font.text + 4,
  lineHeight: 20,
  color: color.white,
  textAlign: 'left',
  alignSelf: 'flex-start',
};

const BUTTON_ICON = {
  width: 20,
  height: 20,
  resizeMode: 'contain',
  alignSelf: 'flex-end',
};

const TWIN_BUTTONS = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
};

const CHECKBOX_ICON = {
  alignSelf: 'center',
  marginVertical: 0,
  marginBottom: 0,
  paddingVertical: 0,
  paddingHorizontal: 0,
  maxWidth: 28,
  maxHeight: 18,
  resizeMode: 'contain',
};

const INPUT_LABEL = {
  fontSize: font.text,
  marginBottom: 10,
};

const FOOTER_VIEW = {
  position: 'absolute',
  padding: 15,
  bottom: 0,
  left: 0,
  width: '100%',
  backgroundColor: color.transparent,
};

const FOOTER_VIEW_FULL = {
  // position: 'absolute',
  // padding: 15,
  marginLeft: 10,
  marginRight: 10,
  bottom: 0,
  left: 0,
  width: '95%',
  // height: 200,
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  backgroundColor: color.white,
};

const FULLSCREEN_POPUP: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
};

const NO_RADIUS = {
  borderRadius: 0,
};
 
// const LOGO = {
//   width: SM ? 70 : 100,
//   height: SM ? 70 : 100,
//   marginLeft: 16,
// };
const TEXT_HEADER = {
  ...CONTENT,
  fontSize: SM ? font.h1 * 1.8 : font.h1,
  fontFamily: typography.regular,
  color: color.white,
};
const TEXT = {
  ...CONTENT,
  fontSize: SM ? font.h1 * 1.2 : font.h1 * 1.3 + 3,
  color: color.white,
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
 
const TOP_RIGHT_CORNER_BUTTON = {
  position: 'absolute',
  top: 20,
  right: 10,
  justifyContent: 'center',
  borderRadius: 30,
  paddingVertical: 10,
  paddingHorizontal:20,
  fontFamily: typography.bold,
  backgroundColor: color.white,
  // color:color.secondary
}
const TOP_RIGHT_CORNER_BUTTON_TEXT = {color: '#FF62B0', fontWeight: '900'};
export const styles = StyleSheet.create({
  FULL,
  SCREEN,
  SCREEN_PADDED,
  VFLEX,
  VFLEX_PADDED,
  VFLEX_CONTAINER_PADDED,
  LOGO,
  CONTENT,
  PAGE_HEADER,
  PAGE_HEADER_SHADOW,
  PAGE_HEADER_BIG,
  PAGE_HEADER_BIG_SHADOW,
  PAGE_HEADER_HEADING,
  PAGE_HEADER_SUB,
  PAGE_HEADER_TITLE,
  PAGE_HEADER_TITLE_LINK,
  PAGE_HEADER_PROGRESS,
  CONTENT_LIGHT,
  BUTTON,
  BUTTON_TEXT,
  BUTTON_ICON,
  TWIN_BUTTONS,
  CHECKBOX_ICON,
  INPUT_LABEL,
  FOOTER_VIEW,
  FOOTER_VIEW_FULL,
  FULLSCREEN_POPUP,
  BUTTON_FULL_WIDTH,
  BUTTON_FULL_WIDTH_TEXT,
  NO_RADIUS,
  TOP_RIGHT_CORNER_BUTTON,
  TOP_RIGHT_CORNER_BUTTON_TEXT,
  SEP,
  SIGN_IN_TEXT,
  TEXT_BOLD,
  TEXT_HEADER,
  PAGE_HEADER_TRANSPARENT,
  PAGE_HEADER_WITH_BUTTON
});
