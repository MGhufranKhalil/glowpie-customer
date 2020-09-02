import {
  Platform,
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {color, styles, font, spacing, typography} from '../../../theme';
import {SM, XL} from '../../../utils/helpers';

const VFLEX_PADDED = {
  ...styles.VFLEX_PADDED,
  justifyContent: 'flex-start',
  paddingBottom: 0,
  backgroundColor: color.screen_bg,
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

export const style = StyleSheet.create({
  VFLEX_PADDED,
  CONTAINER,
  ACCEPT_SWITCH,
  SWITCH,
  SWITCH_TEXT,
  TERMS_LINK,
});
