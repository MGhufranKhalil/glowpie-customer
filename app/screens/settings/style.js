import {
  Platform,
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet,
} from 'react-native';
import {color, styles, font, spacing, typography} from '../../theme';

export const style = StyleSheet.create({
  item: {
    alignSelf: 'flex-start',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: color.lightgray,
    width: '100%',
  },
  title: {
    fontSize: 13,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5,
  },
});
