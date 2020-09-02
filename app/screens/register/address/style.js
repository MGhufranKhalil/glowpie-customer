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
};

const CONTAINER = {
  paddingTop: 20,
  paddingHorizontal: 15,
};

const MAP_CONTAINER = {
  justifyContent: 'flex-end',
  alignItems: 'center',
  flex: 1,
  backgroundColor: color.black,
};

const MAP = {
  ...StyleSheet.absoluteFillObject,
  zIndex: 2,
};

const MAP_MARKER = {
  width: 30,
  height: 46,
};

const MAP_INFO = {
  position: 'absolute',
  backgroundColor: color.white,
  top: 10,
  left: 20,
  right: 20,
  borderWidth: 1,
  borderColor: color.gray,
  borderRadius: 5,
  paddingTop: 10,
  paddingBottom: 12,
  paddingLeft: 20,
  paddingRight: 20,
  zIndex: 3,
};

const MAP_INFO_TITLE = {
  ...styles.CONTENT,
  fontSize: font.h4,
  fontFamily: typography.bold,
  marginBottom: 3,
};

export const style = StyleSheet.create({
  VFLEX_PADDED,
  CONTAINER,
  MAP_CONTAINER,
  MAP,
  MAP_MARKER,
  MAP_INFO,
  MAP_INFO_TITLE,
});
