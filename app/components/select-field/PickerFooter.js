import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {testProperties} from './TestProperties';
import {Button} from '../../components/button';
import {Text} from '../../components/text';
import {color, font, typography, styles} from '../../theme/styles';
import {SM, SW} from '../../utils/helpers';

const PickerFooter = ({
  title,
  titleStyle,
  testProperty,
  onSave,
  toggleShowOptions,
}) => (
  <View style={stylesheet.pickerModalFooter}>
    <View {...testProperties('header', testProperty)}>
      <View style={stylesheet.footerButtons}>
        <Button
          testID="save-button"
          preset="primary"
          text="Save"
          onPress={onSave}
          style={stylesheet.footerButton}
        />
        <Button
          testID="cancel-button"
          preset="secondary"
          text="Cancel"
          onPress={toggleShowOptions}
          style={stylesheet.footerCancelButton}
        />
      </View>
    </View>
  </View>
);

PickerFooter.propTypes = {
  done: PropTypes.string.isRequired,
  toggleShowOptions: PropTypes.func.isRequired,
  testProperty: PropTypes.string,
};

PickerFooter.defaultProps = {
  testProperty: null,
};

const stylesheet = StyleSheet.create({
  pickerModalFooter: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color.light,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerButton: {
    ...styles.BUTTON,
    paddingVertical: SM ? 10 : 14,
    backgroundColor: color.primary,
    width: SW / 2 - 40,
    justifyContent: 'center',
    marginRight: 30,
  },
  footerCancelButton: {
    ...styles.BUTTON,
    paddingVertical: SM ? 10 : 14,
    backgroundColor: color.dark,
    width: SW / 2 - 40,
    justifyContent: 'center',
  },
});

export default PickerFooter;
