import {StyleSheet} from 'react-native';
import {color, styles, font, spacing, typography} from '../../../theme';
import {SM, SW, XL} from '../../../utils/helpers';

const VFLEX = {
  ...styles.VFLEX,
  justifyContent: 'flex-start',
  backgroundColor: color.screen_bg,
};

const SERVICES_LIST = {
  marginBottom: 90,
};

const SERVICE = {
  justifyContent: 'space-between',
  marginTop: 10,
  marginHorizontal: 15,
  paddingBottom: 5,
  borderRadius: 4,
  shadowColor: color.dark,
  shadowOffset: {width: 0, height: 0},
  shadowOpacity: 0.5,
  shadowRadius: 3,
  elevation: 3,
  backgroundColor: color.white,
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: color.gray,
};

const SERVICE_IMAGE = {
  width: '100%',
  height: 150,
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: color.primary,
};

const REAL_IMAGE = {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
};

const PLACEHOLDER_IMAGE = {
  width: SM ? 50 : 60,
  height: SM ? 50 : 60,
  resizeMode: 'contain',
  marginTop: 40,
};

const CATEGORY = {
  ...styles.CONTENT,
  alignItems: 'flex-start',
  paddingVertical: 10,
  paddingLeft: 15,
};

const CATEGORY_SEP = {
  width: 5,
};

const CATEGORY_NAME = {
  ...styles.CONTENT,
  fontFamily: typography.semibold,
};

const SERVICE_NAME = {
  ...styles.CONTENT,
  fontSize: font.h3,
  color: color.secondary,
  fontFamily: typography.semibold,
  paddingTop: 2,
  paddingLeft: 15,
};

const ICONS = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: 15,
};

const ROW = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const ICON = {
  width: 20,
  height: 20,
  resizeMode: 'contain',
};

const ICON_TEXT = {
  ...styles.CONTENT,
  paddingLeft: 8,
};

const ACTION_ICON = {
  width: 35,
  height: 35,
  marginRight: 10,
  marginBottom: 5,
};

const ADD_SERVICE_BUTTON = {
  backgroundColor: color.secondary,
  borderRadius: 40,
  position: 'absolute',
  top: 50,
  right: 20,
  width: 40,
  height: 40,
  justifyContent: 'center',
  zIndex: 100,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
  shadowColor: color.dark,
  shadowOffset: {width: 0, height: 0},
  shadowOpacity: 0.5,
  shadowRadius: 3,
  elevation: 5,
};

const ADD_SERVICE_ICON = {
  resizeMode: 'contain',
  width: 10,
  height: 10,
  padding: 0,
  margin: 0,
};

const RBSHEET_CONTAINER = {
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 10,
};

const DELETE_CONFIRM_TEXT = {
  fontSize: font.h4,
};

const DELETE_CONFIRM_BUTTON = {
  paddingTop: 5,
  paddingBottom: 5,
  marginTop: 20,
};

/* just to create empty space after last service */
const SERVICE_PADDING = {
  height: 20,
};

export const style = StyleSheet.create({
  VFLEX,
  SERVICES_LIST,
  SERVICE,
  SERVICE_IMAGE,
  REAL_IMAGE,
  PLACEHOLDER_IMAGE,
  CATEGORY,
  CATEGORY_SEP,
  CATEGORY_NAME,
  SERVICE_NAME,
  ICONS,
  ROW,
  ICON,
  ICON_TEXT,
  ACTION_ICON,
  ADD_SERVICE_BUTTON,
  ADD_SERVICE_ICON,
  RBSHEET_CONTAINER,
  DELETE_CONFIRM_TEXT,
  DELETE_CONFIRM_BUTTON,
  SERVICE_PADDING,
});
