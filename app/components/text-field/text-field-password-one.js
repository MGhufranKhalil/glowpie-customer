import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  TextInput,
  Animated, Switch, TouchableOpacity
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Icon } from '../icon';
import { styles, color, font, typography, inputRadius } from '../../theme';
import { SM } from '../../utils/helpers';
import { mergeAll, flatten } from 'ramda';


const ICON = {
  position: 'absolute',
  left: 20,
  top: SM ? 17 : 22,
  width: 24,
  height: 24,
};

const SWITCH_STYLE = {
  position: 'absolute',
  right: 20,
  top: SM ? 17 : 22,
  width: 24,
  height: 24,
};
const container = {
  paddingTop: SM ? 28 : 32,
  paddingLeft: SM ? 66 : 70,
  paddingBottom: SM ? 5 : 8,
  paddingRight: 10,
  backgroundColor: '#FCFCFC',
  borderColor: color.input_border,
  borderWidth: 1,
  borderRadius: inputRadius,
  marginBottom: 12,
};

const containerNoIcon = {
  ...container,
  paddingLeft: SM ? 20 : 25,
};

const inputStyle = {
  ...styles.CONTENT,
  height: 26,
  fontFamily: typography.semibold,
  fontSize: font.text + 2,
  color: color.dark,
  padding: 0,
  margin: 0,
};

export class TextFieldPasswordOne extends Component {
  constructor(props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
      showPassword: true,
      showPasswordIcon: 'hide',
      hidePasswordIcon: 'hide_x',
      isFocused: false,
    }
  }
 

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value ? 1 : 0);
  }

  handleFocus = () => this.setState({isFocused: true});
  handleBlur = () => this.setState({isFocused: false});

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value ? 1 : 0,
      duration: 100,
    }).start();
  }

  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  render() {
    const { label, mask, containerStyle, ...props } = this.props;
    const icon = this.props.icon
      ? this.state.isFocused || this.props.value !== ''
        ? `${this.props.icon}_x`
        : this.props.icon
      : null;
    const labelStyle = {
      position: 'absolute',
      left: icon ? (SM ? 66 : 70) : SM ? 20 : 25,
      fontFamily: typography.regular,
      fontSize: font.text,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [SM ? 23 : 25, 12],
      }),
      
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [color.darkgray, color.secondary],
      }),
    };

    const containerOverrideStyle = mergeAll(
      flatten([icon ? container : containerNoIcon, containerStyle]),
    );
    return (
      

      <TouchableWithoutFeedback
        onPress={() => this.input.focus && this.input.focus()}>
        <View style={containerOverrideStyle}>
          <Animated.Text style={labelStyle}>{label}</Animated.Text>
          {icon && <Icon icon={icon} style={ICON} />}
          <TextInput
            ref={ref => (this.input = ref)}
            {...props}
            style={inputStyle}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            blurOnSubmit
            secureTextEntry={this.state.showPassword}
            underlineColorAndroid="transparent"
          /> 
          <TouchableOpacity style={SWITCH_STYLE} onPress={() => this.toggleSwitch()} value={!this.state.showPassword}>
            <Icon icon={this.state.showPassword ? this.state.showPasswordIcon : this.state.hidePasswordIcon }  />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
 
