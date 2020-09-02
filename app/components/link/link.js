import * as React from 'react';
import {TouchableOpacity, Keyboard} from 'react-native';
import {Text} from '../text';
import {Icon} from '../icon';
import {color, spacing, font} from '../../theme';
import {mergeAll, flatten} from 'ramda';

const ROOT = {
  flexDirection: 'row',
  paddingVertical: 10,
  alignSelf: 'flex-start',
};
const LABEL = {
  paddingLeft: 10,
  color: color.primary,
  marginBottom: 0,
};
const ICON = {width: 20, height: 20};

function openURL(url) {
  console.tron.log(`open url: ${url}`);
}

export class Link extends React.Component {
  constructor(props) {
    super(props);
    this.setup(props);
  }

  componentWillReceiveProps(props) {
    this.setup(props);
  }

  setup(props) {
    this.rootStyle = mergeAll(flatten([ROOT, props.style]));
    this.labelStyle = mergeAll(flatten([LABEL, props.labelStyle]));
    this.iconStyle = mergeAll(flatten([ICON, props.iconStyle]));
    this.numberOfLines = props.multiline ? 0 : 1;
    this.onPress = () => {
      // Keyboard.dismiss();
      props.onClick ? props.onClick() : openURL(props.url);
    };
  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.3}
        onPress={this.onPress}
        style={this.rootStyle}>
        {this.props.icon && (
          <Icon icon={this.props.icon} style={this.iconStyle} />
        )}
        {this.props.text && (
          <Text
            text={this.props.text}
            numberOfLines={this.numberOfLines}
            style={this.labelStyle}
          />
        )}
      </TouchableOpacity>
    );
  }
}
