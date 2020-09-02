import * as React from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import {icons} from '../../theme';

const ROOT = {
  width: 28,
  height: 18,
};

export class Icon extends React.Component {
  constructor(props) {
    super(props);
    this.setup(props);
  }

  componentWillReceiveProps(props) {
    this.setup(props);
  }

  setup(props) {
    const {style: styleOverride} = props;
    this.style = Object.assign(Object.assign({}, ROOT), styleOverride);
    this.imageStyle = {
      resizeMode: 'contain',
      width: this.style.width,
      height: this.style.height,
    };
    this.onPress = props.onClick ? () => props.onClick() : () => {};
  }

  render() {
    const {icon, onClick} = this.props;
    if (onClick) {
      return (
        <TouchableOpacity onPress={this.onPress}>
          <View style={this.style}>
            <Image style={this.imageStyle} source={icons[icon]} />
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <View style={this.style}>
        <Image style={this.imageStyle} source={icons[icon]} />
      </View>
    );
  }
}
