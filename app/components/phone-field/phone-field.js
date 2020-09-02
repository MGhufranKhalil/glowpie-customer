import React, {Component} from 'react';
import {TouchableOpacity, View, ActivityIndicator} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {Text} from '../text';
import {Icon} from '../icon';
import {color, font, typography, inputRadius} from '../../theme';
import {SM} from '../../utils/helpers';

const container = {
  paddingTop: SM ? 16 : 20,
  paddingLeft: SM ? 12 : 20,
  paddingBottom: SM ? 6 : 8,
  paddingRight: 10,
  backgroundColor: '#FFFFFF',
  borderColor: color.input_border,
  borderWidth: 1,
  borderRadius: inputRadius,
  marginBottom: 10,
  flexDirection: 'row',
};

const containerNoIcon = {
  ...container,
  paddingLeft: SM ? 20 : 25,
};

const ICON = {
  width: 24,
  height: 24,
  marginTop: SM ? 3 : 2,
};

const fixTextStyle = {
  height: SM ? 30 : 29,
  fontSize: font.text + 3,
  fontFamily: typography.semibold,
  color: color.dark,
  marginTop: SM ? 6 : 5,
  marginLeft: 10,
  padding: 0,
};

const separator = {
  width: 2,
  height: 40,
  backgroundColor: color.gray,
  marginLeft: 12,
  top: -5,
};

const inputStyle = {
  height: SM ? 30 : 29,
  fontSize: font.text + 3,
  fontFamily: typography.semibold,
  color: color.dark,
  marginLeft: 15,
  padding: 0,
  flex: 1,
};

const indicator = {
  marginTop: -9,
};

export class PhoneField extends Component {
  render() {
    const {label, labelColor, onSubmit, loading, ...props} = this.props;
    const icon = 'flagAu';
    const buttonStyle = {
      color: labelColor,
      fontFamily: typography.semibold,
      marginLeft: 6,
      marginTop: SM ? 8 : 6,
    };
    return (
      <View style={container}>
        {icon && <Icon icon={icon} style={ICON} />}
        <Text style={fixTextStyle} text="+61" />
        <View style={separator} />
        <TextInputMask
          type={'custom'}
          options={{
            mask: '(99) - 9999 - 9999',
          }}
          ref={ref => (this.input = ref)}
          {...props}
          style={inputStyle}
          underlineColorAndroid="transparent"
          maxLength={18}
        />
        {!loading && (
          <TouchableOpacity onPress={onSubmit}>
            <Text style={buttonStyle} text={label} />
          </TouchableOpacity>
        )}
        {loading && <ActivityIndicator style={indicator} />}
      </View>
    );
  }
}
