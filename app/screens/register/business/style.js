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
};

const CONTAINER = {
  paddingTop: 20,
  paddingHorizontal: 15,
};

const NUM_STATIONS = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const NUM_STATIONS_TEXT = {
  ...styles.CONTENT,
  marginRight: 12,
};

export const style = StyleSheet.create({
  VFLEX_PADDED,
  CONTAINER,
  NUM_STATIONS,
  NUM_STATIONS_TEXT,
});
