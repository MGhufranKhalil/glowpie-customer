import {StyleSheet} from 'react-native';
import {color, styles, font, spacing, typography} from '../../../theme';
import {SM, SW, XL} from '../../../utils/helpers';

const VFLEX = {
  ...styles.VFLEX,
  justifyContent: 'flex-start',
  backgroundColor: color.screen_bg,
};

const DAYS_LIST = {
  marginTop: 15,
  marginBottom: 15,
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingTop: 5,
  paddingBottom: 5,
  paddingHorizontal: 10,
  backgroundColor: color.white,
};

const DAY_BOX = {
  justifyContent: 'center',
  marginTop: 0,
  paddingTop: 5,
  paddingBottom: 10,
  paddingHorizontal: 7,
  borderRadius: 3,
  backgroundColor: color.white,
  overflow: 'hidden',
};

const DAY_BOX_SELECTED = {
  ...DAY_BOX,
  backgroundColor: color.primary,
};

const CHECKBOX = {
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  width: 34,
  height: 34,
  borderRadius: 34,
  borderWidth: 1,
  borderColor: color.gray,
  backgroundColor: 'rgba(0, 0, 0, 0.02)',
};

const CHECKBOX_SELECTED = {
  ...CHECKBOX,
  borderColor: 'transparent',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
};

const DAY_NAME = {
  ...styles.CONTENT,
  marginTop: 5,
  textAlign: 'center',
  color: color.black,
  fontSize: font.text - 2,
};

const DAY_NAME_SELECTED = {
  ...DAY_NAME,
  color: color.white,
  fontFamily: typography.bold,
};

const HOURS_LIST = {
  backgroundColor: color.white,
  paddingTop: 15,
  paddingBottom: 5,
};

const BREAK_HOURS_LIST = {
  ...HOURS_LIST,
  borderTopWidth: 1,
  borderStyle: 'solid',
  borderColor: color.gray,
};

const HOURS_TITLE = {
  ...styles.CONTENT,
  textAlign: 'center',
  fontSize: font.text - 2,
  color: color.dark,
};

const HOURS = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 12,
  marginTop: 3,
};

const TIME = {
  ...styles.CONTENT,
  color: color.secondary,
  fontSize: font.h3,
  fontFamily: typography.bold,
};

const SEP = {
  ...styles.CONTENT,
  textAlign: 'center',
  color: color.gray,
  fontSize: font.h4,
  fontFamily: typography.bold,
  paddingHorizontal: 30,
};

export const style = StyleSheet.create({
  VFLEX,
  DAYS_LIST,
  DAY_BOX,
  DAY_BOX_SELECTED,
  CHECKBOX,
  CHECKBOX_SELECTED,
  DAY_NAME,
  DAY_NAME_SELECTED,
  HOURS_LIST,
  BREAK_HOURS_LIST,
  HOURS_TITLE,
  HOURS,
  TIME,
  SEP,
});
