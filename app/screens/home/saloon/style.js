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
  textAlign: 'center',
} 
export const style = StyleSheet.create({
  VFLEX_PADDED,
  CONTAINER,
  ICON_BUTTON_CONTAINER,
  ICON_BUTTON,
  tabStyle,
  scrollStyle,
  tabBarTextStyle,
  underlineStyle
});
