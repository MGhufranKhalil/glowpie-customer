import {StyleSheet} from 'react-native';
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
  marginBottom:15,
}
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
  DEAL_DISCOUNT,
  DEAL_DISCOUNT_STICKER,
  DEAL_DISCOUNT_PERCENT,
  DEAL_DISCOUNT_OFF,
  DEAL_DISCOUNT_AMOUNT,
  DEAL_DISCOUNT_AMOUNT_PRICE
});
