import React, {Component} from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Image,
  Animated,
  Keyboard,
} from 'react-native';
import {Icon} from '../icon';
import {Text} from '../text';
import Picker from './Picker';
import {color, font, icons, typography, inputRadius} from '../../theme';
import {SM} from '../../utils/helpers';
import {mergeAll, flatten} from 'ramda';

const ICON = {
  position: 'absolute',
  left: 20,
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
  height: 22,
  fontFamily: typography.semibold,
  fontSize: font.text + 2,
  color: color.dark,
  padding: 0,
  marginTop: 4,
  marginBottom: 0,
  marginHorizontal: 0,
};

const arrowImage = {
  resizeMode: 'contain',
  position: 'absolute',
  bottom: 18,
  right: 15,
};

export class SelectField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      isFocused: false,
      optionsVisible: false,
    };
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

  getValue = () => {
    const {options, placeholder, number} = this.props;

    const selectedOption = number
      ? options.find(({value}) => Number(value) === Number(this.state.value))
      : options.find(({value}) => value === this.state.value);

    if (selectedOption) {
      return selectedOption.label;
    }

    return placeholder;
  };

  handleChangeValue = value => {
    this.setState(
      {
        value,
				optionsVisible: false,
      },
      () => this.props.onChange(value),
    );
  };

  handleToggleShowOptions = () => {
    if (this.props.disabled || this.props.loading) {
      return;
    }

    if (!this.state.value && this.props.options) {
      this.setState({value: this.props.options[0].value});
    }

    Keyboard.dismiss();

    this.setState(prevState => ({
      optionsVisible: !prevState.optionsVisible,
    }));
  };

  render() {
    const {
      label,
      value,
      options,
      disabled,
      containerStyle,
      ...props
    } = this.props;
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
      /*fontSize: this._animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 12],
        }),*/
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [color.darkgray, color.secondary],
      }),
    };
    const colors = {
      normal: '#9C9C9C',
      light: '#D9D9D9',
      dark: '#545454',
    };
    const containerOverrideStyle = mergeAll(
      flatten([icon ? container : containerNoIcon, containerStyle]),
    );
    return (
      <TouchableWithoutFeedback onPress={this.handleToggleShowOptions}>
        <View style={containerOverrideStyle}>
          <Animated.Text style={labelStyle}>{label}</Animated.Text>
          {icon && <Icon icon={icon} style={ICON} />}
          <Text style={inputStyle}>{this.getValue()}</Text>
          <Image source={icons.select2} style={arrowImage} />
          {!disabled && (
            <Picker
              options={options}
              colors={colors}
              value={value}
              onSave={this.handleChangeValue}
              visible={this.state.optionsVisible}
              toggleShowOptions={this.handleToggleShowOptions}
              title={this.props.title}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
