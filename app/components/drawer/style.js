import {
  Platform,
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet,
} from 'react-native';
import {color, styles, font, spacing, typography} from '../../theme';

const DRAWER_CONTAINER: ViewStyle = {
  ...styles.CONTAINER,
  backgroundColor: 'transparent',
};

const DRAWER: ViewStyle = {
  ...styles.VFLEX,
  width: 160,
  backgroundColor: color.white,
};

const HEADER: ViewStyle = {
  ...styles.VFLEX_PADDED,
  backgroundColor: color.primary,
  flex: 1,
  paddingTop: 40,
};

const PICTURE: ImageStyle = {
  width: 80,
  height: 80,
  marginHorizontal: 40,
  borderRadius: 100,
};

const NAV_LINKS: ViewStyle = {
  ...styles.VFLEX_PADDED,
  ...styles.CONTAINER_PADDED,
  paddingTop: 20,
  paddingLeft: 20,
  flex: 2,
};

const NAV_LINK: ViewStyle = {
  width: '100%',
  textAlign: 'left',
};

const NAV_TEXT: TextStyle = {
  fontSize: font.h1,
  lineHeight: 20,
  color: color.black,
  marginBottom: 0,
  marginLeft: 5,
};

const USERNAME: TextStyle = {
  fontSize: font.h1,
  lineHeight: 20,
  color: color.white,
  marginBottom: 0,
};

const CLOSE_BUTTON: ViewStyle = {
  position: 'absolute',
  top: -25,
  right: 10,
};

export const style = StyleSheet.create({
  DRAWER_CONTAINER,
  DRAWER,
  HEADER,
  PICTURE,
  NAV_LINKS,
  NAV_LINK,
  NAV_TEXT,
  USERNAME,
  CLOSE_BUTTON,
});
