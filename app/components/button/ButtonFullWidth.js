import * as React from 'react';
import {TouchableOpacity, Image, View, ActivityIndicator} from 'react-native';
import {Text} from '../text';
import {Icon} from '../icon';
import {mergeAll, flatten} from 'ramda';
import {styles, color} from '../../theme';

export class ButtonFullWidth extends React.Component {
  constructor(props) {
    super(props);
    this.setup(props);
  }

  setup(props) {
    const {
      text,
      icon,
      style: styleOverride,
      textStyle: textStyleOverride,
      iconStyle: iconStyleOverride,
      children,
      disabled,
      ...rest
    } = props;

    this.rest = rest;
    this.iconView = {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    };
    this.viewStyle = mergeAll(flatten([styles.BUTTON_FULL_WIDTH, styleOverride]));
    this.textStyle = mergeAll(flatten([styles.BUTTON_FULL_WIDTH_TEXT, {textStyleOverride}]));
    this.iconStyle = mergeAll(flatten([styles.BUTTON_ICON, iconStyleOverride]));
  }

  render() {
    const {text, icon, loading, disabled, children} = this.props;
    {console.log(this.textStyle)}
    this.content = children || <Text text={text} style={this.textStyle} />;
    const onPress = loading ? () => {} : this.props.onPress;
    if (icon || loading) {
      return (
        <TouchableOpacity
          style={this.viewStyle}
          {...this.rest}
          activeOpacity={disabled ? 1 : 0.5}
          onPress={onPress}>
          {this.content}
          {!loading && icon && <Icon icon={icon} style={this.iconStyle} />}
          {loading && <ActivityIndicator color={color.white} />}
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={this.viewStyle}
        {...this.rest}
        activeOpacity={disabled ? 1 : 0.5}>
        {this.content}
      </TouchableOpacity>
    );
  }
}
