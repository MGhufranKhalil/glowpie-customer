import { StyleSheet } from 'react-native';
import { color, styles, font, spacing, typography } from '../../../theme';

const VFLEX_PADDED = {
  ...styles.VFLEX_PADDED,
  justifyContent: 'flex-start',
  paddingBottom: 0,
};


const CONTAINER = {
  paddingTop: 20,
  paddingHorizontal: 15,
};

const ICON_BUTTON_CONTAINER = {
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignSelf: 'auto',
  alignItems: 'center'
};
const ICON_BUTTON = {
  paddingTop: 35,
  paddingLeft: 35,
  paddingRight: 35,
  paddingBottom: 10,

  borderWidth: 2,
  borderColor: color.gray,
  borderRadius: 10,
  // marginTop:-16, 
  marginBottom: 15,
}

const tabStyle =  {
  flexDirection: 'row',
  borderWidth: 0.5,
  borderColor: color.gray,
} 
const scrollStyle = {
  backgroundColor: 'white',
  justifyContent: 'center',
  height: 50
} 
const tabBarTextStyle = {
  fontSize: 17,
  fontWeight: 'normal',
} 
const underlineStyle =  {
  height: 3,
  backgroundColor: color.secondary,
  borderRadius: 1,
  alignSelf: 'stretch',
  // textAlign: 'center',
} 
const REAL_IMAGE = {
  width: '100%',
  height: '100%',
  resizeMode: 'contain',
};
const PLACEHOLDER_IMAGE = {
  resizeMode: 'contain',
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 15,
};
const SERVICE_SMALL = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginTop: 10,
  marginHorizontal: 15,

  paddingTop: 10,
  paddingLeft: 10,
  paddingRight: 10,
  paddingBottom: 10,

  borderRadius: 4,
  shadowColor: color.dark,
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.5,
  shadowRadius: 3,
  elevation: 3,
  backgroundColor: color.white,
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: color.gray,
};
const SERVICE_HEADER = {
   flexDirection: 'row', paddingTop: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5  
};
const SERVICE_HEADER_HEADING = { width: '50%' };
const SERVICE_SMALL_IMAGE_CONTENT = { width: '60%', flex: 1, flexDirection: 'row' };
const SERVICE_SMALL_ICON = { width: '30%', padding: 5 };
const SERVICE_HEADER_RATING = { width: '50%', flexDirection: 'row-reverse' };
const SERVICE_NAME = {
  ...styles.CONTENT,
  fontSize: font.h4,
  color: color.secondary,
  fontFamily: typography.semibold,
  paddingTop: 2,
  paddingLeft: 15,
};
const CATEGORY_SMALL = {
  ...styles.CONTENT,
  // flexDirection:'row',
  alignItems: 'flex-start',
  paddingVertical: 10,
  paddingLeft: 15,
};

const ROW_SMALL = {
  flexDirection: 'row',
  // justifyContent: 'space-between',
  alignItems: 'flex-start',
  paddingBottom: 10,
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
const ICON_SIZE = { height: 15, width: 17 };

const ICON_TEXT = {
  ...styles.CONTENT,
  paddingLeft: 8,
};
const SERVICES_LIST = {
  // marginBottom: 90,
};
/* just to create empty space after last service */
const SERVICE_PADDING = {
  height:30,
};

const SEARCH_CONTAINER = { zIndex: 1, paddingLeft: 15 };
const SEARCH_INPUT_CONTAINER = { 
  borderWidth: 1, 
  borderColor: color.gray, 
  borderRadius: 5, 
  flexDirection: 'row', 
  paddingLeft: 5 
}; 
const SEARCH_ICON = { 
  width: 20, 
  height: 20, 
  paddingLeft: 5, 
  justifyContent: 'center', 
  flex: 1 
};
const SEARCH_CLOSE_ICON = { width: 15, height: 15 }
const KM_BUTTON = {
  backgroundColor: color.darkgray,
  borderRadius: 20,
  color: color.white,
  width: 40,
  // paddingHorizontal: 9,
  paddingVertical: 2,
  fontSize: 10,
  textAlign: 'center',
  fontFamily: typography.regular
};

export const style = StyleSheet.create({
  VFLEX_PADDED,
  CONTAINER,
  ICON_BUTTON_CONTAINER,
  ICON_BUTTON,
  tabStyle,
  scrollStyle,
  tabBarTextStyle,
  underlineStyle,
  ICON_TEXT,
  ICON,
  ROW,
  ICONS,
  ROW_SMALL,
  SERVICE_NAME,
  SERVICE_SMALL,
  SERVICE_HEADER,
  SERVICE_HEADER_HEADING,
  SERVICE_HEADER_RATING,
  SERVICE_SMALL_ICON,
  SERVICE_SMALL_IMAGE_CONTENT,
  PLACEHOLDER_IMAGE,
  REAL_IMAGE,
  SERVICES_LIST,
  SERVICE_PADDING,
  CATEGORY_SMALL, 
  SEARCH_CONTAINER,
  SEARCH_INPUT_CONTAINER,
  SEARCH_ICON,
  SEARCH_CLOSE_ICON,
  ICON_SIZE,
  KM_BUTTON
});
