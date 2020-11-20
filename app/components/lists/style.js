import { StyleSheet } from 'react-native';
import { color, styles, font, spacing, typography } from '../../theme';

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
  marginHorizontal: 2,

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

const ICON_TEXT = {
  ...styles.CONTENT,
  paddingLeft: 8,
};
const SERVICES_LIST = {
  // marginBottom: 90,
};
/* just to create empty space after last service */
const SERVICE_PADDING = {
  height: 20,
};
const REVIEW_CONTAINER = { borderBottomColor: color.gray, borderBottomWidth: 1, paddingVertical: 20 };
const REVIEW_NAME = { color: color.dark, paddingVertical: 0, fontSize: 20, fontFamily: typography.bold };
const REVIEW_DATE = { color: color.gray, fontSize: 12, fontFamily: typography.regular };
const REVIEW_TEXT = { fontFamily: typography.regular };

const SMALL_LIST_IMAGE = { backgroundColor: color.gray, paddingTop: 10 };
const SMALL_LIST_DURATION = { 
  color: color.gray, 
  fontSize: 12, 
  paddingHorizontal: 10, 
  paddingVertical: 7, 
  fontFamily: 
  typography.regular 
};
const DEAL_NAME = { paddingHorizontal: 15, fontFamily: typography.regular };
const DEAL_SERVICES = { paddingHorizontal: 15, fontSize: 16, fontFamily: typography.bold };
const DEAL_COST = { paddingHorizontal: 15, fontFamily: typography.regular };
const DEAL_COST_PRICE = { paddingHorizontal: 15, fontSize: 16, fontFamily: typography.bold };
const DEAL_DISCOUNT = { 
  flex: 2, 
  justifyContent: 'center', 
  alignItems: 'center' 
};
const DEAL_DISCOUNT_STICKER = { 
  flexDirection: 'row', 
  justifyContent: 'flex-start', 
  backgroundColor: color.primary, 
  borderRadius: 5, 
  paddingHorizontal: 7, 
  paddingVertical: 5 
};
const DEAL_DISCOUNT_PERCENT = { 
  fontSize: 9,
  color: color.white, 
  fontFamily: 
  typography.regular 
};
const DEAL_DISCOUNT_OFF = { fontSize: 6, marginTop: 2, color: color.white, fontFamily: typography.regular };
const DEAL_DISCOUNT_AMOUNT = { flex: 3, backgroundColor: color.secondary, borderRadius: 5 };
const DEAL_DISCOUNT_AMOUNT_PRICE = { 
  paddingVertical: 7, 
  textAlign: 'center', 
  fontSize: 14, 
  alignItems: 'center', 
  color: color.white, 
  fontFamily: typography.bold 
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
  REVIEW_NAME,
  REVIEW_DATE,
  REVIEW_TEXT,
  REVIEW_CONTAINER,
  SMALL_LIST_IMAGE,
  SMALL_LIST_DURATION,
  DEAL_NAME,
  DEAL_SERVICES,
  DEAL_COST,
  DEAL_COST_PRICE,
  DEAL_DISCOUNT,
  DEAL_DISCOUNT_STICKER,
  DEAL_DISCOUNT_PERCENT,
  DEAL_DISCOUNT_OFF,
  DEAL_DISCOUNT_AMOUNT, 
  DEAL_DISCOUNT_AMOUNT_PRICE
});
