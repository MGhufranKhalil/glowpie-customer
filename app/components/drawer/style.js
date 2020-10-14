import {
  Platform,
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet,
} from 'react-native';
import {color, styles, font, spacing, typography} from '../../theme';

const DRAWER_CONTAINER = {
  ...styles.CONTAINER,
  backgroundColor: 'transparent',
};

const DRAWER = {
  ...styles.VFLEX,
  width: 200,
  backgroundColor: color.white,
};

const HEADER  = {
  // ...styles.VFLEX_PADDED,
  // backgroundColor: color.primary,
  // flex: 1,
  paddingTop: 40,
  paddingBottom: 22,
  borderColor: color.input_border,
  borderBottomWidth: 1,
};
const CLOSE_BUTTON = {
  position: 'absolute',
  top: -25,
  right: 10,
};
const APP_ICON = {
  position: 'absolute',
  top: -25,
  left: 25,
  width: 30,
  height: 30,
};


const TEXT_HEADER = {
  position: 'absolute',
  top: 20,
  left: 75,
  fontSize: font.h4,
  color: color.black,

};


const PICTURE  = {
  width: 80,
  height: 80,
  marginHorizontal: 40,
  borderRadius: 100,
};

const NAV_LINKS = {
  ...styles.VFLEX_PADDED,
  ...styles.CONTAINER_PADDED,
  paddingTop: 20,
  paddingLeft: 20,
  // flex: 1,
};

const NAV_LINK  = {
  width: '100%',
  textAlign: 'left',
};

const NAV_TEXT  = {
  fontSize: font.h4,
  lineHeight: 20,
  color: color.black,
  marginBottom: 0,
  marginLeft: 5,
  textAlignVertical: 'center'
};

const USERNAME  = {
  fontSize: font.h1,
  lineHeight: 20,
  color: color.white,
  marginBottom: 0,
};


const  NAV_LINK_ICON = {
  width: 40, 
  height: 40
}
export const style = StyleSheet.create({
  DRAWER_CONTAINER,
  DRAWER,
  HEADER,
  PICTURE,
  NAV_LINKS,
  NAV_LINK,
  NAV_LINK_ICON,
  NAV_TEXT,
  USERNAME,
  CLOSE_BUTTON, APP_ICON, TEXT_HEADER
});
