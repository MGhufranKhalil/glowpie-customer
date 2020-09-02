import {StyleSheet} from 'react-native';
import {color, styles, font, spacing, typography} from '../../theme';
import {SM, SW, SH, XL, scale} from '../../utils/helpers';

const VFLEX = {
  ...styles.VFLEX,
  justifyContent: 'flex-end',
  paddingBottom: 0,
};

const SKIP_BUTTON = {
  position: 'absolute',
  top: 20,
  right: 10,
  justifyContent: 'center',
  borderRadius: 30,
  paddingVertical: 10,
  fontFamily: typography.bold,
};

const START_BUTTON = {
  position: 'absolute',
  bottom: 20,
  left: 40,
  right: 40,
  justifyContent: 'center',
};

export const style = StyleSheet.create({
  VFLEX,
  SKIP_BUTTON,
  START_BUTTON,
});
