import {
  Platform,
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {color, styles, font, spacing, typography} from '../../theme';
import {SM, XL} from '../../utils/helpers';

const VFLEX_PADDED = {
  ...styles.VFLEX_PADDED,
  justifyContent: 'flex-start',
};

const CONTAINER = {
  paddingHorizontal: 15,
};

const CODE_INPUT = {
  marginTop: 30,
  borderTopWidth: 1,
  borderColor: color.gray,
  paddingTop: 30,
  paddingHorizontal: 15,
};

export const style = StyleSheet.create({
  VFLEX_PADDED,
  CONTAINER,
  CODE_INPUT,
});
