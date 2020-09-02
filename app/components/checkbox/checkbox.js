import * as React from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import {Text} from '../text';
import {color, spacing, styles} from '../../theme';
import {mergeAll, flatten} from 'ramda';
import {iconCheckbox, iconCheckboxOn} from '../../theme';
const ROOT = {
  flexDirection: 'row',
  paddingVertical: 10,
  alignSelf: 'flex-start',
};
const DIMENSIONS = {width: 16, height: 16};
const OUTLINE = Object.assign(Object.assign({}, DIMENSIONS), {
  marginTop: 2,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: color.primaryDarker,
  borderRadius: 1,
});
const FILL = {
  width: DIMENSIONS.width - 4,
  height: DIMENSIONS.height - 4,
  backgroundColor: color.primary,
};
const LABEL = {paddingLeft: 15};
export function Checkbox(props) {
  const numberOfLines = props.multiline ? 0 : 1;
  const rootStyle = mergeAll(flatten([ROOT, props.style]));
  const outlineStyle = mergeAll(flatten([OUTLINE, props.outlineStyle]));
  const fillStyle = mergeAll(flatten([FILL, props.fillStyle]));
  const onPress = props.onToggle ? () => props.onToggle(!props.value) : null;
  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={!props.onToggle}
      onPress={onPress}
      style={rootStyle}>
      <View style={outlineStyle}>
        <Image
          source={props.value ? iconCheckboxOn : iconCheckbox}
          style={styles.CHECKBOX_ICON}
        />
      </View>
      <Text
        text={props.text}
        tx={props.tx}
        numberOfLines={numberOfLines}
        style={LABEL}
      />
    </TouchableOpacity>
  );
}
