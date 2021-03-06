import {StyleSheet} from 'react-native';
import {color, styles, font, spacing, typography} from '../../../theme';
import {SM, SW, XL} from '../../../utils/helpers';

const LOGO = {
  width: 200,
  height: 200,
  alignSelf: 'center',
  marginTop: '50%',
};

const VFLEX = {
  ...styles.VFLEX,
  justifyContent: 'flex-start',
};

const PAGE_HEADER = {
  ...styles.PAGE_HEADER_BIG,
  shadowColor: color.dark,
  shadowOffset: {width: 0, height: 4},
  shadowOpacity: 0.15,
  shadowRadius: 4,
  elevation: 3,
  backgroundColor: color.white,
  marginBottom: 18,
  paddingBottom: 5,
};

const PAGE_HEADER_HEADING = {
  ...styles.PAGE_HEADER_HEADING,
  marginBottom: 3,
  fontSize: font.h3,
};

const PAGE_HEADER_SUB = {
  ...styles.PAGE_HEADER_SUB,
  marginBottom: 5,
};

const PROGRESS = {
  ...styles.PAGE_HEADER_PROGRESS,
  bottom: 5,
  height: 7,
  borderRadius: 7,
  width: SW - 70,
};

const PROGRESS_TEXT = {
  color: color.secondary,
  alignSelf: 'flex-end',
  fontSize: font.text + 2,
};

const UPLOAD_IMAGE_CONTAINER = {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: SM ? 20 : 30,
  marginBottom: 3,
};

const UPLOAD_IMAGE = {
  width: SM ? 70 : 80,
  height: SM ? 70 : 80,
  resizeMode: 'cover',
};

const UPLOADED_IMAGE = {
  ...UPLOAD_IMAGE,
  borderRadius: 80,
};

const UPLOADING_IMAGE = {
  ...UPLOAD_IMAGE,
  opacity: 0.5,
};

const UPLOAD_IMAGE_TEXT = {
  ...styles.CONTENT,
  fontFamily: typography.bold,
  marginLeft: 8,
  fontSize: font.text - 1,
};

const BOX = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingTop: 15,
  paddingBottom: 8,
  paddingHorizontal: 20,
  marginTop: 0,
  marginBottom: 10,
  marginHorizontal: 10,
  borderRadius: 4,
  shadowColor: color.dark,
  shadowOffset: {width: 0, height: 0},
  shadowOpacity: 0.3,
  shadowRadius: 3,
  elevation: 3,
  backgroundColor: color.white,
};

const BOX_IMAGE = {
  width: SM ? 70 : 80,
  height: SM ? 70 : 80,
};

const BOX_INFO = {
  flex: 1,
  paddingLeft: 10,
  alignItems: 'flex-start',
};

const BOX_TITLE = {
  ...styles.CONTENT,
  fontSize: SM ? font.h3 - 3 : font.h3,
  fontFamily: typography.bold,
};

const BOX_SUBTITLE = {
  ...styles.CONTENT,
  fontSize: font.text,
  marginBottom: 10,
};

const BOX_BUTTON = {
  fontSize: font.text - 2,
  paddingVertical: 7,
  paddingHorizontal: 20,
  margin: 0,
};

const BOX_BUTTON_TEXT = {
  color: color.white,
  padding: 0,
  margin: 0,
  fontSize: font.text - 2,
};

const BOX_TICK = {
  position: 'absolute',
  bottom: 3,
  right: 0,
  borderRadius: 30,
  width: 23,
  height: 23,
  resizeMode: 'contain',
};

const SIGNUP_COMPLETE = {
  flex: 1,
  marginHorizontal: 10,
  justifyContent: 'center',
  paddingBottom: SM ? 80 : 100,
};

const IMAGE_TICK = {
  marginBottom: 15,
};

const CONTINUE_TEXT = {
  ...PAGE_HEADER_SUB,
  fontSize: font.text,
  marginBottom: 20,
};

const CONTINUE_BUTTON = {
  ...styles.BUTTON,
  position: 'absolute',
  left: 5,
  bottom: 20,
  width: SW - 30,
};

export const style = StyleSheet.create({
  LOGO,
  VFLEX,
  PAGE_HEADER,
  PAGE_HEADER_HEADING,
  PAGE_HEADER_SUB,
  PROGRESS,
  PROGRESS_TEXT,
  UPLOAD_IMAGE_CONTAINER,
  UPLOAD_IMAGE,
  UPLOADED_IMAGE,
  UPLOADING_IMAGE,
  UPLOAD_IMAGE_TEXT,
  BOX,
  BOX_IMAGE,
  BOX_INFO,
  BOX_TITLE,
  BOX_SUBTITLE,
  BOX_BUTTON,
  BOX_BUTTON_TEXT,
  BOX_TICK,
  SIGNUP_COMPLETE,
  IMAGE_TICK,
  CONTINUE_TEXT,
  CONTINUE_BUTTON,
});
