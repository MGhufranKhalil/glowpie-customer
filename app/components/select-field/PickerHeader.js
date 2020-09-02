import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableWithoutFeedback, Text, StyleSheet} from 'react-native';
import {testProperties} from './TestProperties';
import {color, font, typography, styles} from '../../theme/styles';

const PickerHeader = ({title, titleStyle, testProperty, toggleShowOptions}) => (
  <View style={stylesheet.pickerModalHeader}>
    <View {...testProperties('header', testProperty)}>
      <View>
        {title && title.length && (
          <Text style={[stylesheet.titleText, titleStyle]}>{title}</Text>
        )}
      </View>
    </View>
  </View>
);

PickerHeader.propTypes = {
  done: PropTypes.string.isRequired,
  toggleShowOptions: PropTypes.func.isRequired,
  doneStyle: Text.propTypes.style,
  testProperty: PropTypes.string,
};

PickerHeader.defaultProps = {
  doneStyle: null,
  testProperty: null,
};

const stylesheet = StyleSheet.create({
  pickerModalHeader: {
    alignItems: 'flex-start',
    backgroundColor: color.light,
    paddingTop: 12,
    paddingHorizontal: 25,
		paddingBottom: 20,
		overflow: 'hidden'
  },
  titleText: {
    ...styles.CONTENT,
    fontSize: font.h4,
    fontFamily: typography.semibold,
    color: color.dark,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
});

export default PickerHeader;
