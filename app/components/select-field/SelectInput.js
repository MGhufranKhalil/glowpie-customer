import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ViewPropTypes,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
} from 'react-native';

import {Icon} from '../icon';
import Picker from './Picker';
import Loading from './Loading';
import {testProperties} from './TestProperties';
import {color, font, inputRadius} from '../../theme/styles';
import {SM, scale} from '../../utils/helpers';

export class SelectInput extends Component {
  static propTypes = {
    /**
     * Label to be shown on the top of the input.
     */
    label: PropTypes.string,
    /**
     * Placeholder to be shown if the input has no value.
     */
    placeholder: PropTypes.string,
    /**
     * String that shows on the header of the select input in iOS.
     */
    done: PropTypes.string,
    /**
     * Current input value.
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Options available to be selected.
     */
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
      }),
    ).isRequired,
    /**
     * Whether the input is disabled or not.
     */
    disabled: PropTypes.bool,
    /**
     * Whether the input is on loading state or not.
     */
    loading: PropTypes.bool,
    /**
     * Colors to easily personalize the input.
     */
    colors: PropTypes.shape({
      normal: PropTypes.string,
      light: PropTypes.string,
      dark: PropTypes.string,
    }).isRequired,
    /**
     * Function to be called whenever the input value is changed.
     */
    onChange: PropTypes.func,
    /**
     * Function to render a custom label.
     */
    renderLabel: PropTypes.func,
    /**
     * Props to be passed to the label `<Text />` component.
     */
    labelProps: PropTypes.object,
    /**
     * Props to be passed to the value `<Text />` component.
     */
    valueProps: PropTypes.object,
    /**
     * Function to render a custom arrow icon.
     */
    renderArrowIcon: PropTypes.func,
    /**
     * Custom label style.
     */
    labelStyle: Text.propTypes.style,
    /**
     * Custom style for the loading container.
     */
    loadingContainerStyle: ViewPropTypes.style,
    /**
     * Custom style for the value container.
     */
    valueContainerStyle: ViewPropTypes.style,
    /**
     * Custom value style.
     */
    valueStyle: Text.propTypes.style,
    /**
     * Custom style for the container of the input.
     */
    containerStyle: ViewPropTypes.style,
    /**
     * Custom style for the inner container of the input.
     */
    innerContainerStyle: ViewPropTypes.style,
    /**
     * Property for setting a testID (iOS) / accessibilityLabel (Android) for testing
     */
    testProperty: PropTypes.string,
  };

  static defaultProps = {
    label: null,
    placeholder: 'Select a value',
    done: 'Done',
    value: null,
    arrowIcon: null,
    disabled: false,
    loading: false,
    colors: {
      normal: '#9C9C9C',
      light: '#D9D9D9',
      dark: '#545454',
    },
    onChange: () => {},
    renderLabel: null,
    labelProps: {},
    valueProps: {},
    renderArrowIcon: null,
    labelStyle: null,
    loadingContainerStyle: null,
    valueContainerStyle: null,
    valueStyle: null,
    containerStyle: null,
    innerContainerStyle: null,
    testProperty: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      optionsVisible: false,
    };
    this.styles = styles(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  getValue = () => {
    const {options, placeholder} = this.props;

    const selectedOption = options.find(
      ({value}) => value === this.state.value,
    );

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

  renderValue = () => {
    const {
      loading,
      disabled,
      loadingContainerStyle,
      valueStyle,
      valueProps,
    } = this.props;

    if (loading) {
      return (
        <View style={[this.styles.loadingContainer, loadingContainerStyle]}>
          <Loading />
        </View>
      );
    }

    return (
      <Text
        {...valueProps}
        style={[
          this.styles.value,
          disabled && this.styles.valueDisabled,
          valueStyle,
        ]}>
        {this.getValue()}
      </Text>
    );
  };

  renderLabel = () => {
    const {
      label,
      renderLabel,
      disabled,
      loading,
      labelProps,
      labelStyle,
    } = this.props;

    if (renderLabel) {
      return renderLabel();
    }

    if (!label) {
      return;
    }

    return (
      <Text
        {...labelProps}
        style={[
          this.styles.label,
          (disabled || loading) && this.styles.labelDisabled,
          labelStyle,
        ]}>
        {label}
      </Text>
    );
  };

  render() {
    const {value, optionsVisible} = this.state;
    const {
      label,
      disabled,
      loading,
      colors,
      valueContainerStyle,
      containerStyle,
      innerContainerStyle,
      renderArrowIcon,
      testProperty,
      ...props
    } = this.props;

    return (
      <View style={[this.styles.container, containerStyle]}>
        <TouchableWithoutFeedback
          onPress={this.handleToggleShowOptions}
          {...testProperties('select', testProperty)}>
          <View
            style={[
              this.styles.innerContainer,
              this.state.optionsVisible && this.styles.activeInnerContainer,
              innerContainerStyle,
            ]}>
            {this.renderLabel()}

            <View style={[this.styles.valueContainer, valueContainerStyle]}>
              {this.renderValue()}

              <Icon disabled={disabled} icon="select" />
            </View>
          </View>
        </TouchableWithoutFeedback>

        {!disabled && !loading && (
          <Picker
            {...props}
            colors={colors}
            value={value}
            onSave={this.handleChangeValue}
            visible={optionsVisible}
            toggleShowOptions={this.handleToggleShowOptions}
            testProperty={testProperty}
            title={this.props.title}
          />
        )}
      </View>
    );
  }
}

const styles = ({colors}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      zIndex: 1,
    },
    innerContainer: {
      height: SM ? 48 : 56,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: color.gray,
      borderRadius: inputRadius,
      paddingHorizontal: SM ? 16 : 20,
    },
    activeInnerContainer: {
      borderWidth: 1,
      borderColor: color.secondary,
    },
    valueContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    loadingContainer: {
      alignSelf: 'center',
    },
    value: {
      fontSize: font.text + 4,
      color: color.dark,
      fontWeight: '600',
    },
    valueDisabled: {
      color: colors.normal,
    },
    labelDisabled: {
      color: colors.normal,
    },
  });
