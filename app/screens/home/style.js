import {StyleSheet} from 'react-native';
import {color, styles, font, spacing, typography} from '../../theme';

export const LOGO = {
  width: 200,
  height: 200,
  alignSelf: 'center',
  marginTop: '50%',
};

export const welcome = {
  ...styles.CONTENT,
  fontSize: font.h2,
  textAlign: 'center',
  color: color.secondary,
  alignSelf: 'center',
};

export const style = StyleSheet.create({
  LOGO,
  welcome,
});
